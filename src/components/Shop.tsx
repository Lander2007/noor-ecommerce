"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { AnimatePresence, motion } from "motion/react"
import { Check, ChevronDown, Search, X } from "lucide-react"
import {
  CATEGORY_META,
  PRODUCTS,
  type Category,
  type Product,
} from "@/lib/menu"
import { SPRING, fmt } from "./Parts"
import ProductCard from "./ProductCard"

const CATEGORIES = Object.keys(CATEGORY_META) as Category[]
const WEIGHTS = [150, 250, 400, 500]
const PRICE_MIN = 0
const PRICE_MAX = 100

type FilterState = {
  categories: Category[]
  weights: number[]
  min: number
  max: number
  available: boolean
  query: string
  sort: string
}

const normalizeArabic = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u064B-\u065F\u0670]/g, "")
    .replace(/[أإآ]/g, "ا")
    .replace(/[ةه]/g, "ه")
    .toLowerCase()
    .trim()

const readState = (params: URLSearchParams): FilterState => ({
  categories: (params.get("cat")?.split(",") ?? []).filter((value) =>
    CATEGORIES.includes(value as Category),
  ) as Category[],
  weights: (params.get("w")?.split(",").map(Number) ?? []).filter((value) =>
    WEIGHTS.includes(value),
  ),
  min: Math.max(PRICE_MIN, Number(params.get("min")) || PRICE_MIN),
  max: Math.min(PRICE_MAX, Number(params.get("max")) || PRICE_MAX),
  available: params.get("stock") === "1",
  query: params.get("q") ?? "",
  sort: params.get("sort") ?? "newest",
})

function Filters({
  state,
  setParam,
  clear,
  mobile = false,
  resultCount,
  close,
}: {
  state: FilterState
  setParam: (key: string, value?: string) => void
  clear: () => void
  mobile?: boolean
  resultCount: number
  close?: () => void
}) {
  const [search, setSearch] = useState(state.query)
  const firstSearch = useRef(true)
  const active =
    state.categories.length > 0 ||
    state.weights.length > 0 ||
    state.min > PRICE_MIN ||
    state.max < PRICE_MAX ||
    state.available ||
    Boolean(state.query)

  useEffect(() => setSearch(state.query), [state.query])

  useEffect(() => {
    if (firstSearch.current) {
      firstSearch.current = false
      return
    }
    const timer = window.setTimeout(
      () => setParam("q", search.trim() || undefined),
      200,
    )
    return () => window.clearTimeout(timer)
  }, [search, setParam])

  const toggleCategory = (category: Category) => {
    const next = state.categories.includes(category)
      ? state.categories.filter((item) => item !== category)
      : [...state.categories, category]
    setParam("cat", next.length ? next.join(",") : undefined)
  }

  const toggleWeight = (weight: number) => {
    const next = state.weights.includes(weight)
      ? state.weights.filter((item) => item !== weight)
      : [...state.weights, weight]
    setParam("w", next.length ? next.join(",") : undefined)
  }

  return (
    <div className={mobile ? "pb-24" : ""}>
      {/* Search Input */}
      <div className="border-b border-ink/15 pb-5">
        <label className="relative block">
          <span className="sr-only">ابحث عن منتج</span>
          <Search
            size={18}
            strokeWidth={1.5}
            className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-ink/50"
          />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="ابحث عن منتج..."
            className="h-11 w-full rounded-full border border-ink/30 bg-paper pr-10 pl-4 text-sm text-ink outline-none placeholder:text-ink/45 focus:border-ink"
          />
        </label>
      </div>

      {/* Category Filter */}
      <div className="border-b border-ink/15 py-5">
        <div className="font-display mb-3 text-[15px] font-bold text-ink">
          القسم
        </div>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((category) => {
            const selected = state.categories.includes(category)
            const count = PRODUCTS.filter(
              (product) => product.category === category,
            ).length
            return (
              <button
                key={category}
                type="button"
                onClick={() => toggleCategory(category)}
                className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                  selected
                    ? "border-ink bg-ink text-paper"
                    : "border-ink/20 bg-paper text-ink hover:border-ink/50"
                }`}
              >
                <span
                  className="size-2 rounded-full"
                  style={{ backgroundColor: CATEGORY_META[category].color }}
                />
                {CATEGORY_META[category].title}
                <span className="tnum opacity-65">({fmt(count)})</span>
                {selected && <Check size={12} strokeWidth={1.5} />}
              </button>
            )
          })}
        </div>
      </div>

      {/* Weight Filter */}
      <div className="border-b border-ink/15 py-5">
        <div className="font-display mb-3 text-[15px] font-bold text-ink">
          الوزن
        </div>
        <div className="flex flex-wrap gap-2">
          {WEIGHTS.map((weight) => {
            const selected = state.weights.includes(weight)
            return (
              <button
                key={weight}
                type="button"
                onClick={() => toggleWeight(weight)}
                className={`tnum rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                  selected
                    ? "border-ink bg-ink text-paper"
                    : "border-ink/20 bg-paper text-ink hover:border-ink/50"
                }`}
              >
                {fmt(weight)} جم
              </button>
            )
          })}
        </div>
      </div>

      {/* Price Filter */}
      <div className="border-b border-ink/15 py-5">
        <div className="mb-3 flex items-center justify-between">
          <span className="font-display text-[15px] font-bold text-ink">
            السعر
          </span>
          <span className="tnum text-xs font-semibold text-ink/75">
            {fmt(state.min)} — {fmt(state.max)} ج.م
          </span>
        </div>
        <div className="dual-range relative h-7" dir="ltr">
          <div className="absolute inset-x-0 top-3 h-1 rounded-full bg-ink/15" />
          <div
            className="absolute top-3 h-1 rounded-full bg-rose"
            style={{
              left: `${state.min}%`,
              right: `${PRICE_MAX - state.max}%`,
            }}
          />
          <input
            aria-label="أقل سعر"
            type="range"
            min={PRICE_MIN}
            max={PRICE_MAX}
            value={state.min}
            onChange={(event) => {
              const value = Math.min(Number(event.target.value), state.max - 1)
              setParam("min", value > PRICE_MIN ? String(value) : undefined)
            }}
          />
          <input
            aria-label="أعلى سعر"
            type="range"
            min={PRICE_MIN}
            max={PRICE_MAX}
            value={state.max}
            onChange={(event) => {
              const value = Math.max(Number(event.target.value), state.min + 1)
              setParam("max", value < PRICE_MAX ? String(value) : undefined)
            }}
          />
        </div>
      </div>

      {/* Stock Toggle */}
      <div className="flex items-center justify-between border-b border-ink/15 py-5">
        <span className="text-sm font-medium text-ink">المتاح فقط</span>
        <button
          type="button"
          role="switch"
          aria-checked={state.available}
          onClick={() => setParam("stock", state.available ? undefined : "1")}
          className={`relative h-6 w-11 rounded-full border border-ink transition-colors ${
            state.available ? "bg-rose" : "bg-paper"
          }`}
        >
          <motion.span
            animate={{ x: state.available ? -20 : 0 }}
            transition={SPRING}
            className="absolute right-0.5 top-0.5 size-4.5 rounded-full bg-ink"
          />
        </button>
      </div>

      {/* Clear Filters */}
      {active && (
        <button
          type="button"
          onClick={clear}
          className="mt-5 border-b border-ink pb-0.5 text-xs font-semibold text-ink hover:text-rose"
        >
          مسح كل الفلاتر
        </button>
      )}

      {/* Mobile Sticky Button */}
      {mobile && (
        <div className="fixed inset-x-0 bottom-0 border-t border-ink/20 bg-paper p-4 shadow-lg">
          <button
            type="button"
            onClick={close}
            className="btn-primary h-12 w-full text-base font-semibold"
          >
            عرض النتائج ({fmt(resultCount)})
          </button>
        </div>
      )}
    </div>
  )
}

function sortProducts(products: Product[], sort: string) {
  return [...products].sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price
    if (sort === "price-desc") return b.price - a.price
    if (sort === "name") return a.name.localeCompare(b.name, "ar")
    return PRODUCTS.indexOf(a) - PRODUCTS.indexOf(b)
  })
}

export default function Shop() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const state = useMemo(
    () => readState(new URLSearchParams(searchParams.toString())),
    [searchParams],
  )
  const [sheetOpen, setSheetOpen] = useState(false)

  const setParam = useCallback(
    (key: string, value?: string) => {
      const next = new URLSearchParams(searchParams.toString())
      if (value) next.set(key, value)
      else next.delete(key)
      const query = next.toString()
      router.replace(query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      })
    },
    [pathname, router, searchParams],
  )

  const clear = useCallback(
    () => router.replace(pathname, { scroll: false }),
    [pathname, router],
  )

  useEffect(() => {
    const open = () => setSheetOpen(true)
    window.addEventListener("open-shop-filters", open)
    return () => window.removeEventListener("open-shop-filters", open)
  }, [])

  useEffect(() => {
    document.body.style.overflow = sheetOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [sheetOpen])

  const filtered = useMemo(() => {
    const query = normalizeArabic(state.query)
    return sortProducts(
      PRODUCTS.filter((product) => {
        if (
          state.categories.length &&
          !state.categories.includes(product.category)
        )
          return false
        if (
          state.weights.length &&
          !state.weights.includes(product.weight ?? -1)
        )
          return false
        if (product.price < state.min || product.price > state.max) return false
        if (state.available && !product.inStock) return false
        if (query && !normalizeArabic(product.name).includes(query))
          return false
        return true
      }),
      state.sort,
    )
  }, [state])

  const chips = [
    ...state.categories.map((category) => ({
      key: `cat-${category}`,
      label: CATEGORY_META[category].title,
      remove: () =>
        setParam(
          "cat",
          state.categories.filter((item) => item !== category).join(",") ||
            undefined,
        ),
    })),
    ...state.weights.map((weight) => ({
      key: `weight-${weight}`,
      label: `${fmt(weight)} جم`,
      remove: () =>
        setParam(
          "w",
          state.weights.filter((item) => item !== weight).join(",") ||
            undefined,
        ),
    })),
    ...(state.query
      ? [
          {
            key: "query",
            label: state.query,
            remove: () => setParam("q"),
          },
        ]
      : []),
  ]

  return (
    <main className="pt-24 md:pt-28">
      {/* Page Header */}
      <div className="border-b border-ink/15 bg-paper/50 px-5 py-8 md:px-10 md:py-10">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-4 text-xs font-medium text-ink/60">
            <Link href="/" className="hover:underline">
              الرئيسية
            </Link>{" "}
            / المتجر
          </div>
          <div className="flex items-baseline justify-between gap-4">
            <div>
              <span className="font-accent text-sm font-bold text-rose">
                قائمة المنتجات الكاملة
              </span>
              <h1 className="font-display mt-0.5 text-[clamp(2rem,4vw,3.25rem)] font-bold text-ink">
                كل المنتجات
              </h1>
            </div>
            <span className="tnum shrink-0 text-sm font-semibold text-ink/70">
              {fmt(filtered.length)} منتج
            </span>
          </div>

          {/* Folder Index Tabs on Baseline */}
          <div className="mt-8 flex items-end gap-1.5 overflow-x-auto border-b border-ink/25 pt-2 no-scrollbar">
            <button
              type="button"
              onClick={() => setParam("cat", undefined)}
              className={`tnum shrink-0 rounded-t-lg border-x border-t px-4 py-2 text-xs font-semibold transition-colors ${
                state.categories.length === 0
                  ? "border-ink bg-paper text-ink border-b-2 border-b-paper -mb-[1px] shadow-2xs"
                  : "border-transparent bg-paper/60 text-ink/65 hover:text-ink"
              }`}
            >
              الكل ({fmt(PRODUCTS.length)})
            </button>
            {CATEGORIES.map((category) => {
              const active = state.categories.includes(category)
              const count = PRODUCTS.filter(
                (p) => p.category === category,
              ).length
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() =>
                    setParam("cat", active ? undefined : category)
                  }
                  style={active ? { backgroundColor: CATEGORY_META[category].color } : {}}
                  className={`shrink-0 rounded-t-lg border-x border-t px-3.5 py-2 text-xs font-semibold transition-colors ${
                    active
                      ? "border-ink text-ink border-b-2 -mb-[1px] shadow-2xs"
                      : "border-transparent bg-paper/60 text-ink/65 hover:text-ink"
                  }`}
                >
                  {CATEGORY_META[category].title} ({fmt(count)})
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Main Shop Grid */}
      <div className="mx-auto grid max-w-[1200px] gap-8 px-5 py-8 md:px-10 lg:grid-cols-[250px_1fr] lg:gap-10 lg:py-12">
        {/* Right Sidebar Filters (Desktop) */}
        <aside className="hidden lg:block">
          <div className="sticky top-28 rounded-2xl border border-ink/15 bg-paper p-5 shadow-xs">
            <Filters
              state={state}
              setParam={setParam}
              clear={clear}
              resultCount={filtered.length}
            />
          </div>
        </aside>

        {/* Products Grid & Active Chips */}
        <div className="min-w-0">
          <div className="mb-6 flex flex-col-reverse gap-3 border-b border-ink/15 pb-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Active Chips */}
            <div className="flex min-w-0 flex-wrap gap-1.5">
              {chips.map((chip) => (
                <button
                  key={chip.key}
                  type="button"
                  onClick={chip.remove}
                  className="flex items-center gap-1.5 rounded-full border border-ink/20 bg-paper px-2.5 py-1 text-xs font-medium text-ink transition-colors hover:border-ink"
                >
                  <span>{chip.label}</span>
                  <X size={12} strokeWidth={1.5} />
                </button>
              ))}
            </div>

            {/* Sort Selector */}
            <label className="relative shrink-0 self-end sm:self-auto">
              <span className="sr-only">الترتيب</span>
              <select
                value={state.sort}
                onChange={(event) =>
                  setParam(
                    "sort",
                    event.target.value === "newest"
                      ? undefined
                      : event.target.value,
                  )
                }
                className="h-10 min-w-40 appearance-none rounded-full border border-ink/30 bg-paper pr-3.5 pl-9 text-xs font-medium text-ink outline-none focus:border-ink"
              >
                <option value="newest">الترتيب: الأحدث</option>
                <option value="price-asc">السعر: من الأقل</option>
                <option value="price-desc">السعر: من الأعلى</option>
                <option value="name">الاسم أبجديًا</option>
              </select>
              <ChevronDown
                size={14}
                strokeWidth={1.5}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink/60"
              />
            </label>
          </div>

          {/* Product Cards */}
          {filtered.length ? (
            <motion.div
              layout
              className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 md:gap-5"
            >
              <AnimatePresence mode="popLayout">
                {filtered.map((product) => (
                  <motion.div
                    layout
                    key={product.id}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-ink/25 p-8 text-center">
              <p className="font-display text-xl font-semibold text-ink">
                مفيش منتجات بالفلاتر دي.
              </p>
              <button
                type="button"
                onClick={clear}
                className="mt-3 border-b border-ink text-sm font-semibold text-ink hover:text-rose"
              >
                امسح الفلاتر
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filters Sheet */}
      <AnimatePresence>
        {sheetOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSheetOpen(false)}
              className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-[2px] lg:hidden"
            />
            <motion.aside
              role="dialog"
              aria-modal="true"
              aria-label="فلترة المنتجات"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={SPRING}
              className="fixed inset-x-0 bottom-0 z-50 max-h-[85svh] overflow-y-auto rounded-t-3xl border-t border-ink/20 bg-paper px-6 pt-5 pb-8 shadow-2xl lg:hidden"
            >
              <div className="mb-4 flex items-center justify-between border-b border-ink/15 pb-3">
                <h2 className="font-display text-xl font-bold text-ink">
                  فلتر المنتجات
                </h2>
                <button
                  type="button"
                  onClick={() => setSheetOpen(false)}
                  aria-label="إغلاق"
                  className="grid size-8 place-items-center rounded-full border border-ink/20"
                >
                  <X size={18} strokeWidth={1.5} />
                </button>
              </div>
              <Filters
                state={state}
                setParam={setParam}
                clear={clear}
                mobile
                resultCount={filtered.length}
                close={() => setSheetOpen(false)}
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </main>
  )
}
