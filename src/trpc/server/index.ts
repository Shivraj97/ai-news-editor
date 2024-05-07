import { auth } from '@clerk/nextjs'
import { initTRPC, TRPCError } from '@trpc/server'
import { prisma } from '../../db/index'
import { Role } from '../../utils/types'
import { authorizeUser } from './util'
import { AIService } from '../../ai/ai.service'

export const createTRPCContext = async (opts: { headers: Headers }) => {
  const session = auth()
  const ai = new AIService()

  return {
    db: prisma,
    session,
    ai,
    ...opts,
  }
}
/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
const t = initTRPC.context<typeof createTRPCContext>().create()
/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const createTRPCRouter = t.router
export const publicProcedure = t.procedure
export const protectedProcedure = (...roles: Role[]) =>
  t.procedure.use(async ({ ctx, next }) => {
    if (!ctx.session || !ctx.session.userId) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Sign in to access the data',
      })
    }
    await authorizeUser(ctx.session.userId, roles)

    return next({ ctx: { ...ctx, userId: ctx.session.userId } })
  })
