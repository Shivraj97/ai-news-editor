import { TRPCError } from '@trpc/server'
import {
  createTRPCRouter as createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from '..'
import { schemaCreateUser } from '../../../forms/schemas'

export const reporterRoutes = createTRPCRouter({
  reporterMe: protectedProcedure().query(({ ctx }) => {
    return ctx.db.reporter.findUnique({
      where: { id: ctx.userId },
      include: { User: true },
    })
  }),
  findAll: protectedProcedure('admin').query(({ ctx }) => {
    return ctx.db.reporter.findMany({ include: { User: true } })
  }),
  create: protectedProcedure('admin')
    .input(schemaCreateUser)
    .mutation(async ({ ctx, input }) => {
      const reporter = await ctx.db.reporter.findUnique({
        where: input,
      })
      if (reporter) {
        return new TRPCError({
          code: 'CONFLICT',
          message: 'The user is already an reporter',
        })
      }
      return ctx.db.reporter.create({ data: input })
    }),
  delete: protectedProcedure('admin')
    .input(schemaCreateUser)
    .mutation(({ ctx, input }) => {
      return ctx.db.reporter.delete({ where: { id: input.id } })
    }),
  dashboard: protectedProcedure().query(async ({ ctx }) => {
    const myArticlesCount = await ctx.db.article.count({
      where: { reporterId: ctx.userId },
    })
    return { articles: myArticlesCount }
  }),
  myArticles: protectedProcedure('reporter', 'admin').query(({ ctx }) => {
    return ctx.db.article.findMany({
      where: { reporterId: ctx.userId },
      orderBy: {
        published: 'desc',
      },
    })
  }),
})
