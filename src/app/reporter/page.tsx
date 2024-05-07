import React from 'react'
import { FileArchive } from 'lucide-react'
import { StatCard } from '../../components/organisms/StatCard'
import { trpcServer } from '../../trpc/clients/server'

type Props = {}

async function page({}: Props) {
  const { articles } = await trpcServer.reporters.dashboard.query()
  return (
    <div className="grid grid-cols-4 gap-4">
      <StatCard
        href={'/reporter/myArticles'}
        label={'My Articles'}
        Icon={FileArchive}
      >
        {articles}
      </StatCard>
    </div>
  )
}

export default page
