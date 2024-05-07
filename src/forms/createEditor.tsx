import { zodResolver } from '@hookform/resolvers/zod'
import { DefaultValues, useForm } from 'react-hook-form'
import { z } from 'zod'
import { schemaCreateEditor, schemaPayment } from './schemas'
import { $Enums } from '@prisma/client'

export type FormTypeCreateEditor = z.infer<typeof schemaCreateEditor>

export const useFormCreateEditor = () =>
  useForm<FormTypeCreateEditor>({
    resolver: zodResolver(schemaCreateEditor),
  })

export const useFormUpdateEditor = ({
  defaultValues,
}: {
  defaultValues: DefaultValues<FormTypeCreateEditor>
}) =>
  useForm<FormTypeCreateEditor>({
    resolver: zodResolver(schemaCreateEditor),
    defaultValues,
  })
