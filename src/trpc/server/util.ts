import { TRPCError } from '@trpc/server'
import { Role } from '../../utils/types'
import { prisma } from '@/db'

export const getUserRoles = async (id: string): Promise<Role[]> => {
  const [adminExists, reporterExists] = await Promise.all([
    prisma.admin.findUnique({
      where: {
        id,
      },
    }),
    prisma.reporter.findUnique({ where: { id } }),
  ])

  const roles: Role[] = []

  if (adminExists) roles.push('admin')
  if (reporterExists) roles.push('reporter')
  return roles
}

export const authorizeUser = async (uid: string, roles: Role[]) => {
  if (!roles || !roles.length) {
    return
  }
  const userRoles = await getUserRoles(uid)
  if (!userRoles.some((role) => roles.includes(role))) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'User does not have the required role(s).',
    })
  }
}
