"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import Image from "next/image"
import { AnimatePresence, motion } from "motion/react"
import { ArrowLeft, MessageCircle, Minus, Plus, ShoppingBag } from "lucide-react"
import { CATEGORY_META, PRODUCTS, WHATSAPP_NUMBER, type Product } from "@/lib/menu"
import { DottedRing, Lines, WeightStamp, fmt, SPRING } from "./Parts"
import { useCart } from "./AppShell"

const wa = (text?: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}${
    text ? `?text=${encodeURIComponent(text)}` : ""
  }`

const AUTOPLAY_DURATION = 6000 // 6 seconds

export default function HeroShowcase() {
  const { cart, add, remove } = useCart()

  // 5 Hero Showcase products (one per category + one extra)
  const heroProducts = useMemo(() => {
    const list = PRODUCTS.filter((p) => p.hero)
    return list.length ? list.slice(0, 5) : PRODUCTS.slice(0, 5)
  }, [])

  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([])

  const activeProduct = heroProducts[activeIndex] ?? heroProducts[0]
  const activeColor = CATEGORY_META[activeProduct.category].color
  const activeQty = cart[activeProduct.id] ?? 0

  // Check prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReducedMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  // Preload next image to prevent flashes
  useEffect(() => {
    const nextIdx = (activeIndex + 1) % heroProducts.length
    const nextImg = heroProducts[nextIdx]?.image
    if (nextImg && typeof window !== "undefined") {
      const preload = new window.Image()
      preload.src = nextImg
    }
  }, [activeIndex, heroProducts])

  // Handle visibility change (pause when tab hidden)
  useEffect(() => {
    const onVisibilityChange = () => {
      setIsPaused(document.hidden)
    }
    document.addEventListener("visibilitychange", onVisibilityChange)
    return () => document.removeEventListener("visibilitychange", onVisibilityChange)
  }, [])

  // Autoplay 6s loop
  useEffect(() => {
    if (reducedMotion || isPaused) {
      if (timerRef.current) clearInterval(timerRef.current)
      return
    }

    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % heroProducts.length)
    }, AUTOPLAY_DURATION)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [heroProducts.length, isPaused, reducedMotion, activeIndex])

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, index: number) => {
      let nextIndex = index
      if (e.key === "ArrowDown" || e.key === "ArrowLeft") {
        e.preventDefault()
        nextIndex = (index + 1) % heroProducts.length
      } else if (e.key === "ArrowUp" || e.key === "ArrowRight") {
        e.preventDefault()
        nextIndex = (index - 1 + heroProducts.length) % heroProducts.length
      } else if (e.key === "Home") {
        e.preventDefault()
        nextIndex = 0
      } else if (e.key === "End") {
        e.preventDefault()
        nextIndex = heroProducts.length - 1
      }
      if (nextIndex !== index) {
        setActiveIndex(nextIndex)
        tabsRef.current[nextIndex]?.focus()
      }
    },
    [heroProducts.length],
  )

  const arabicCount = `${fmt(activeIndex + 1).padStart(2, "٠")} / ${fmt(
    heroProducts.length,
  ).padStart(2, "٠")}`

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      style={{ backgroundColor: activeColor }}
      className="relative mx-3 mt-20 mb-8 max-w-[1360px] overflow-hidden rounded-[24px] transition-colors duration-600 ease-out sm:mx-4 md:mx-6 md:mt-22 md:mb-10 lg:mx-auto lg:h-[min(640px,calc(100svh-110px))] lg:rounded-[32px] select-none"
    >
      {/* Subtle paper grain texture at 4% */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 opacity-[0.04]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />

      {/* Inner stitch border: 1.5px dashed rgba(46,37,40,0.25), inset 12px, radius 24px */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-3 z-20 rounded-[18px] border-[1.5px] border-dashed border-ink/25 md:rounded-[24px]"
      />

      {/* Main 3-zone Grid Container */}
      <div className="relative z-20 flex h-full flex-col justify-between p-6 sm:p-8 lg:p-10">
        {/* Top 3 Zones on Desktop */}
        <div className="grid flex-1 items-center gap-6 lg:grid-cols-12 lg:gap-4">
          {/* =========================================================================
           * RIGHT ZONE (about 38% - columns 1-5 in RTL): Text Content
           * ========================================================================= */}
          <div className="flex flex-col items-start text-start lg:col-span-5 lg:pr-2">
            {/* Kicker in Aref Ruqaa in rose */}
            <span className="font-accent text-base font-bold text-rose sm:text-lg">
              طازج من المزرعة
            </span>

            {/* H1: clamp(2.25rem, 4vw, 3.25rem), 2rem on mobile */}
            <h1 className="font-display mt-1 text-[2rem] md:text-[clamp(2.25rem,4vw,3.25rem)] font-bold leading-[1.1] text-ink">
              <Lines
                onMount
                delay={0.1}
                lines={["الخضار جاهز.", "فاضل الطبخ."]}
              />
            </h1>

            {/* The sentence */}
            <p className="mt-3.5 max-w-md text-[14.5px] leading-relaxed text-ink/80 sm:text-[15.5px]">
              مغسول، متقطع، ومتعبأ بالوزن. اختار اللي عايزه وابعت طلبك على واتساب.
            </p>

            {/* Actions: Primary button + text link */}
            <div className="mt-6 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-5">
              <a
                href="#products"
                className="btn-primary w-full text-center text-sm sm:w-auto"
              >
                شوف المنتجات
              </a>
              <a
                href={wa()}
                target="_blank"
                rel="noreferrer"
                className="link-secondary justify-center text-sm text-ink sm:justify-start"
              >
                <MessageCircle size={16} strokeWidth={1.5} />
                <span>اطلب على واتساب</span>
              </a>
            </div>
          </div>

          {/* =========================================================================
           * CENTER ZONE (about 36% - columns 6-9 in RTL): Product Photo & Shadow & Stamp
           * ========================================================================= */}
          <div className="relative flex flex-col items-center justify-center lg:col-span-4">
            {/* Thin dotted ring rotating once per 90s behind product */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 flex items-center justify-center"
            >
              <DottedRing
                size={480}
                speed="90s"
                className="size-[320px] sm:size-[400px] lg:size-[480px] opacity-75 ring-spin-90"
              />
            </div>

            {/* Product Photo Box (400px desktop, 260px mobile) */}
            <div className="relative size-[260px] sm:size-[320px] lg:size-[390px] flex items-center justify-center">
              {/* Elliptical soft ground shadow */}
              <div
                aria-hidden
                className="pointer-events-none absolute bottom-4 left-1/2 h-5 w-[65%] -translate-x-1/2 rounded-[100%] bg-ink/12 blur-md"
              />

              {/* Scalloped weight stamp pinned to photo's upper corner */}
              <div className="absolute top-2 right-2 z-30 sm:top-4 sm:right-4">
                <WeightStamp weight={activeProduct.weight} size={46} />
              </div>

              {/* Photo spring transition */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProduct.id}
                  initial={{ opacity: 0, scale: 0.92, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: 16 }}
                  transition={{ type: "spring", stiffness: 260, damping: 24 }}
                  className="relative size-full p-4"
                >
                  {activeProduct.image ? (
                    <Image
                      src={activeProduct.image}
                      alt={activeProduct.name}
                      fill
                      priority
                      quality={85}
                      sizes="(max-width: 768px) 260px, 400px"
                      className="object-contain mix-blend-multiply"
                    />
                  ) : (
                    <div className="flex size-full items-center justify-center">
                      <span className="font-display text-7xl font-bold text-ink/80">
                        {activeProduct.name.charAt(0)}
                      </span>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* =========================================================================
           * LEFT ZONE (about 26% - columns 10-12 in RTL): 5 Circular Thumbnails Column
           * ========================================================================= */}
          <div className="flex flex-col items-center lg:col-span-3 lg:items-end">
            <div
              role="tablist"
              aria-label="منتجات العرض الرئيسي"
              className="flex w-full items-center justify-center gap-3 overflow-x-auto snap-x snap-mandatory pb-2 sm:gap-3.5 lg:flex-col lg:items-stretch lg:gap-3 lg:overflow-visible lg:pb-0"
            >
              {heroProducts.map((product, index) => {
                const isActive = index === activeIndex
                const pColor = CATEGORY_META[product.category].color

                return (
                  <motion.button
                    key={product.id}
                    ref={(el) => {
                      tabsRef.current[index] = el
                    }}
                    role="tab"
                    id={`hero-tab-${product.id}`}
                    aria-selected={isActive}
                    aria-controls="hero-tabpanel"
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => setActiveIndex(index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.12 + index * 0.06,
                      duration: 0.4,
                      ease: "easeOut",
                    }}
                    className="group relative flex shrink-0 snap-center items-center gap-3 text-start outline-none transition-transform active:scale-95 lg:shrink"
                  >
                    {/* Circular Thumbnail (56px, active 72px on mobile; 64px, active 88px on desktop) */}
                    <div
                      style={{ backgroundColor: pColor }}
                      className={`relative flex shrink-0 items-center justify-center rounded-full border border-ink/25 transition-all duration-300 ${
                        isActive
                          ? "size-[72px] lg:size-[88px] shadow-[0_4px_14px_rgba(46,37,40,0.12)]"
                          : "size-[56px] lg:size-[64px] opacity-80 hover:opacity-100"
                      }`}
                    >
                      {/* Thumbnail Image */}
                      {product.image ? (
                        <div className="relative size-[75%]">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            sizes="88px"
                            quality={80}
                            className="object-contain mix-blend-multiply"
                          />
                        </div>
                      ) : (
                        <span className="font-display text-sm font-bold text-ink">
                          {product.name.charAt(0)}
                        </span>
                      )}

                      {/* Active Thumbnail Dotted Ring & Progress Ring */}
                      {isActive && (
                        <svg
                          className="pointer-events-none absolute -inset-1 size-[calc(100%+8px)] -rotate-90"
                          viewBox="0 0 100 100"
                        >
                          {/* Dotted ring */}
                          <circle
                            cx="50"
                            cy="50"
                            r="47"
                            fill="none"
                            stroke="#2E2528"
                            strokeWidth="1.2"
                            strokeDasharray="2 3"
                            opacity="0.35"
                          />
                          {/* Animated progress ring (fills over 6 seconds) */}
                          {!reducedMotion && (
                            <circle
                              key={`progress-${activeIndex}-${isPaused}`}
                              cx="50"
                              cy="50"
                              r="47"
                              fill="none"
                              stroke="#E87A8E"
                              strokeWidth="2"
                              strokeDasharray={295}
                              strokeDashoffset={295}
                              style={{
                                animation: isPaused
                                  ? "none"
                                  : "dash 6s linear infinite",
                              }}
                            />
                          )}
                        </svg>
                      )}
                    </div>

                    {/* Small label next to thumbnail (desktop only: active in ink, others at 60% opacity) */}
                    <div className="hidden min-w-0 flex-1 lg:block">
                      <div
                        className={`truncate text-[13.5px] font-semibold transition-colors ${
                          isActive
                            ? "text-ink"
                            : "text-ink/60 group-hover:text-ink/80"
                        }`}
                      >
                        {product.name}
                      </div>
                      <div className="tnum text-[11px] text-ink/50">
                        {product.weight
                          ? `${fmt(product.weight)} جم`
                          : "حسب الطلب"}
                      </div>
                    </div>
                  </motion.button>
                )
              })}
            </div>

            {/* Counter '٠١ / ٠٥' under column */}
            <div className="mt-3 hidden text-xs font-semibold tracking-wider text-ink/60 lg:block">
              {arabicCount}
            </div>
          </div>
        </div>

        {/* =========================================================================
         * BOTTOM INFO BAR (Full width inside frame, 72px, thin dashed line)
         * ========================================================================= */}
        <div className="mt-4 border-t border-dashed border-ink/20 pt-3 sm:mt-6 lg:h-[72px] lg:flex lg:items-center lg:pt-0">
          <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            {/* Product Name, Weight, Price (one line on mobile) */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`info-${activeProduct.id}`}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.25 }}
                className="flex items-baseline justify-between gap-3 sm:justify-start"
              >
                <div className="flex items-baseline gap-2.5">
                  <span className="font-display text-[18px] font-bold text-ink sm:text-[20px]">
                    {activeProduct.name}
                  </span>
                  <span className="tnum text-xs font-medium text-ink/60 sm:text-sm">
                    {activeProduct.weight
                      ? `${fmt(activeProduct.weight)} جم`
                      : "حسب الطلب"}
                  </span>
                </div>
                <span className="tnum font-display text-[17px] font-bold text-ink sm:text-[19px]">
                  {fmt(activeProduct.price)} ج.م
                </span>
              </motion.div>
            </AnimatePresence>

            {/* Stepper + Solid Ink Button 'أضف للطلب' (next line on mobile) */}
            <div className="flex items-center justify-between gap-3 sm:justify-end">
              {/* Stepper if in cart */}
              {activeQty > 0 && (
                <div
                  dir="ltr"
                  className="inline-flex h-10 items-center rounded-full border border-ink bg-paper px-1 shadow-xs"
                >
                  <button
                    type="button"
                    aria-label="إنقاص"
                    onClick={() => remove(activeProduct)}
                    className="grid size-8 place-items-center rounded-full hover:bg-ink/10"
                  >
                    <Minus size={14} strokeWidth={1.5} />
                  </button>
                  <span className="tnum w-6 text-center text-sm font-semibold">
                    {fmt(activeQty)}
                  </span>
                  <button
                    type="button"
                    aria-label="زيادة"
                    onClick={() => add(activeProduct)}
                    className="grid size-8 place-items-center rounded-full hover:bg-ink/10"
                  >
                    <Plus size={14} strokeWidth={1.5} />
                  </button>
                </div>
              )}

              {/* Solid Ink Button 'أضف للطلب' */}
              <button
                type="button"
                onClick={() => add(activeProduct)}
                className="btn-primary flex items-center justify-center gap-2 py-2.5 px-6 text-sm font-semibold shadow-[3px_3px_0_#2E2528] flex-1 sm:flex-initial"
              >
                <ShoppingBag size={16} strokeWidth={1.5} />
                <span>أضف للطلب</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
