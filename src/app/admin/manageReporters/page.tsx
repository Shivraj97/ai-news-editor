import React from 'react'
import { UserCard } from '../../../components/organisms/UserCard'
import { DeleteAdminButton } from '../../../components/organisms/DeleteAdminButton'
import { trpcServer } from '../../../trpc/clients/server'
import { DeleteReporterButton } from '../../../components/organisms/DeleteReporterButton'
import { Title2 } from '../../../components/atoms/typography'
import { CreateReporter } from '../../../components/templates/CreateReporter'

type Props = {}

async function ManageReporters({}: Props) {
  const reporters = await trpcServer.reporters.findAll.query()

  return (
    <div>
      <Title2 className="mb-2">Manage Reporters</Title2>
      <CreateReporter />

      <Title2 className="mt-8 mb-2">Reporters</Title2>
      <div className="space-y-3">
        {reporters.map((reporter) => (
          <UserCard key={reporter.User.id} user={reporter.User}>
            <div className="flex justify-end mt-2">
              <DeleteReporterButton id={reporter.id} />
            </div>
          </UserCard>
        ))}
      </div>
    </div>
  )
}

export default ManageReporters
