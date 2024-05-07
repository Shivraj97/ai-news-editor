import Link from 'next/link'
import { DisplayDate } from '../molecules/DisplayDate'

import { cn } from '@/utils/styles'
import { RouterOutputs } from '@/trpc/clients/types'
import { Badge } from '../atoms/badge'
import { ReactionPanel } from './ReactionPanel'
// import { ReactionPanel } from './ReactionPanel'

export const ArticleCard = ({
  article,
  score,
}: {
  article: NonNullable<
    RouterOutputs['articles']['userRecommendations'][0]['article']
  >
  score: number
}) => {
  return (
    <div className="relative">
      {/* <div className="absolute bottom-0 left-0 w-[250px] h-[100px] blur-[150px] bg-gradient-to-b from-blue-100 via-blue-500 to-blue-500"></div> */}
      <div className="rounded-lg overflow-hidden hover:shadow-lg p-8 border-[1px] border-blue-500 min-h-[300px]">
        <Link href={`/article/${article.id}`} className="group">
          <div
            className={cn(
              'text-lg font-semibold group-hover:underline line-clamp-2 max-w-lg underline-offset-4 text-primary-500',
            )}
          >
            {article.title}
          </div>
          <div className="max-w-md mt-1 text-sm gray-500 line-clamp-2">
            {article.summary}
          </div>
          <DisplayDate dateString={article.createdAt} className="mt-2" />
          <div className="flex flex-wrap gap-2 mt-2">
            {article.tags.map((tag) => (
              <Badge key={tag} variant={'outline'}>
                {tag}
              </Badge>
            ))}
          </div>
          <ReactionPanel articleId={article.id} className="mt-2" />

          <div className="mt-2 text-xs text-gray-500">
            Current relevance{' '}
            <span className="font-semibold">{Math.floor(score * 100)}</span>
          </div>
        </Link>
      </div>
    </div>
  )
}
