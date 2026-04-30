interface BrandMarkProps {
  size?: number
  color?: string
}

export function BrandMark({ size = 26, color = 'currentColor' }: BrandMarkProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <path
        d="M2 20 C 2 14, 14 8, 28 12 L 38 6 L 36 20 L 38 34 L 28 28 C 14 32, 2 26, 2 20 Z"
        fill={color}
      />
      <circle cx="30" cy="18" r="1.4" fill="var(--cream)" />
    </svg>
  )
}
