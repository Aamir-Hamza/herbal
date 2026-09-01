import { cn } from "@/lib/utils"

type ProductStillProps = {
  name: string
  accent: string
  featured?: boolean
  className?: string
  plain?: boolean
}

export function ProductStill({
  name,
  accent,
  featured = false,
  className,
  plain = false,
}: ProductStillProps) {
  const id = name.replace(/\s+/g, "-").toLowerCase()

  return (
    <div
      className={cn(
        "relative flex aspect-square items-center justify-center overflow-hidden",
        className,
      )}
      style={
        plain
          ? undefined
          : {
              background: `radial-gradient(circle at 50% 20%, ${accent}22, transparent 42%), linear-gradient(180deg, #f8f9f5 0%, #eceee6 100%)`,
            }
      }
    >
      <div className="pointer-events-none absolute inset-6 rounded-full bg-sage/10 blur-2xl" />
      <svg
        viewBox="0 0 200 240"
        className={cn(
          "relative drop-shadow-[0_24px_40px_rgba(15,41,30,0.18)] transition-transform duration-700",
          featured ? "h-[78%] w-auto" : "h-[70%] w-auto",
        )}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`${id}-glass`} x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor={accent} stopOpacity="0.35" />
            <stop offset="45%" stopColor={accent} stopOpacity="0.92" />
            <stop offset="100%" stopColor="#0F291E" stopOpacity="0.95" />
          </linearGradient>
          <linearGradient id={`${id}-shine`} x1="0" x2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>
        <ellipse cx="100" cy="222" rx="42" ry="6" fill="#0F291E" opacity="0.12" />
        <rect x="86" y="28" width="28" height="18" rx="4" fill="#D4AF37" />
        <rect x="90" y="18" width="20" height="14" rx="3" fill="#E5C378" />
        <path
          d="M78 52c0-8 10-14 22-14s22 6 22 14v12H78V52Z"
          fill={accent}
          opacity="0.85"
        />
        <path
          d="M68 64c8-8 18-12 32-12s24 4 32 12c10 10 16 28 16 58 0 48-10 96-48 96s-48-48-48-96c0-30 6-48 16-58Z"
          fill={`url(#${id}-glass)`}
        />
        <path
          d="M84 78c2-2 8-10 10-28"
          fill="none"
          stroke={`url(#${id}-shine)`}
          strokeWidth="3"
          strokeLinecap="round"
        />
        <rect x="78" y="108" width="44" height="52" rx="4" fill="#F8F9F5" opacity="0.88" />
        <text
          x="100"
          y="132"
          textAnchor="middle"
          fill="#0F291E"
          fontSize="7"
          fontFamily="serif"
          letterSpacing="1.4"
        >
          VANA
        </text>
        <text
          x="100"
          y="146"
          textAnchor="middle"
          fill="#1B3B2B"
          fontSize="5"
          opacity="0.7"
        >
          WHOLE HERB
        </text>
      </svg>
    </div>
  )
}
