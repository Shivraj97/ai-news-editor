'use client'

import { useFormCreateUser } from '../../forms/createUser'
import { trpcClient } from '../../trpc/clients/client'
import { revalidatePath } from '../../utils/actions/revalidatePath'
import { Button } from '../atoms/button'
import { Input } from '../atoms/input'
import { Label } from '../atoms/label'
import { Title3 } from '../atoms/typography'
import { useToast } from '../molecules/Toaster/use-toast'
import { useEffect } from 'react'

export const CreateReporter = () => {
  const { register, handleSubmit, reset } = useFormCreateUser()
  const { toast } = useToast()

  const {
    data,
    isLoading,
    error,
    mutateAsync: createReporter,
  } = trpcClient.reporters.create.useMutation({
    onSuccess() {
      reset()
      toast({ title: 'Reporter created.' })
      revalidatePath('/admin/manageReporters')
    },
    onError() {
      if (error) {
        toast({ title: error.data?.code })
      }
    },
  })

  return (
    <div className="w-full max-w-md p-4 bg-white shadow-lg rounded-lg">
      <Title3 className="mb-2">Create Reporter</Title3>
      <form
        className="space-y-2"
        onSubmit={handleSubmit(async (data) => {
          await createReporter(data)
        })}
      >
        <Label>
          <Input placeholder="UID" {...register('id')} />
        </Label>
        <Button disabled={isLoading} type="submit">
          Submit
        </Button>
      </form>
    </div>
  )
}
