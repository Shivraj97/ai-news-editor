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

export const userRoutes = createTRPCRouter({
  dashboard: protectedProcedure().query(async ({ ctx }) => {
    const [balance, editors] = await Promise.all([
      ctx.db.creditBalance.findUnique({ where: { userId: ctx.userId } }),
      ctx.db.editor.count({ where: { userId: ctx.userId } }),
    ])

    return { balance: balance?.balance || 0, editors }
  }),
})
