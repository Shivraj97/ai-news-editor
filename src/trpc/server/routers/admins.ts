import { TRPCError } from '@trpc/server'
import {
  createTRPCRouter as createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from '..'
import { schemaCreateUser } from '../../../forms/schemas'

export const adminRoutes = createTRPCRouter({
  adminMe: protectedProcedure().query(({ ctx }) => {
    return ctx.db.admin.findUnique({
      where: { id: ctx.userId },
      include: { User: true },
    })
  }),
  findAll: protectedProcedure('admin').query(({ ctx }) => {
    return ctx.db.admin.findMany({ include: { User: true } })
  }),
  create: protectedProcedure('admin')
    .input(schemaCreateUser)
    .mutation(async ({ ctx, input }) => {
      const admin = await ctx.db.admin.findUnique({
        where: input,
      })
      if (admin) {
        return new TRPCError({
          code: 'CONFLICT',
          message: 'The user is already an admin',
        })
      }
      return ctx.db.admin.create({ data: input })
    }),
  delete: protectedProcedure('admin')
    .input(schemaCreateUser)
    .mutation(({ ctx, input }) => {
      return ctx.db.admin.delete({ where: { id: input.id } })
    }),
  dashboard: protectedProcedure('admin').query(async ({ ctx }) => {
    const [admin, reporter, editor, article, user] = await Promise.all([
      ctx.db.admin.count(),
      ctx.db.reporter.count(),
      ctx.db.editor.count(),
      ctx.db.article.count(),
      ctx.db.user.count(),
    ])

    return { admin, reporter, editor, article, user }
  }),
})
