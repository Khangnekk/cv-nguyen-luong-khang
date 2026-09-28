import { Icon } from '@iconify/react'
import { skillVisuals, type IconKey } from '../icons/skills'

type BrandIconProps = {
  name: IconKey
  size?: number
  className?: string
}

export function BrandIcon({ name, size = 11, className }: BrandIconProps) {
  const visual = skillVisuals[name]
  return (
    <Icon
      className={className}
      icon={visual.icon}
      width={size}
      height={size}
      aria-hidden
    />
  )
}
