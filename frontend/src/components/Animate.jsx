import useScrollAnimation from '../hooks/useScrollAnimation'

// Fade up — general purpose
export function FadeUp({ children, delay = 0, className = '' }) {
  const { ref, isVisible } = useScrollAnimation()
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

// Fade in — subtle, for text blocks
export function FadeIn({ children, delay = 0, className = '' }) {
  const { ref, isVisible } = useScrollAnimation()
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transition: `opacity 0.8s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

// Slide in from left
export function SlideLeft({ children, delay = 0, className = '' }) {
  const { ref, isVisible } = useScrollAnimation()
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateX(0)' : 'translateX(-60px)',
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

// Slide in from right
export function SlideRight({ children, delay = 0, className ='' }) {
  const { ref, isVisible } = useScrollAnimation()
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateX(0)' : 'translateX(60px)',
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

// Scale up — for cards
export function ScaleUp({ children, delay = 0, className = '' }) {
  const { ref, isVisible } = useScrollAnimation()
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'scale(1)' : 'scale(0.92)',
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

// Stagger container — animates children one by one
export function StaggerContainer({ children, className = '' }) {
  const { ref, isVisible } = useScrollAnimation()
  return (
    <div ref={ref} className={className}>
      {Array.isArray(children)
        ? children.map((child, i) => (
            <div
              key={i}
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: `opacity 0.5s ease ${i * 120}ms, transform 0.5s ease ${i * 120}ms`,
              }}
            >
              {child}
            </div>
          ))
        : children}
    </div>
  )
}