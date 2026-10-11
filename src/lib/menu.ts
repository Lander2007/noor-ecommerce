export type Category = "veg" | "fruit" | "cut" | "salad"

export type Product = {
  id: string
  name: string
  category: Category
  weight: number | null
  price: number
  featured: boolean
  hero?: boolean
  image?: string
  inStock: boolean
}

type CategoryMeta = {
  title: string
  color: string
}

export const CATEGORY_META: Record<Category, CategoryMeta> = {
  veg: { title: "خضار طازجة", color: "#F6C1C9" },
  fruit: { title: "فاكهة", color: "#F7E9C4" },
  cut: { title: "الخضار المتقطع", color: "#CFDDBF" },
  salad: { title: "السلطات", color: "#F9E3E3" },
}

const PRICE_BY_WEIGHT: Record<number, number> = {
  150: 25,
  250: 40,
  400: 55,
  500: 65,
}

// Map of available generated images
const PRODUCT_IMAGES: Record<string, string> = {
  "veg-0": "/products/veg-0.webp",
  "veg-1": "/products/veg-1.webp",
  "veg-2": "/products/veg-2.webp",
  "fruit-0": "/products/fruit-0.webp",
  "fruit-1": "/products/fruit-1.webp",
  "cut-0": "/products/cut-0.webp",
  "salad-0": "/products/salad-0.webp",
}

// 5 Hero Showcase products (one per category + one extra)
const HERO_IDS = new Set(["veg-0", "fruit-0", "cut-0", "salad-0", "veg-1"])

function build(
  category: Category,
  rows: string[],
  featuredFrom = Number.POSITIVE_INFINITY,
): Product[] {
  return rows.map((row, index) => {
    const match = row.match(/^(.*?)\s*\((?:علبة\s*)?(\d+)\s*جرام\)$/)
    const name = match ? match[1] : row
    const weight = match ? Number(match[2]) : null
    const premium = /أفوكادو|رمان/.test(name) ? 20 : 0
    const id = `${category}-${index}`
    return {
      id,
      name,
      category,
      weight,
      price: (weight ? PRICE_BY_WEIGHT[weight] : 70) + premium,
      featured: index < featuredFrom,
      hero: HERO_IDS.has(id),
      image: PRODUCT_IMAGES[id],
      inStock: true,
    }
  })
}

const manual = (
  category: Category,
  rows: [string, number | null, number, boolean?][],
  featuredFrom = Number.POSITIVE_INFINITY,
): Product[] =>
  rows.map(([name, weight, price, inStock = true], index) => {
    const id = `${category}-${index}`
    return {
      id,
      name,
      category,
      weight,
      price,
      featured: index < featuredFrom,
      hero: HERO_IDS.has(id),
      image: PRODUCT_IMAGES[id],
      inStock,
    }
  })

export const PRODUCTS: Product[] = [
  ...manual(
    "veg",
    [
      ["طماطم بلدي", 500, 30],
      ["خيار بلدي", 500, 25],
      ["جزر طازج", 500, 22],
      ["فلفل رومي ألوان", 500, 45],
      ["بطاطس", 500, 20],
      ["بصل أحمر", 500, 18],
      ["كوسة بلدي", 500, 32],
      ["فلفل أخضر", 500, 28],
    ],
    8,
  ),
  ...manual(
    "fruit",
    [
      ["تفاح أحمر", 500, 50],
      ["موز", 500, 35],
      ["عنب أحمر", 500, 60],
      ["فراولة", 250, 45],
      ["برتقال", 500, 28],
      ["مانجو", 500, 75],
      ["كمثرى", 500, 55],
      ["جوافة", 500, 38, false],
    ],
    2,
  ),
  ...build("cut", [
    "بامية مقمعة (400 جرام)",
    "قلقاس مكعبات مع سلق متقطع (500 جرام)",
    "ملوخية متخرطة (500 جرام)",
    "سبانخ بيبي (500 جرام)",
    "فاصوليا متقطعة (500 جرام)",
    "بسلة متفصصة (500 جرام)",
    "بسلة متفصصة مع جزر مكعبات (500 جرام)",
    "كرنب مسلوق ومتقطع (500 جرام)",
    "قرنبيط مسلوق ومتقطع (500 جرام)",
    "قرنبيط متقطع فصوص (500 جرام)",
    "بروكلي مسلوق ومتقطع (250 جرام)",
    "قرع عسل متقطع (500 جرام)",
    "ذرة متقطعة (500 جرام)",
    "أفوكادو متقطع (250 جرام)",
    "كوسة متقورة (500 جرام)",
    "بذنجان متقور أبيض (500 جرام)",
    "بذنجان متقور أسود (500 جرام)",
    "بطاطس متقورة (500 جرام)",
    "بصل متقور (250 جرام)",
    "طماطم متقورة (250 جرام)",
    "خضار سوتيه متقطع",
  ]),
  ...build("salad", [
    "كول سلو (علبة 150 جرام)",
    "سلطة خضراء حلقات (250 جرام)",
    "سلطة خضراء صوابع (250 جرام)",
    "سلطة خضراء مكعبات صغيرة (250 جرام)",
    "كابوتشي متقطع (250 جرام)",
    "كرنب أخضر متقطع (250 جرام)",
    "كرنب أحمر متقطع (250 جرام)",
    "ليمون حلقات (150 جرام)",
    "برتقال حلقات (150 جرام)",
    "رمان حبات (250 جرام)",
    "جزر صوابع (150 جرام)",
    "خيار صوابع (150 جرام)",
    "جزر وخيار صوابع (150 جرام)",
    "طماطم حلقات (150 جرام)",
    "أفوكادو صوابع (150 جرام)",
    "جرجير بالرمان والأفوكادو (150 جرام)",
    "طماطم شيري مع جرجير وذرة حلوة (150 جرام)",
    "فاصوليا حمراء وذرة وفلفل ألوان ورمان (150 جرام)",
  ]),
]

export const WHATSAPP_NUMBER = "201000000000"
