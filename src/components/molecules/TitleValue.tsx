import { BaseComponent } from '@/utils/types'

export const TitleValue = ({
  children,
  className,
  title,
}: { title: string } & BaseComponent) => {
  return (
    <div className={className}>
      <div className="text-sm mb-1 text-gray-500">{title}</div>
      <div>{children}</div>
    </div>
  )
}
