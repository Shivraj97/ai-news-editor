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
} from '../../../forms/schemas'

export const creditBalanceRoutes = createTRPCRouter({
  myCreditBalance: protectedProcedure().query(({ ctx, input }) => {
    return ctx.db.creditBalance.findUnique({
      where: {
        userId: ctx.userId,
      },
    })
  }),
  myCreditTransactions: protectedProcedure().query(({ ctx, input }) => {
    return ctx.db.transaction.findMany({
      where: {
        userId: ctx.userId,
      },
      orderBy: { createdAt: 'desc' },
    })
  }),
})
