import { $Enums, FeedbackType } from '@prisma/client'
import { z } from 'zod'

export const schemaCreateUser = z.object({
  id: z.string().min(1, { message: 'User id is required' }),
})

export const schemaCreateArticle = z.object({
  title: z.string(),
  body: z.string(),
  published: z.boolean(),
  tags: z.array(z.string()),
})

export const schemaUpdateArticle = z.object({
  articleId: z.number(),
  published: z.boolean(),
})

export const schemaNumberID = z.object({
  id: z.number(),
})

export const schemaGiveFeedback = z.object({
  articleId: z.number(),
  type: z.nativeEnum(FeedbackType),
})

export const schemaPayment = z.object({
  userId: z.string(),
  creditsCount: z.coerce.number(),
})

export const schemaCreateEditor = z.object({
  name: z.string().min(1, { message: 'Editor name is required' }),
  style: z.nativeEnum($Enums.Style),
  language: z.nativeEnum($Enums.Language),
  verbosity: z.nativeEnum($Enums.Verbosity),
  wordComplexity: z.nativeEnum($Enums.WordComplexity),
  imagePublicId: z.string().optional().nullable(),
  additionalNotes: z.string().nullable(),
})
