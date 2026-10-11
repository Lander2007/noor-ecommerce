import Link from "next/link"
import { LogoMark } from "@/components/Parts"

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center px-5 pt-28 text-center">
      <div className="relative mb-6 size-24 rounded-full border border-dashed border-rose/60 bg-paper p-3 shadow-xs">
        <LogoMark size={84} priority className="size-full object-contain" />
      </div>

      <span className="font-accent text-lg font-bold text-rose">
        عفوًا! الصفحة غير موجودة
      </span>

      <h1 className="font-display mt-2 text-3xl font-bold text-ink md:text-4xl">
        ٤٠٤ - مش لاقيين الصفحة دي
      </h1>

      <p className="mt-3 max-w-sm text-sm text-ink/75">
        يمكن الرابط اتغير أو الصفحة اتمسحت. تقدر ترجع للمتجر وتشوف كل الخضار والفاكهة.
      </p>

      <div className="mt-8">
        <Link href="/" className="btn-primary text-sm">
          الرجوع للرئيسية
        </Link>
      </div>
    </main>
  )
}
