import { TRPCError } from '@trpc/server'
import {
  createTRPCRouter as createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from '..'
import {
  schemaCreateUser,
  schemaGiveFeedback,
  schemaNumberID,
  schemaPayment,
} from '../../../forms/schemas'
import { schemaAddCredits } from '../../../forms/addCredits'
import { stripe } from '@/payment/stripe'
import { z } from 'zod'

export const stripeRoutes = createTRPCRouter({
  createSession: protectedProcedure()
    .input(schemaAddCredits)
    .mutation(async ({ ctx, input }) => {
      const { creditsCount } = input
      const { userId } = ctx

      try {
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          line_items: [
            {
              quantity: 1,
              price_data: {
                product_data: {
                  name: 'Credits',
                },
                currency: 'usd',
                unit_amount: creditsCount * 100,
              },
            },
          ],
          mode: 'payment',
          success_url: process.env.STRIPE_SUCCESS_URL,
          cancel_url: process.env.STRIPE_CANCEL_URL,
          metadata: {
            userId,
            creditsCount,
          },
        })
        return { sessionId: session.id }
      } catch (error) {
        console.log(error)
      }
    }),
  checkout: protectedProcedure()
    .input(z.object({ sessionId: z.string() }))
    .mutation(async ({ ctx, input: { sessionId } }) => {
      const session = await stripe.checkout.sessions.retrieve(sessionId)
      const parsedCreditsInfo = schemaPayment.safeParse(session.metadata)

      if (!parsedCreditsInfo.success) {
        throw new TRPCError({
          message: 'Payload missing',
          code: 'UNPROCESSABLE_CONTENT',
        })
      }
      const { creditsCount, userId } = parsedCreditsInfo.data

      return ctx.db.creditBalance.upsert({
        where: { userId },
        create: {
          userId,
          balance: creditsCount,
          Transactions: {
            create: {
              amount: creditsCount,
              userId,
              notes: 'Credits purchased.',
            },
          },
        },
        update: {
          balance: { increment: creditsCount },
          Transactions: {
            create: {
              amount: creditsCount,
              userId,
              notes: 'Credits purchased.',
            },
          },
        },
      })
    }),
})
