export function VaultIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Vault door outer ring */}
      <circle
        cx="60"
        cy="60"
        r="50"
        stroke="currentColor"
        strokeWidth="3"
        fill="none"
      />
      
      {/* Vault door inner ring */}
      <circle
        cx="60"
        cy="60"
        r="40"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      
      {/* Lock mechanism - center circle */}
      <circle
        cx="60"
        cy="60"
        r="15"
        stroke="currentColor"
        strokeWidth="2.5"
        fill="none"
      />
      
      {/* Spokes from center */}
      <line
        x1="60"
        y1="45"
        x2="60"
        y2="20"
        stroke="currentColor"
        strokeWidth="2"
      />
      <line
        x1="60"
        y1="75"
        x2="60"
        y2="100"
        stroke="currentColor"
        strokeWidth="2"
      />
      <line
        x1="75"
        y1="60"
        x2="100"
        y2="60"
        stroke="currentColor"
        strokeWidth="2"
      />
      <line
        x1="45"
        y1="60"
        x2="20"
        y2="60"
        stroke="currentColor"
        strokeWidth="2"
      />
      
      {/* Diagonal spokes */}
      <line
        x1="71"
        y1="49"
        x2="85"
        y2="35"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <line
        x1="71"
        y1="71"
        x2="85"
        y2="85"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <line
        x1="49"
        y1="71"
        x2="35"
        y2="85"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <line
        x1="49"
        y1="49"
        x2="35"
        y2="35"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      
      {/* Lock bolts */}
      <circle cx="60" cy="20" r="3" fill="currentColor" />
      <circle cx="60" cy="100" r="3" fill="currentColor" />
      <circle cx="100" cy="60" r="3" fill="currentColor" />
      <circle cx="20" cy="60" r="3" fill="currentColor" />
      
      {/* Hinges */}
      <rect
        x="8"
        y="25"
        width="6"
        height="12"
        rx="1"
        fill="currentColor"
      />
      <rect
        x="8"
        y="83"
        width="6"
        height="12"
        rx="1"
        fill="currentColor"
      />
    </svg>
  );
}
