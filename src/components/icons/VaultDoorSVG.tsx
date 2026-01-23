export function VaultDoorSVG({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* Outer Frame */}
      <rect
        x="20"
        y="20"
        width="360"
        height="360"
        rx="24"
        stroke="currentColor"
        strokeWidth="4"
        className="text-border"
      />
      
      {/* Inner Frame */}
      <rect
        x="50"
        y="50"
        width="300"
        height="300"
        rx="16"
        stroke="currentColor"
        strokeWidth="2"
        className="text-border"
      />
      
      {/* Vault Door Circle */}
      <circle
        cx="200"
        cy="200"
        r="120"
        stroke="currentColor"
        strokeWidth="6"
        className="text-accent"
      />
      
      {/* Inner Vault Ring */}
      <circle
        cx="200"
        cy="200"
        r="100"
        stroke="currentColor"
        strokeWidth="2"
        className="text-border"
      />
      
      {/* Vault Handle - Wheel */}
      <circle
        cx="200"
        cy="200"
        r="50"
        stroke="currentColor"
        strokeWidth="4"
        className="text-accent"
      />
      
      {/* Wheel Spokes */}
      <line x1="200" y1="150" x2="200" y2="175" stroke="currentColor" strokeWidth="4" className="text-accent" />
      <line x1="200" y1="225" x2="200" y2="250" stroke="currentColor" strokeWidth="4" className="text-accent" />
      <line x1="150" y1="200" x2="175" y2="200" stroke="currentColor" strokeWidth="4" className="text-accent" />
      <line x1="225" y1="200" x2="250" y2="200" stroke="currentColor" strokeWidth="4" className="text-accent" />
      
      {/* Diagonal Spokes */}
      <line x1="165" y1="165" x2="182" y2="182" stroke="currentColor" strokeWidth="3" className="text-accent" />
      <line x1="235" y1="165" x2="218" y2="182" stroke="currentColor" strokeWidth="3" className="text-accent" />
      <line x1="165" y1="235" x2="182" y2="218" stroke="currentColor" strokeWidth="3" className="text-accent" />
      <line x1="235" y1="235" x2="218" y2="218" stroke="currentColor" strokeWidth="3" className="text-accent" />
      
      {/* Center Hub */}
      <circle
        cx="200"
        cy="200"
        r="15"
        fill="currentColor"
        className="text-accent"
      />
      
      {/* Bolts around frame */}
      <circle cx="60" cy="60" r="6" fill="currentColor" className="text-muted" />
      <circle cx="340" cy="60" r="6" fill="currentColor" className="text-muted" />
      <circle cx="60" cy="340" r="6" fill="currentColor" className="text-muted" />
      <circle cx="340" cy="340" r="6" fill="currentColor" className="text-muted" />
      
      {/* Glow Effect - Light coming from inside */}
      <defs>
        <radialGradient id="vault-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#C58B5A" stopOpacity="0.3" />
          <stop offset="70%" stopColor="#C58B5A" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#C58B5A" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="200" cy="200" r="90" fill="url(#vault-glow)" />
      
      {/* Lock Indicator */}
      <rect
        x="310"
        y="185"
        width="30"
        height="30"
        rx="4"
        stroke="currentColor"
        strokeWidth="2"
        className="text-support"
      />
      <circle cx="325" cy="200" r="5" fill="currentColor" className="text-support" />
    </svg>
  );
}
