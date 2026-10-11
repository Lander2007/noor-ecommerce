import { LogoMark } from "@/components/Parts"

export default function Loading() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center pt-28 text-center">
      <div className="relative size-20 rounded-full border border-dashed border-rose/60 bg-paper p-2.5 animate-pulse">
        <LogoMark size={72} priority className="size-full object-contain" />
      </div>
      <p className="font-display mt-4 text-base font-semibold text-ink">
        بنحضر المنيو الطازة...
      </p>
    </div>
  )
}
