export function FilterIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2" className="text-border" />
      <circle cx="24" cy="24" r="10" stroke="currentColor" strokeWidth="2" className="text-accent" />
      <path d="M32 16l4-4M32 32l4 4M16 16l-4-4M16 32l-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-accent" />
      <circle cx="24" cy="24" r="4" fill="currentColor" className="text-accent" />
    </svg>
  );
}

export function DecideIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <rect x="8" y="8" width="32" height="32" rx="4" stroke="currentColor" strokeWidth="2" className="text-border" />
      <path d="M16 24h16M24 16v16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-accent" />
      <circle cx="16" cy="16" r="3" fill="currentColor" className="text-accent" />
      <circle cx="32" cy="16" r="3" fill="currentColor" className="text-accent" />
      <circle cx="16" cy="32" r="3" fill="currentColor" className="text-accent" />
      <circle cx="32" cy="32" r="3" fill="currentColor" className="text-accent" />
    </svg>
  );
}

export function PlayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2" className="text-border" />
      <path d="M20 16l12 8-12 8V16z" fill="currentColor" className="text-accent" />
      <path d="M16 32l-4 8M32 32l4 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-accent" />
    </svg>
  );
}

export function BookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2z" stroke="currentColor" strokeWidth="2" className="text-border" />
      <path d="M12 4v16M8 8h-2M8 12h-2M16 8h2M16 12h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-accent" />
    </svg>
  );
}

export function InfoIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" className="text-border" />
      <path d="M12 16v-4M12 8h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-accent" />
    </svg>
  );
}
