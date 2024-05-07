'use client'

import { useRouter } from 'next/navigation'
import { useFormCreateArticle } from '../../forms/createArticle'
import { trpcClient } from '../../trpc/clients/client'
import { revalidatePath } from '../../utils/actions/revalidatePath'
import { useToast } from '../molecules/Toaster/use-toast'
import { Label } from '../atoms/label'
import { Input } from '../atoms/input'
import { TextArea } from '../atoms/textArea'
import { Controller } from 'react-hook-form'
import { Switch } from '../atoms/switch'
import { Button } from '../atoms/button'
import { SelectTags } from '../molecules/SelectTags'

export const NewArticle = () => {
  const { register, handleSubmit, reset, setValue, control } =
    useFormCreateArticle()
  const { toast } = useToast()
  const router = useRouter()

  const { data, isLoading, mutateAsync, error } =
    trpcClient.articles.create.useMutation({
      onSuccess({ title }) {
        toast({ title: `Article created. ${title}` })
        reset()
        revalidatePath('/reporter/myArticles')
        router.replace('/reporter/myArticles')
      },
    })
  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        await mutateAsync(data)
      })}
    >
      <Label title="Title">
        <Input {...register('title')} placeholder="Title" />
      </Label>

      <Label title="Body">
        <TextArea {...register('body')} placeholder="Body" />
      </Label>

      <Label title="Published">
        <Controller
          control={control}
          name="published"
          render={({ field }) => (
            <Switch checked={field.value} onCheckedChange={field.onChange} />
          )}
        />
      </Label>

      <SelectTags
        onChange={(tags) => {
          setValue('tags', tags)
        }}
        className="mb-4"
      />
      <Button loading={isLoading} disabled={isLoading} type="submit">
        Submit
      </Button>
    </form>
  )
}
