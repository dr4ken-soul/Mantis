import { useEffect, useRef } from 'react'

/**
 * Attaches IntersectionObserver scroll reveal behaviour.
 * @param threshold - Intersection ratio to trigger reveal
 */
export function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      const selectors = '.scroll-reveal, .scroll-reveal-left, .scroll-reveal-blur'
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('revealed')
            } else {
              entry.target.classList.remove('revealed')
            }
          })
        },
        { threshold },
      )

      document.querySelectorAll(selectors).forEach((element) => {
        observer.observe(element)
      })
    })

    return () => cancelAnimationFrame(frameId)
  }, [threshold])

  return ref
}
