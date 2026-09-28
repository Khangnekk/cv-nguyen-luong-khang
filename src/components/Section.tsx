type SectionProps = {
  title: string
  accent: string
  children: React.ReactNode
  className?: string
}

export function Section({ title, accent, children, className = '' }: SectionProps) {
  return (
    <section
      className={`section ${className}`.trim()}
      style={{ '--accent': accent } as React.CSSProperties}
    >
      <h2 className="section-title">
        <span className="section-label">{title}</span>
      </h2>
      {children}
    </section>
  )
}
