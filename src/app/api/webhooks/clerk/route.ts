import { WebhookEvent } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { prisma } from '../../../../db/index'
import { AIService } from '@/ai/ai.service'

export async function POST(request: Request) {
  const payload: WebhookEvent = await request.json()
  const ai = new AIService()

  if (payload.type === 'user.created') {
    const { id, first_name, last_name, image_url } = payload.data

    try {
      await prisma.user.create({
        data: {
          id,
          name: `${first_name} ${last_name}`,
          image: image_url,
        },
      })

      await ai.addUser({ uid: id })

      return NextResponse.json({ status: 'success' })
    } catch (error) {
      console.error('Error creating user:', error)
      return NextResponse.json(
        { status: 'error', message: 'Failed to create user' },
        { status: 500 },
      )
    }
  } else if (payload.type === 'user.deleted') {
    const { id, deleted } = payload.data

    try {
      await prisma.user.delete({
        where: {
          id: id,
        },
      })

      return NextResponse.json({ status: 'success' })
    } catch (error) {
      console.error('Error deleting user:', error)
      return NextResponse.json(
        { status: 'error', message: 'Failed to delete user' },
        { status: 500 },
      )
    }
  } else {
    return NextResponse.json({ status: 'unsupported' })
  }
}
