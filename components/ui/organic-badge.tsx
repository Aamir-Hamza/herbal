import { cn } from "@/lib/utils"

export function OrganicBadge({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-white/50 bg-white/55 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-olive shadow-sm backdrop-blur-md",
        className,
      )}
    >
      {children}
    </span>
  )
}

export function SectionEyebrow({
  children,
  light = false,
}: {
  children: React.ReactNode
  light?: boolean
}) {
  return (
    <p
      className={cn(
        "text-[11px] font-semibold uppercase tracking-[0.28em]",
        light ? "text-champagne" : "text-gold",
      )}
    >
      {children}
    </p>
  )
}
