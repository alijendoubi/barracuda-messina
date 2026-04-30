interface WaveDividerProps {
  color?: string
  flip?: boolean
}

export function WaveDivider({ color = 'var(--cream)', flip = false }: WaveDividerProps) {
  return (
    <svg
      className="wave"
      viewBox="0 0 1440 60"
      preserveAspectRatio="none"
      style={{ transform: flip ? 'scaleY(-1)' : 'none' }}
    >
      <path
        d="M0,30 C160,55 320,5 480,30 C640,55 800,5 960,30 C1120,55 1280,5 1440,30 L1440,60 L0,60 Z"
        fill={color}
      />
    </svg>
  )
}
