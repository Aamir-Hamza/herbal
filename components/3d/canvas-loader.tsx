export function CanvasLoader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="absolute right-[12%] top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-sage/25 blur-3xl" />
      <div
        className="h-14 w-14 rounded-full border border-gold/50"
        style={{ animation: "pulse-gold 1.8s ease-out infinite" }}
      />
    </div>
  )
}
