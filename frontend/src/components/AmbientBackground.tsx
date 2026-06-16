/**
 * Fixed atmospheric background with grain and warm depth.
 */
export function AmbientBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      <div
        className="absolute inset-x-0 top-0 h-[42rem]"
        style={{
          background:
            'linear-gradient(120deg, rgba(212, 168, 83, 0.11), transparent 34%, rgba(196, 97, 90, 0.08) 64%, transparent)',
          filter: 'blur(90px)',
          opacity: 0.72,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(242, 237, 230, 0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(242, 237, 230, 0.035) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.7), transparent 78%)',
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.7), transparent 78%)',
        }}
      />
    </div>
  )
}
