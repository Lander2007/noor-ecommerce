"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Lenis from "lenis"
import { AnimatePresence, MotionConfig, motion } from "motion/react"
import { ListFilter, Menu, MessageCircle, ShoppingBag, X } from "lucide-react"
import { PRODUCTS, WHATSAPP_NUMBER, type Product } from "@/lib/menu"
import { SITE_CONFIG } from "@/lib/site"
import { LogoWreath, LogoMark, SPRING, fmt } from "./Parts"
import OrderSlip from "./OrderSlip"

type CartContextValue = {
  cart: Record<string, number>
  count: number
  total: number
  bump: number
  add: (product: Product) => void
  remove: (product: Product) => void
  openCart: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

const wa = (text?: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}${
    text ? `?text=${encodeURIComponent(text)}` : ""
  }`

export function useCart() {
  const value = useContext(CartContext)
  if (!value) throw new Error("useCart must be used inside AppShell")
  return value
}

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Record<string, number>>({})
  const [cartOpen, setCartOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [bump, setBump] = useState(0)
  const [cartReady, setCartReady] = useState(false)
  const pathname = usePathname()
  const lenis = useRef<Lenis | null>(null)

  // Load cart from localStorage
  useEffect(() => {
    const saved = window.localStorage.getItem("nooor-cart")
    if (saved) {
      try {
        setCart(JSON.parse(saved))
      } catch {
        window.localStorage.removeItem("nooor-cart")
      }
    }
    setCartReady(true)
  }, [])

  // Save cart to localStorage
  useEffect(() => {
    if (!cartReady) return
    window.localStorage.setItem("nooor-cart", JSON.stringify(cart))
  }, [cart, cartReady])

  // Lenis smooth scroll
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const instance = new Lenis({
      duration: 1.1,
      easing: (time) => 1 - Math.pow(1 - time, 3),
    })
    lenis.current = instance
    let frame = 0
    const loop = (time: number) => {
      instance.raf(time)
      frame = requestAnimationFrame(loop)
    }
    frame = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(frame)
      instance.destroy()
    }
  }, [])

  // Scroll listener for collapsing top strip and shrinking badge
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Modal scroll lock
  useEffect(() => {
    if (cartOpen || menuOpen) {
      lenis.current?.stop()
      document.body.style.overflow = "hidden"
    } else {
      lenis.current?.start()
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [cartOpen, menuOpen])

  const add = useCallback((product: Product) => {
    if (!product.inStock) return
    setCart((current) => ({
      ...current,
      [product.id]: (current[product.id] ?? 0) + 1,
    }))
    setBump((value) => value + 1)
  }, [])

  const remove = useCallback((product: Product) => {
    setCart((current) => {
      const next = { ...current }
      if ((next[product.id] ?? 0) <= 1) delete next[product.id]
      else next[product.id] -= 1
      return next
    })
  }, [])

  const count = useMemo(
    () => Object.values(cart).reduce((sum, qty) => sum + qty, 0),
    [cart],
  )

  const total = useMemo(
    () =>
      PRODUCTS.reduce((sum, product) => {
        const qty = cart[product.id] ?? 0
        return sum + product.price * qty
      }, 0),
    [cart],
  )

  const contextValue = useMemo(
    () => ({
      cart,
      count,
      total,
      bump,
      add,
      remove,
      openCart: () => setCartOpen(true),
    }),
    [add, bump, cart, count, remove, total],
  )

  return (
    <MotionConfig reducedMotion="user">
      <CartContext.Provider value={contextValue}>
        {/* NAVBAR (Starts at very top, no delivery strip or awning) */}
        <header
          className={`fixed inset-x-0 top-0 z-40 select-none bg-paper transition-all duration-200 ${
            scrolled
              ? "border-b border-ink/20 shadow-[0_2px_12px_rgba(46,37,40,0.04)]"
              : "border-b border-transparent"
          }`}
        >
          <div className="mx-auto flex h-16 max-w-[1360px] items-center justify-between px-5 md:px-10">
            {/* Right Side (RTL Start): Desktop Navigation Links */}
            <nav aria-label="التنقل الرئيسي" className="hidden items-center gap-7 md:flex">
              <Link
                href="/#products"
                className="text-[15px] font-medium text-ink transition-colors hover:text-rose"
              >
                المنتجات
              </Link>
              <Link
                href="/#categories"
                className="text-[15px] font-medium text-ink transition-colors hover:text-rose"
              >
                الأقسام
              </Link>
              <Link
                href="/#how-it-works"
                className="text-[15px] font-medium text-ink transition-colors hover:text-rose"
              >
                طريقة الطلب
              </Link>
            </nav>

            {/* Mobile Right: Menu Button */}
            <div className="flex items-center md:hidden">
              <button
                type="button"
                aria-label="القائمة"
                onClick={() => setMenuOpen(true)}
                className="grid size-10 place-items-center rounded-full text-ink transition-colors hover:bg-ink/5"
              >
                <Menu size={22} strokeWidth={1.5} />
              </button>
            </div>

            {/* Center: Wreath Logo Badge */}
            <div className="absolute left-1/2 -translate-x-1/2">
              <Link
                href="/"
                aria-label="NOoOR Farm - الرئيسية"
                className="group relative flex items-center justify-center"
              >
                <div className="relative flex size-12 items-center justify-center rounded-full border border-ink/20 bg-paper shadow-2xs transition-transform duration-200 group-hover:scale-105">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0.5 rounded-full border border-dashed border-rose/50"
                  />
                  <LogoWreath
                    size={42}
                    priority
                    className="size-10 object-contain"
                  />
                </div>
              </Link>
            </div>

            {/* Left Side (RTL End): Cart button & WhatsApp text link */}
            <div className="flex items-center gap-5">
              <a
                href={wa()}
                target="_blank"
                rel="noreferrer"
                className="hidden items-center gap-1.5 text-[14.5px] font-medium text-ink transition-colors hover:text-rose sm:inline-flex"
              >
                <MessageCircle size={17} strokeWidth={1.5} />
                <span>واتساب</span>
              </a>

              {/* Cart Button */}
              <motion.button
                key={bump}
                initial={bump ? { scale: 1 } : false}
                animate={bump ? { scale: [1, 1.15, 1] } : undefined}
                transition={{ duration: 0.25 }}
                type="button"
                onClick={() => setCartOpen(true)}
                aria-label="عرض سلة الطلب"
                className="flex items-center gap-2 rounded-full border border-ink/25 bg-paper px-3 py-1.5 text-ink transition-colors hover:border-ink"
              >
                <ShoppingBag size={19} strokeWidth={1.5} />
                <span className="tnum rounded-full bg-ink px-1.5 py-0.2 text-[12px] font-semibold text-paper">
                  {fmt(count)}
                </span>
              </motion.button>
            </div>
          </div>
        </header>

        {/* Mobile Full-Screen Paper Menu Sheet */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-50 flex flex-col justify-between bg-paper px-6 py-6"
            >
              <div>
                <div className="flex items-center justify-between border-b border-ink/15 pb-4">
                  <div className="flex items-center gap-2.5">
                    <LogoMark size={38} className="size-9 object-contain" />
                    <span className="font-display text-lg font-bold text-ink">
                      NOoOR Farm
                    </span>
                  </div>
                  <button
                    type="button"
                    aria-label="إغلاق القائمة"
                    onClick={() => setMenuOpen(false)}
                    className="grid size-10 place-items-center rounded-full border border-ink/20"
                  >
                    <X size={20} strokeWidth={1.5} />
                  </button>
                </div>

                <nav className="mt-10 flex flex-col gap-6">
                  <Link
                    href="/#products"
                    onClick={() => setMenuOpen(false)}
                    className="font-display text-2xl font-bold text-ink hover:text-rose"
                  >
                    المنتجات
                  </Link>
                  <Link
                    href="/#categories"
                    onClick={() => setMenuOpen(false)}
                    className="font-display text-2xl font-bold text-ink hover:text-rose"
                  >
                    الأقسام
                  </Link>
                  <Link
                    href="/#how-it-works"
                    onClick={() => setMenuOpen(false)}
                    className="font-display text-2xl font-bold text-ink hover:text-rose"
                  >
                    طريقة الطلب
                  </Link>
                  <Link
                    href="/shop"
                    onClick={() => setMenuOpen(false)}
                    className="font-display text-2xl font-bold text-ink hover:text-rose"
                  >
                    كل المنتجات (المتجر)
                  </Link>
                </nav>
              </div>

              {/* Menu Bottom Info (From Strip) */}
              <div className="border-t border-dashed border-rose/50 pt-5 text-sm space-y-2">
                <div className="font-semibold text-ink">
                  {SITE_CONFIG.workingHours}
                </div>
                <div className="text-ink/75">{SITE_CONFIG.deliveryArea}</div>
                <div className="pt-2">
                  <a
                    href={wa()}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary w-full text-center text-sm py-2.5"
                  >
                    تواصل معنا على واتساب
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* MAIN CONTENT */}
        {children}

        {/* FOOTER */}
        <footer className="border-t border-ink/20 bg-paper px-5 py-16 md:px-10 md:py-20">
          <div className="mx-auto max-w-[1200px]">
            {/* Single stitched border line */}
            <div className="mb-12 border-t border-dashed border-rose/50" />

            <div className="grid gap-10 md:grid-cols-2 md:items-start lg:grid-cols-4">
              {/* Brand & Badge */}
              <div className="space-y-4">
                <div className="size-20 overflow-hidden rounded-full border border-ink/15 bg-paper p-1 shadow-xs">
                  <LogoWreath size={76} className="size-full object-contain" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-ink">
                    NOoOR Farm - خضار وفاكهة
                  </h3>
                  <p className="mt-1 text-sm text-ink/70">
                    {SITE_CONFIG.tagline}
                  </p>
                </div>
              </div>

              {/* Hours & Delivery */}
              <div>
                <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-ink/50">
                  المواعيد والتوصيل
                </h4>
                <p className="mt-3 text-[15px] font-medium text-ink">
                  {SITE_CONFIG.workingHours}
                </p>
                <p className="mt-1 text-sm text-ink/70">
                  {SITE_CONFIG.deliveryArea}
                </p>
              </div>

              {/* Phone & WhatsApp */}
              <div>
                <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-ink/50">
                  التواصل
                </h4>
                <div className="mt-3 space-y-1.5 text-[15px]">
                  <div>
                    <a
                      href={wa()}
                      target="_blank"
                      rel="noreferrer"
                      className="link-secondary text-ink"
                    >
                      واتساب: {SITE_CONFIG.whatsapp}
                    </a>
                  </div>
                  <div className="tnum text-ink/80">{SITE_CONFIG.phone}</div>
                  <div className="text-sm text-ink/70">
                    {SITE_CONFIG.address}
                  </div>
                </div>
              </div>

              {/* Socials */}
              <div>
                <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-ink/50">
                  تابعنا
                </h4>
                <div className="mt-3 flex flex-col gap-2 text-[15px]">
                  {SITE_CONFIG.socials.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="link-secondary text-ink w-fit"
                    >
                      {social.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-14 border-t border-ink/10 pt-6 text-center text-xs text-ink/50">
              © NOoOR Farm - جميع الحقوق محفوظة
            </div>
          </div>
        </footer>

        {/* MOBILE STICKY BOTTOM BAR */}
        <AnimatePresence>
          {!cartOpen && count > 0 && (
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={SPRING}
              className="fixed inset-x-0 bottom-0 z-40 flex h-14 bg-ink text-paper md:hidden shadow-lg select-none"
            >
              {pathname === "/shop" && (
                <button
                  type="button"
                  onClick={() =>
                    window.dispatchEvent(new Event("open-shop-filters"))
                  }
                  className="flex w-[32%] items-center justify-center gap-1.5 border-l border-paper/20 text-sm font-medium"
                >
                  <ListFilter size={18} strokeWidth={1.5} />
                  فلتر
                </button>
              )}
              <button
                type="button"
                onClick={() => setCartOpen(true)}
                className="flex flex-1 items-center justify-between px-5"
              >
                <span className="tnum text-sm font-medium">
                  {fmt(count)} في الطلب
                </span>
                <span className="font-display tnum text-lg font-bold">
                  {fmt(total)} ج.م
                </span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CART DRAWER (FULL HEIGHT ORDER SLIP) */}
        <AnimatePresence>
          {cartOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setCartOpen(false)}
                className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-[2px]"
              />

              {/* Drawer Sliding from Left */}
              <motion.aside
                role="dialog"
                aria-modal="true"
                aria-label="إيصال الطلب"
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={SPRING}
                className="fixed inset-y-0 left-0 z-50 flex w-full max-w-[420px] flex-col bg-paper shadow-2xl"
              >
                <OrderSlip mode="drawer" onClose={() => setCartOpen(false)} />
              </motion.aside>
            </>
          )}
        </AnimatePresence>
      </CartContext.Provider>
    </MotionConfig>
  )
}
