import { ProductStill } from "@/components/ui/product-still"

export function CanvasFallback() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute -right-10 top-10 h-[28rem] w-[28rem] rounded-full bg-sage/25 blur-3xl" />
      <div className="absolute bottom-10 right-[18%] h-56 w-56 rounded-full bg-gold/20 blur-3xl" />
      <div className="absolute inset-y-0 right-0 flex w-full items-center justify-center md:w-[55%] md:justify-end md:pr-[8%]">
        <ProductStill
          name="Vana Elixir"
          accent="#1B3B2B"
          featured
          plain
          className="h-[70%] max-h-[540px] w-auto animate-float-soft"
        />
      </div>
    </div>
  )
}
