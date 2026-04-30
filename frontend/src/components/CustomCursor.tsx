import { useEffect, useRef } from 'react'

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return
    document.body.classList.add('has-custom-cursor')

    let mx = -100, my = -100, rx = -100, ry = -100
    let raf: number

    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY }
    const tick = () => {
      rx += (mx - rx) * 0.18
      ry += (my - ry) * 0.18
      if (dotRef.current) dotRef.current.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`
      if (ringRef.current) ringRef.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    const onOver = (e: MouseEvent) => {
      if ((e.target as Element).closest('a, button, .hoverable, input, select, textarea')) {
        document.body.classList.add('cursor-hover')
      }
    }
    const onOut = (e: MouseEvent) => {
      if ((e.target as Element).closest('a, button, .hoverable, input, select, textarea')) {
        document.body.classList.remove('cursor-hover')
      }
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)

    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      document.body.classList.remove('has-custom-cursor', 'cursor-hover')
    }
  }, [])

  return (
    <>
      <div ref={ringRef} className="cursor-ring" />
      <div ref={dotRef} className="cursor-dot" />
    </>
  )
}
