import { cn } from '@/utils/styles'
import { BaseComponent } from '@/utils/types'
import { Loader } from 'lucide-react'
import React from 'react'

export const Loading = ({ children, className }: BaseComponent) => {
  return (
    <div className={cn('flex flex-col items-center my-12', className)}>
      {children ? (
        <div className="text-gray-600 text-xs mb-1">{children}</div>
      ) : null}
      <div>
        <Loader
          size={40}
          className="animate-spin fixed min-h-[calc(100vh-50px)]"
        />
        {/* <div>Loading...</div> */}
      </div>
    </div>
  )
}
