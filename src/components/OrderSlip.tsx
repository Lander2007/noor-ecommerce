"use client"

import { useMemo, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Plus, X } from "lucide-react"
import { PRODUCTS, WHATSAPP_NUMBER, type Product } from "@/lib/menu"
import { LogoMark, Stepper, fmt, SPRING } from "./Parts"
import { useCart } from "./AppShell"

const wa = (text?: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}${
    text ? `?text=${encodeURIComponent(text)}` : ""
  }`

export default function OrderSlip({
  mode = "hero",
  onClose,
  featuredList,
  className = "",
}: {
  mode?: "hero" | "drawer"
  onClose?: () => void
  featuredList?: Product[]
  className?: string
}) {
  const { cart, count, total, add, remove } = useCart()
  const [highlightedId, setHighlightedId] = useState<string | null>(null)

  // 4 rows for hero slip (as specified: "Show 4 rows (not 5)")
  const heroProducts = useMemo(() => {
    if (featuredList && featuredList.length) return featuredList.slice(0, 4)
    return PRODUCTS.filter((p) => p.featured).slice(0, 4)
  }, [featuredList])

  // Cart lines for drawer
  const cartLines = useMemo(() => {
    return PRODUCTS.filter((p) => (cart[p.id] ?? 0) > 0).map((product) => ({
      product,
      quantity: cart[product.id],
    }))
  }, [cart])

  const handleAddWithHighlight = (product: Product) => {
    add(product)
    setHighlightedId(product.id)
    setTimeout(() => {
      setHighlightedId((prev) => (prev === product.id ? null : prev))
    }, 1000)
  }

  const sendOrder = () => {
    if (cartLines.length === 0) {
      window.open(wa("أهلاً نور فارم، حابب أستفسر عن المنتجات والأسعار"), "_blank")
      return
    }
    const body = cartLines
      .map(
        ({ product, quantity }) =>
          `• ${product.name} (${
            product.weight ? `${fmt(product.weight)} جم` : "حسب الطلب"
          }) × ${fmt(quantity)} = ${fmt(product.price * quantity)} ج.م`,
      )
      .join("\n")
    const message = `أهلاً نور فارم\nعايز أطلب:\n\n${body}\n\nالإجمالي: ${fmt(total)} ج.م\n\nالاسم والعنوان:`
    window.open(wa(message), "_blank")
  }

  const isHero = mode === "hero"

  return (
    <div
      className={`relative flex flex-col bg-paper text-ink select-none border border-ink/25 ${
        isHero
          ? "w-[320px] max-w-full rounded-2xl shadow-[6px_6px_0_#F6C1C9]"
          : "h-full w-full shadow-2xl"
      } ${className}`}
    >
      {/* Inner stitch border in rose */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-1.5 rounded-[13px] border border-dashed border-rose/50 z-20"
      />

      {/* Perforated Top Edge (Scalloped cutouts) */}
      <div
        aria-hidden
        className="relative h-2.5 w-full overflow-hidden border-b border-ink/15 bg-paper/60"
      >
        <svg
          viewBox="0 0 320 8"
          preserveAspectRatio="none"
          className="block h-full w-full fill-paper stroke-ink/20"
        >
          {Array.from({ length: 32 }).map((_, i) => (
            <circle key={i} cx={5 + i * 10} cy={-2} r={3.5} fill="#FBF8EE" />
          ))}
        </svg>
      </div>

      {/* Slip Header: only small logo mark on right and 'طلبك' on left */}
      <div className="relative z-10 px-5 pt-4 pb-2.5">
        <div className="flex items-center justify-between">
          {/* Right side in RTL: Small logo mark */}
          <div className="flex items-center gap-2">
            <div className="size-9 shrink-0 overflow-hidden rounded-full border border-ink/15 bg-paper p-0.5 shadow-2xs">
              <LogoMark size={34} className="size-full object-contain" />
            </div>
            <span className="font-display text-sm font-bold text-ink">
              NOoOR
            </span>
          </div>

          {/* Left side in RTL: 'طلبك' or close button */}
          {!isHero && onClose ? (
            <button
              type="button"
              onClick={onClose}
              aria-label="إغلاق"
              className="grid size-7 place-items-center rounded-full border border-ink/20 text-ink transition-colors hover:bg-ink hover:text-paper"
            >
              <X size={15} strokeWidth={1.5} />
            </button>
          ) : (
            <span className="font-display text-base font-bold text-ink">
              طلبك
            </span>
          )}
        </div>

        {/* Dashed divider */}
        <div className="mt-3 border-b border-dashed border-ink/20" />
      </div>

      {/* Slip Body: 4 rows for hero */}
      <div
        className={`relative z-10 px-5 ${
          isHero ? "space-y-2.5 py-2" : "flex-1 overflow-y-auto space-y-2.5 py-3"
        }`}
      >
        {isHero ? (
          heroProducts.map((product, index) => {
            const qty = cart[product.id] ?? 0
            const isHighlighted = highlightedId === product.id

            return (
              <motion.div
                key={product.id}
                initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
                animate={{
                  clipPath: "inset(0 0 0% 0)",
                  opacity: 1,
                }}
                transition={{
                  clipPath: { delay: 0.15 + index * 0.09, duration: 0.5, ease: "easeOut" },
                  opacity: { delay: 0.15 + index * 0.09, duration: 0.5 },
                }}
                className={`group relative flex items-center justify-between gap-1.5 rounded-lg px-2 py-1 text-sm leading-tight transition-colors duration-700 ${
                  isHighlighted ? "bg-rose-soft/75" : "bg-transparent"
                }`}
              >
                {/* Product Name & Readable Weight Label */}
                <div className="flex min-w-0 items-baseline gap-1.5">
                  <span className="text-[15px] font-medium text-ink truncate">
                    {product.name}
                  </span>
                  <span className="tnum text-[12.5px] font-normal text-ink/60 shrink-0">
                    {product.weight ? `${fmt(product.weight)} جم` : "حسب الطلب"}
                  </span>
                </div>

                {/* Dotted Leader */}
                <span
                  aria-hidden
                  className="mx-1.5 flex-1 border-b border-dotted border-ink/35 self-center"
                />

                {/* Price in Bold & 32px round ink-outlined button / Stepper */}
                <div className="flex shrink-0 items-center gap-2">
                  <span className="tnum text-[14px] font-bold text-ink">
                    {fmt(product.price)} ج.م
                  </span>

                  {qty > 0 ? (
                    <Stepper
                      qty={qty}
                      onAdd={() => handleAddWithHighlight(product)}
                      onRemove={() => remove(product)}
                      className="scale-[0.85] origin-left"
                    />
                  ) : (
                    <motion.button
                      type="button"
                      aria-label={`أضف ${product.name}`}
                      onClick={() => handleAddWithHighlight(product)}
                      whileTap={{ scale: 0.9 }}
                      className="grid size-8 place-items-center rounded-full border border-ink bg-paper text-ink transition-colors hover:bg-ink hover:text-paper"
                    >
                      <Plus size={14} strokeWidth={1.5} />
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )
          })
        ) : cartLines.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-4 size-18 rounded-full border border-dashed border-rose/60 bg-paper p-2">
              <LogoMark size={64} className="size-full object-contain" />
            </div>
            <p className="font-display text-base text-ink font-semibold">
              لسه ما اخترتش حاجة.
            </p>
            <p className="mt-1 text-xs text-ink/60">
              اختار خضارك وفاكهتك وهتظهر هنا على طول.
            </p>
          </div>
        ) : (
          <AnimatePresence initial={false}>
            {cartLines.map(({ product, quantity }) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={SPRING}
                className="flex items-center justify-between gap-2 border-b border-ink/10 pb-2.5 pt-1 text-sm"
              >
                <div className="min-w-0 flex-1">
                  <div className="text-[14.5px] font-medium text-ink truncate">
                    {product.name}
                  </div>
                  <div className="tnum text-xs text-ink/60">
                    {product.weight
                      ? `${fmt(product.weight)} جم · `
                      : "حسب الطلب · "}
                    {fmt(product.price * quantity)} ج.م
                  </div>
                </div>

                <Stepper
                  qty={quantity}
                  onAdd={() => handleAddWithHighlight(product)}
                  onRemove={() => remove(product)}
                  className="scale-90 origin-left"
                />
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>

      {/* Slip Footer */}
      <div className="relative z-10 px-5 pt-2 pb-4">
        <div className="border-b border-dashed border-ink/20 mb-3" />

        {/* Total line: label 'الإجمالي' and amount in 20px bold */}
        <div className="mb-3.5 flex items-baseline justify-between">
          <span className="font-display text-[15px] font-semibold text-ink">
            الإجمالي
          </span>
          <span className="tnum font-display text-[20px] font-bold text-ink">
            {fmt(total)} ج.م
          </span>
        </div>

        {/* Helper text when empty in rose color */}
        {count === 0 && (
          <p className="mb-2 text-center text-xs font-semibold text-rose">
            لسه ما اخترتش حاجة.
          </p>
        )}

        {/* Send Button: Never looks disabled!
            Empty: outlined ink button (2px ink border, ink text, paper fill)
            Has items: solid ink button with spring pop of 1.03 */}
        {count === 0 ? (
          <button
            type="button"
            onClick={sendOrder}
            className="flex h-11 w-full items-center justify-center rounded-full border-2 border-ink bg-paper text-sm font-semibold text-ink transition-colors hover:bg-ink/5"
          >
            ابعت الطلب على واتساب
          </button>
        ) : (
          <motion.button
            key="active-btn"
            type="button"
            onClick={sendOrder}
            initial={{ scale: 0.98 }}
            animate={{ scale: [0.98, 1.03, 1] }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="btn-primary h-11 w-full text-sm font-semibold shadow-[4px_4px_0_#F6C1C9]"
          >
            ابعت الطلب على واتساب
          </motion.button>
        )}
      </div>

      {/* Perforated Bottom Edge (Scalloped cutouts) */}
      <div
        aria-hidden
        className="relative h-2.5 w-full overflow-hidden border-t border-ink/15 bg-paper/60"
      >
        <svg
          viewBox="0 0 320 8"
          preserveAspectRatio="none"
          className="block h-full w-full fill-paper stroke-ink/20"
        >
          {Array.from({ length: 32 }).map((_, i) => (
            <circle key={i} cx={5 + i * 10} cy={10} r={3.5} fill="#FBF8EE" />
          ))}
        </svg>
      </div>
    </div>
  )
}
