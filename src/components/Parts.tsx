"use client"

import Image from "next/image"
import { motion } from "motion/react"
import { Minus, Plus } from "lucide-react"

export const EASE = [0.22, 0.8, 0.3, 1] as const
export const SPRING = { type: "spring", stiffness: 300, damping: 26 } as const

// Arabic localized numbers
export const fmt = (n: number) => n.toLocaleString("ar-EG")

/* -------------------------------------------------------------------------
 * LOGO COMPONENTS
 * ------------------------------------------------------------------------- */

// Full circular wreath badge (logo-wreath.png)
export function LogoWreath({
  size = 88,
  priority = false,
  className = "",
}: {
  size?: number
  priority?: boolean
  className?: string
}) {
  return (
    <Image
      src="/brand/logo-wreath.png"
      alt="NOoOR Farm"
      width={size}
      height={size}
      priority={priority}
      className={`select-none object-contain ${className}`}
    />
  )
}

// Backward compatibility aliases
export const Logo = LogoWreath
export const Ring = DottedRing

// Chef girl mark only (logo-mark.png)
export function LogoMark({
  size = 48,
  priority = false,
  className = "",
}: {
  size?: number
  priority?: boolean
  className?: string
}) {
  return (
    <Image
      src="/brand/logo-mark.png"
      alt="NOoOR Farm"
      width={size}
      height={size}
      priority={priority}
      className={`select-none object-contain ${className}`}
    />
  )
}

/* -------------------------------------------------------------------------
 * SIGNATURE COMPONENT: WEIGHT STAMP (12-scallop edge SVG)
 * ------------------------------------------------------------------------- */
export function WeightStamp({
  weight,
  size = 42,
  className = "",
}: {
  weight: number | null
  size?: number
  className?: string
}) {
  const text = weight ? fmt(weight) : "طلب"
  const unit = weight ? "جم" : "خاص"

  return (
    <div
      style={{ width: size, height: size }}
      className={`relative inline-flex shrink-0 select-none items-center justify-center filter drop-shadow-[0_1px_2px_rgba(46,37,40,0.12)] ${className}`}
    >
      <svg
        viewBox="0 0 48 48"
        className="absolute inset-0 size-full"
        aria-hidden
      >
        <path
          d="M 44.00 24.00 A 6.0 6.0 0 0 1 41.32 34.00 A 6.0 6.0 0 0 1 34.00 41.32 A 6.0 6.0 0 0 1 24.00 44.00 A 6.0 6.0 0 0 1 14.00 41.32 A 6.0 6.0 0 0 1 6.68 34.00 A 6.0 6.0 0 0 1 4.00 24.00 A 6.0 6.0 0 0 1 6.68 14.00 A 6.0 6.0 0 0 1 14.00 6.68 A 6.0 6.0 0 0 1 24.00 4.00 A 6.0 6.0 0 0 1 34.00 6.68 A 6.0 6.0 0 0 1 41.32 14.00 A 6.0 6.0 0 0 1 44.00 24.00 Z"
          fill="#FBF8EE"
          stroke="#2E2528"
          strokeWidth="1.2"
        />
        <circle
          cx="24"
          cy="24"
          r="16.5"
          fill="none"
          stroke="#8C9B8A"
          strokeWidth="0.75"
          strokeDasharray="2.5 2.5"
        />
      </svg>
      <div className="relative z-10 flex flex-col items-center justify-center leading-none text-ink">
        <span className="tnum font-display text-[12px] font-bold leading-none">
          {text}
        </span>
        <span className="mt-[1px] text-[8.5px] font-medium opacity-75 leading-none">
          {unit}
        </span>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------
 * SIGNATURE COMPONENT: PRICE TAG (rounded tag with punched hole)
 * ------------------------------------------------------------------------- */
export function PriceTag({
  price,
  className = "",
}: {
  price: number
  className?: string
}) {
  return (
    <div
      className={`inline-flex items-center gap-1.5 rounded-full border border-ink/40 bg-paper/95 px-2.5 py-1 text-ink shadow-[0_1px_3px_rgba(46,37,40,0.08)] ${className}`}
    >
      <span
        aria-hidden
        className="size-1.5 shrink-0 rounded-full border border-ink/40 bg-paper shadow-inner"
      />
      <span className="tnum font-display text-[13px] font-semibold tracking-tight text-ink">
        {fmt(price)} ج.م
      </span>
    </div>
  )
}

/* -------------------------------------------------------------------------
 * SIGNATURE COMPONENT: LEAF DIVIDER (row of dots + abstract leaf SVG)
 * ------------------------------------------------------------------------- */
export function LeafDivider({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`my-8 flex items-center justify-center gap-2 select-none ${className}`}
    >
      {/* Right dots in RTL */}
      <div className="flex items-center gap-1.5">
        <span className="size-1 rounded-full bg-rose opacity-60" />
        <span className="size-1 rounded-full bg-sage opacity-70" />
        <span className="size-1 rounded-full bg-rose opacity-80" />
        <span className="size-1.5 rounded-full bg-sage" />
        <span className="size-1.5 rounded-full bg-rose" />
      </div>

      {/* Abstract Leaf SVG in center */}
      <svg
        viewBox="0 0 24 24"
        className="size-5 text-sage"
        fill="currentColor"
        stroke="none"
      >
        <path d="M12 2C6.5 2 2 6.5 2 12c0 4.5 3 8.5 7.5 9.7.3-1.8.8-3.7 1.8-5.4 1.3-2.2 3.3-3.9 5.8-4.8 1.4-.5 2.9-.8 4.4-.8.3 0 .5-.2.5-.5 0-4.5-4.5-8.2-10-8.2zm7.5 10.7c-2.2.4-4.2 1.5-5.7 3.2-.9 1.1-1.5 2.4-1.9 3.8 4.2-.6 7.4-4.1 7.6-7z" />
      </svg>

      {/* Left dots in RTL */}
      <div className="flex items-center gap-1.5">
        <span className="size-1.5 rounded-full bg-rose" />
        <span className="size-1.5 rounded-full bg-sage" />
        <span className="size-1 rounded-full bg-rose opacity-80" />
        <span className="size-1 rounded-full bg-sage opacity-70" />
        <span className="size-1 rounded-full bg-rose opacity-60" />
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------
 * SIGNATURE COMPONENT: STEPPER (compact 36px pill: - 1 +)
 * ------------------------------------------------------------------------- */
export function Stepper({
  qty,
  onAdd,
  onRemove,
  inverted = false,
  className = "",
}: {
  qty: number
  onAdd: () => void
  onRemove: () => void
  inverted?: boolean
  className?: string
}) {
  return (
    <motion.div
      dir="ltr"
      initial={{ scale: 0.85, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.85, opacity: 0 }}
      transition={SPRING}
      onClick={(e) => e.stopPropagation()}
      className={`inline-flex h-9 shrink-0 items-center rounded-full border border-ink shadow-xs select-none ${
        inverted ? "bg-ink text-paper" : "bg-paper text-ink"
      } ${className}`}
    >
      <button
        type="button"
        aria-label="إنقاص"
        onClick={onRemove}
        className={`grid size-9 place-items-center rounded-full transition-colors ${
          inverted ? "hover:bg-paper/15 active:bg-paper/25" : "hover:bg-ink/10 active:bg-ink/20"
        }`}
      >
        <Minus size={14} strokeWidth={1.5} />
      </button>
      <span className="tnum w-6 text-center text-[14px] font-semibold">
        {fmt(qty)}
      </span>
      <button
        type="button"
        aria-label="زيادة"
        onClick={onAdd}
        className={`grid size-9 place-items-center rounded-full transition-colors ${
          inverted ? "hover:bg-paper/15 active:bg-paper/25" : "hover:bg-ink/10 active:bg-ink/20"
        }`}
      >
        <Plus size={14} strokeWidth={1.5} />
      </button>
    </motion.div>
  )
}

/* -------------------------------------------------------------------------
 * SIGNATURE COMPONENT: DOTTED WREATH RING (pink and sage dots + 6 abstract leaves)
 * ------------------------------------------------------------------------- */
const RING_DOTS = Array.from({ length: 72 }, (_, index) => {
  const angle = (index / 72) * Math.PI * 2
  return {
    cx: +(100 + Math.cos(angle) * 94).toFixed(2),
    cy: +(100 + Math.sin(angle) * 94).toFixed(2),
    r: index % 6 === 0 ? 1.8 : 1.15,
    fill: index % 2 ? "#E87A8E" : "#8C9B8A",
  }
})

const RING_LEAVES = Array.from({ length: 6 }, (_, i) => {
  const angle = (i / 6) * Math.PI * 2
  return {
    cx: +(100 + Math.cos(angle) * 94).toFixed(2),
    cy: +(100 + Math.sin(angle) * 94).toFixed(2),
    deg: +(i * 60 + 45).toFixed(1),
    fill: i % 2 === 0 ? "#8C9B8A" : "#E87A8E",
  }
})

export function DottedRing({
  size = 520,
  speed = "90s",
  className = "",
}: {
  size?: number | string
  speed?: string
  className?: string
}) {
  return (
    <svg
      viewBox="0 0 200 200"
      aria-hidden
      style={{
        animation: `ring-spin ${speed} linear infinite`,
      }}
      className={`pointer-events-none select-none motion-reduce:animate-none ${className}`}
      width={typeof size === "number" ? size : undefined}
      height={typeof size === "number" ? size : undefined}
    >
      {RING_DOTS.map((dot, index) => (
        <circle
          key={index}
          cx={dot.cx}
          cy={dot.cy}
          r={dot.r}
          fill={dot.fill}
        />
      ))}
      {RING_LEAVES.map((leaf, index) => (
        <path
          key={`leaf-${index}`}
          d="M 0,-4.5 C 2.5,-2 2.5,2 0,4.5 C -2.5,2 -2.5,-2 0,-4.5 Z"
          fill={leaf.fill}
          transform={`translate(${leaf.cx}, ${leaf.cy}) rotate(${leaf.deg})`}
        />
      ))}
    </svg>
  )
}

/* -------------------------------------------------------------------------
 * PERFORATED EDGE (Scalloped paper cutouts top/bottom)
 * ------------------------------------------------------------------------- */
export function PerforatedEdge({
  position = "top",
  className = "",
}: {
  position?: "top" | "bottom"
  className?: string
}) {
  // Repeating scallops along 380px width
  return (
    <div
      aria-hidden
      className={`relative h-2 w-full overflow-hidden select-none ${
        position === "bottom" ? "rotate-180" : ""
      } ${className}`}
    >
      <svg
        viewBox="0 0 380 8"
        preserveAspectRatio="none"
        className="block h-full w-full"
      >
        <path
          d="M 0,8
             Q 5,0 10,8
             Q 15,0 20,8
             Q 25,0 30,8
             Q 35,0 40,8
             Q 45,0 50,8
             Q 55,0 60,8
             Q 65,0 70,8
             Q 75,0 80,8
             Q 85,0 90,8
             Q 95,0 100,8
             Q 105,0 110,8
             Q 115,0 120,8
             Q 125,0 130,8
             Q 135,0 140,8
             Q 145,0 150,8
             Q 155,0 160,8
             Q 165,0 170,8
             Q 175,0 180,8
             Q 185,0 190,8
             Q 195,0 200,8
             Q 205,0 210,8
             Q 215,0 220,8
             Q 225,0 230,8
             Q 235,0 240,8
             Q 245,0 250,8
             Q 255,0 260,8
             Q 265,0 270,8
             Q 275,0 280,8
             Q 285,0 290,8
             Q 295,0 300,8
             Q 305,0 310,8
             Q 315,0 320,8
             Q 325,0 330,8
             Q 335,0 340,8
             Q 345,0 350,8
             Q 355,0 360,8
             Q 365,0 370,8
             Q 375,0 380,8
             L 380,8 L 0,8 Z"
          fill="#FBF8EE"
        />
      </svg>
    </div>
  )
}

/* -------------------------------------------------------------------------
 * LINES (Masked headline reveal animation)
 * ------------------------------------------------------------------------- */
export function Lines({
  lines,
  className = "",
  delay = 0,
  onMount = false,
}: {
  lines: string[]
  className?: string
  delay?: number
  onMount?: boolean
}) {
  const trigger = onMount
    ? { animate: "show" }
    : { whileInView: "show", viewport: { once: true, margin: "-40px" } }

  return (
    <motion.span className={`block ${className}`} initial="hidden" {...trigger}>
      {lines.map((text, index) => (
        <span
          key={text}
          className="-my-[0.14em] block overflow-hidden py-[0.14em]"
        >
          <motion.span
            className="block"
            variants={{ hidden: { y: "115%" }, show: { y: 0 } }}
            transition={{ duration: 0.65, ease: EASE, delay: delay + index * 0.09 }}
          >
            {text}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}
