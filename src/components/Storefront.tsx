"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { CATEGORY_META, PRODUCTS, WHATSAPP_NUMBER, type Category } from "@/lib/menu"
import { LeafDivider, fmt } from "./Parts"
import ProductCard from "./ProductCard"
import HeroShowcase from "./HeroShowcase"

const FEATURED = PRODUCTS.filter((product) => product.featured).slice(0, 10)
const CATEGORIES = Object.entries(CATEGORY_META) as [
  Category,
  (typeof CATEGORY_META)[Category],
][]

const ARABIC_NUMERALS = ["١", "٢", "٣", "٤"]

const wa = (text?: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}${
    text ? `?text=${encodeURIComponent(text)}` : ""
  }`

export default function Storefront() {
  return (
    <main className="overflow-x-hidden">
      {/* =========================================================================
       * HERO SECTION: "The Showcase"
       * ========================================================================= */}
      <HeroShowcase />

      {/* Leaf Divider */}
      <LeafDivider className="mx-auto max-w-[1200px] px-5" />

      {/* =========================================================================
       * CATEGORY STRIP (4 columns desktop, 2x2 mobile, extra top padding for slip overlap)
       * ========================================================================= */}
      <section
        id="categories"
        className="mx-auto max-w-[1200px] px-5 pt-16 pb-8 md:px-10 md:pt-20"
      >
        <div className="grid grid-cols-2 gap-3.5 sm:gap-4 md:grid-cols-4">
          {CATEGORIES.map(([key, meta], index) => {
            const count = PRODUCTS.filter((p) => p.category === key).length
            return (
              <Link
                key={key}
                href={`/shop?cat=${key}`}
                style={{ backgroundColor: meta.color }}
                className="group relative flex h-[88px] max-h-[96px] items-center justify-between overflow-hidden rounded-2xl border border-ink/15 p-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(46,37,40,0.06)]"
              >
                {/* Stitch border inset */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-1.5 rounded-[11px] border border-dashed border-ink/20 group-hover:border-ink/35 transition-colors"
                />

                <div className="relative z-10 min-w-0 pr-1">
                  <div className="font-display text-[15.5px] font-bold text-ink truncate">
                    {meta.title}
                  </div>
                  <div className="tnum mt-0.5 text-xs text-ink/70">
                    {fmt(count)} صنف
                  </div>
                </div>

                <div className="relative z-10 flex size-9 shrink-0 items-center justify-center rounded-full border border-ink/20 bg-paper/90 text-sm font-bold text-ink shadow-2xs">
                  {ARABIC_NUMERALS[index]}
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Leaf Divider */}
      <LeafDivider className="mx-auto max-w-[1200px] px-5" />

      {/* =========================================================================
       * PRODUCTS SECTION (First 10, clean grid, no vertical stagger)
       * ========================================================================= */}
      <section
        id="products"
        className="mx-auto max-w-[1200px] px-5 py-12 md:px-10 md:py-16"
      >
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="font-accent text-sm font-bold text-rose">
              منتقاة بعناية
            </span>
            <h2 className="font-display mt-1 text-[clamp(1.75rem,3vw,2.5rem)] font-bold text-ink">
              المنتجات
            </h2>
            <p className="mt-1 text-sm text-ink/70">
              أول ١٠ منتجات، وباقي المنيو في صفحة المتجر.
            </p>
          </div>

          <Link
            href="/shop"
            className="flex items-center gap-1.5 text-sm font-semibold text-ink underline underline-offset-4 hover:text-rose"
          >
            <span>عرض كل المنتجات ({fmt(PRODUCTS.length)})</span>
            <ArrowLeft size={16} strokeWidth={1.5} />
          </Link>
        </div>

        {/* Clean 5-column grid on desktop, 2-column mobile */}
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 md:gap-5">
          {FEATURED.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              priority={index < 4}
            />
          ))}
        </div>

        {/* View All Products Button */}
        <div className="mt-12 flex justify-center">
          <Link
            href="/shop"
            className="btn-primary flex items-center gap-3 text-[15px] px-8 py-3.5"
          >
            <span>شوف كل المنتجات</span>
            <span className="tnum text-xs opacity-75">
              ({fmt(PRODUCTS.length)} منتج)
            </span>
            <ArrowLeft size={16} strokeWidth={1.5} />
          </Link>
        </div>
      </section>

      {/* Leaf Divider */}
      <LeafDivider className="mx-auto max-w-[1200px] px-5" />

      {/* =========================================================================
       * HOW IT WORKS (Three round seals, 72px, connected by dotted line, no cards)
       * ========================================================================= */}
      <section
        id="how-it-works"
        className="mx-auto max-w-[1200px] px-5 py-14 md:px-10 md:py-20"
      >
        <div className="text-center">
          <span className="font-accent text-sm font-bold text-rose">
            سهلة وسريعة
          </span>
          <h2 className="font-display mt-1 text-[clamp(1.75rem,3vw,2.5rem)] font-bold text-ink">
            طريقة الطلب
          </h2>
        </div>

        {/* Seals connected by dotted line */}
        <div className="relative mt-12">
          {/* Dotted connecting line behind seals on desktop */}
          <div
            aria-hidden
            className="pointer-events-none absolute top-9 right-[15%] left-[15%] hidden border-t-[1.5px] border-dashed border-sage md:block"
          />

          <div className="grid gap-8 md:grid-cols-3 md:gap-10">
            {[
              { num: "١", label: "اختار من المنيو" },
              { num: "٢", label: "ابعت الطلب على واتساب" },
              { num: "٣", label: "استلم في بيتك" },
            ].map((step) => (
              <div
                key={step.num}
                className="relative z-10 flex flex-col items-center text-center"
              >
                {/* 72px round scalloped seal */}
                <div className="relative flex size-[72px] items-center justify-center">
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
                      stroke="#E87A8E"
                      strokeWidth="0.8"
                      strokeDasharray="2.5 2.5"
                    />
                  </svg>
                  <span className="font-display relative z-10 text-2xl font-bold text-ink">
                    {step.num}
                  </span>
                </div>

                {/* Step Label */}
                <h3 className="font-display mt-4 text-base font-semibold text-ink md:text-lg">
                  {step.label}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
