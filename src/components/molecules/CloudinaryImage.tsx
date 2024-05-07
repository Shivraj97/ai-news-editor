'use client'
import { BaseComponent } from '@/utils/types'
import { CldImage } from 'next-cloudinary'
import Image from 'next/image'

export const CloudinaryImage = ({
  publicId,
  className,
}: {
  publicId?: string | null
} & BaseComponent) => {
  if (!publicId) {
    return (
      <Image
        src="/user.jpg"
        className={className}
        width={500}
        height={500}
        alt=""
      />
    )
  }
  return (
    <CldImage
      width={500}
      height={500}
      className={className}
      src={publicId}
      alt=""
    />
  )
}