import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { schemaCreateUser } from './schemas'


export type FormTypeCreateUser = z.infer<typeof schemaCreateUser>

export const useFormCreateUser = () =>
  useForm<FormTypeCreateUser>({
    resolver: zodResolver(schemaCreateUser),
  })
