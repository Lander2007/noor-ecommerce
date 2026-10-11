"use client"

import Image from "next/image"
import { AnimatePresence, motion } from "motion/react"
import { Plus } from "lucide-react"
import { CATEGORY_META, type Product } from "@/lib/menu"
import { WeightStamp, PriceTag, Stepper, SPRING } from "./Parts"
import { useCart } from "./AppShell"

const DOTS_48 = Array.from({ length: 48 }, (_, i) => {
  const angle = (i / 48) * Math.PI * 2
  return {
    cx: +(100 + Math.cos(angle) * 85).toFixed(2),
    cy: +(100 + Math.sin(angle) * 85).toFixed(2),
    r: i % 4 === 0 ? 2.2 : 1.3,
    fill: i % 2 === 0 ? "#8C9B8A" : "#E87A8E",
  }
})

export default function ProductCard({
  product,
  priority = false,
}: {
  product: Product
  priority?: boolean
}) {
  const { cart, add, remove } = useCart()
  const quantity = cart[product.id] ?? 0
  const meta = CATEGORY_META[product.category]

  return (
    <motion.article
      layout
      transition={{ layout: { duration: 0.2 } }}
      className="group relative flex w-full flex-col transition-transform duration-300 ease-out hover:-translate-y-1 motion-reduce:hover:translate-none"
    >
      {/* Category-colored panel with stitch border */}
      <div
        style={{ backgroundColor: meta.color }}
        className={`relative aspect-[4/4.2] w-full overflow-hidden rounded-[22px] border border-ink/15 p-2 transition-shadow duration-300 group-hover:shadow-[0_8px_20px_rgba(46,37,40,0.08)] ${
          product.inStock ? "" : "saturate-50 opacity-65"
        }`}
      >
        {/* Inset stitch border: 1.5px dashed border inset 6px */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-[6px] rounded-[16px] border-[1.5px] border-dashed border-ink/20 group-hover:border-ink/30 transition-colors"
        />

        {/* Weight stamp pinned to top corner (top-2 right-2 in RTL) */}
        <div className="absolute top-2.5 right-2.5 z-20">
          <WeightStamp weight={product.weight} size={40} />
        </div>

        {/* Center content: Product cut-out image with mix-blend-multiply or Letter in Dotted Ring */}
        {product.image ? (
          <div className="relative size-full p-[12%]">
            <Image
              src={product.image}
              alt={product.name}
              fill
              loading={priority ? "eager" : "lazy"}
              quality={80}
              sizes="(max-width: 767px) 45vw, (max-width: 1200px) 25vw, 220px"
              className="object-contain mix-blend-multiply transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            />
          </div>
        ) : (
          <div className="relative flex size-full items-center justify-center">
            {/* Dotted ring that rotates slowly on card hover */}
            <svg
              viewBox="0 0 200 200"
              aria-hidden
              className="card-ring pointer-events-none absolute size-[74%] select-none motion-reduce:animate-none"
            >
              {DOTS_48.map((dot, index) => (
                <circle
                  key={index}
                  cx={dot.cx}
                  cy={dot.cy}
                  r={dot.r}
                  fill={dot.fill}
                />
              ))}
            </svg>

            {/* Arabic letter */}
            <span className="font-display relative z-10 select-none text-[clamp(2.5rem,5vw,3.5rem)] font-bold text-ink/85 leading-none">
              {product.name.trim().charAt(0)}
            </span>
          </div>
        )}
      </div>

      {/* Info Area */}
      <div className="pt-3 pb-1">
        <h3 className="text-[17px] font-semibold text-ink leading-snug line-clamp-1">
          {product.name}
        </h3>

        <div className="mt-2.5 flex items-center justify-between gap-2">
          {product.inStock ? (
            <PriceTag price={product.price} />
          ) : (
            <span className="rounded-md border border-ink/20 px-2 py-0.5 text-xs font-semibold text-ink/60">
              غير متوفر
            </span>
          )}

          {/* Plus button or Stepper */}
          {product.inStock && (
            <div className="shrink-0">
              <AnimatePresence mode="wait" initial={false}>
                {quantity > 0 ? (
                  <motion.div
                    key="stepper"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={SPRING}
                  >
                    <Stepper
                      qty={quantity}
                      onAdd={() => add(product)}
                      onRemove={() => remove(product)}
                      inverted
                    />
                  </motion.div>
                ) : (
                  <motion.button
                    key="add"
                    type="button"
                    aria-label={`أضف ${product.name}`}
                    onClick={() => add(product)}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={SPRING}
                    whileTap={{ scale: 0.92 }}
                    className="grid size-9 place-items-center rounded-full bg-ink text-paper shadow-xs transition-transform hover:scale-105"
                  >
                    <Plus size={16} strokeWidth={1.5} />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </motion.article>
  )
}
