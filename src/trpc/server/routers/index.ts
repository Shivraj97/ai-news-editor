import {
  createTRPCRouter as createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from '..'
import { adminRoutes } from './admins'
import { articleRoutes } from './articles'
import { creditBalanceRoutes } from './creditBalance'
import { feedbackRoutes } from './feedbacks'
import { reporterRoutes } from './reporters'
import { userRoutes } from './users'
import { stripeRoutes } from './stripe'
import { editorRoutes } from './editors'

export const appRouter = createTRPCRouter({
  admins: adminRoutes,
  reporters: reporterRoutes,
  articles: articleRoutes,
  feedbacks: feedbackRoutes,
  creditBalance: creditBalanceRoutes,
  users: userRoutes,
  stripe: stripeRoutes,
  editors: editorRoutes,
})
// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter
