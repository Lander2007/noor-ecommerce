# NOoOR Farm — Product Photography Specifications & Directory

This document catalogs product photography assets for NOoOR Farm, detailing generated assets, photography guidelines, seamless multiply blending, and ready-to-paste prompts for remaining items.

---

## 1. Photography Style Specification

Every product photograph strictly follows these rules:
- **Framing & Angle**: One single fresh product (or cluster), centered, shot from a 3/4 top-down perspective.
- **Lighting & Shadow**: Soft natural daylight, subtle soft contact shadow directly underneath.
- **Background**: Pure solid white `#FFFFFF` (`rgb(255, 255, 255)`) with zero texture, vignetting, or gradients.
- **Packaging Rules**:
  - **Fresh Vegetables & Fruits (`veg`, `fruit`)**: Loose, fresh, unpeeled.
  - **Cut-and-Ready Produce (`cut`)**: In a simple clear round container with a plain sage-colored lid placed beside it.
  - **Salads & Pre-chopped (`salad`)**: In a small clear deli/tub container with ingredients visible.
- **Strict Bans**: No text, no logos or labels, no hands, no cutting boards, no cutlery, no background props.
- **Format**: Square 1024x1024, exported as WebP, saved to `/public/products/{id}.webp`.
- **Seamless Blending**: Every photo is rendered with `mix-blend-mode: multiply` inside its category-colored card or hero panel. Because the photo background is pure `#FFFFFF`, the white disappears completely and the card color (`#F6C1C9`, `#F7E9C4`, `#CFDDBF`, `#F9E3E3`) shows through without edge artifacts or fringes.
- **Fallback**: Products without an image render the signature Arabic letter centered inside a dotted ring.

---

## 2. Image Status & Prompt Directory

### A. Hero Showcase Products (5 of 5 Generated)

| ID | Arabic Name | Category | Status | File Path | Prompt |
|---|---|---|---|---|---|
| `veg-0` | طماطم بلدي | veg | Generated | `/public/products/veg-0.webp` | Fresh ripe red Egyptian tomatoes on the vine, centered, 3/4 top-down angle, soft natural daylight, subtle contact shadow, pure white #FFFFFF background, no props, studio product shot |
| `fruit-0` | تفاح أحمر | fruit | Generated | `/public/products/fruit-0.webp` | Crisp fresh red apple with a green leaf on stem, centered, 3/4 top-down angle, soft natural daylight, subtle contact shadow, pure white #FFFFFF background, no props, studio product shot |
| `cut-0` | بامية مقمعة | cut | Generated | `/public/products/cut-0.webp` | Fresh green trimmed okra pods in a simple clear round food container with a plain sage green lid placed beside it, centered, 3/4 top-down angle, soft natural daylight, subtle contact shadow, pure white #FFFFFF background, no text, no props |
| `salad-0` | كول سلو | salad | Generated | `/public/products/salad-0.webp` | Fresh creamy coleslaw salad in a small clear plastic deli tub, centered, 3/4 top-down angle, soft natural daylight, subtle contact shadow, pure white #FFFFFF background, no props |
| `veg-1` | خيار بلدي | veg | Generated | `/public/products/veg-1.webp` | Fresh crisp Egyptian green cucumbers, centered, 3/4 top-down angle, soft natural daylight, subtle contact shadow, pure white #FFFFFF background, no props |

---

### B. Featured & Store Catalog Products

| ID | Arabic Name | Category | Status | File Path | Prompt |
|---|---|---|---|---|---|
| `veg-2` | جزر طازج | veg | Generated | `/public/products/veg-2.webp` | Fresh vibrant orange carrots with leafy green tops, centered, 3/4 top-down angle, soft natural daylight, subtle contact shadow, pure white #FFFFFF background, no props |
| `fruit-1` | موز | fruit | Generated | `/public/products/fruit-1.webp` | Small bunch of fresh ripe yellow bananas, centered, 3/4 top-down angle, soft natural daylight, subtle contact shadow, pure white #FFFFFF background, no props |
| `veg-3` | فلفل رومي ألوان | veg | Pending | `/public/products/veg-3.webp` | Trio of fresh colorful bell peppers (red, yellow, and green), centered, 3/4 top-down angle, soft natural daylight, subtle contact shadow, pure white #FFFFFF background, no props |
| `veg-4` | بطاطس | veg | Pending | `/public/products/veg-4.webp` | Fresh clean Egyptian potatoes, centered, 3/4 top-down angle, soft natural daylight, subtle contact shadow, pure white #FFFFFF background, no props |
| `veg-5` | بصل أحمر | veg | Pending | `/public/products/veg-5.webp` | Fresh red Egyptian onions with papery skins, centered, 3/4 top-down angle, soft natural daylight, subtle contact shadow, pure white #FFFFFF background, no props |
| `veg-6` | كوسة بلدي | veg | Pending | `/public/products/veg-6.webp` | Fresh small Egyptian zucchini (courgettes), light green, centered, 3/4 top-down angle, soft natural daylight, subtle contact shadow, pure white #FFFFFF background, no props |
| `veg-7` | فلفل أخضر | veg | Pending | `/public/products/veg-7.webp` | Fresh spicy green chili peppers, centered, 3/4 top-down angle, soft natural daylight, subtle contact shadow, pure white #FFFFFF background, no props |
| `fruit-2` | عنب أحمر | fruit | Pending | `/public/products/fruit-2.webp` | Cluster of fresh sweet red grapes, centered, 3/4 top-down angle, soft natural daylight, subtle contact shadow, pure white #FFFFFF background, no props |
| `fruit-3` | فراولة | fruit | Pending | `/public/products/fruit-3.webp` | Fresh juicy red strawberries with green caps, centered, 3/4 top-down angle, soft natural daylight, subtle contact shadow, pure white #FFFFFF background, no props |
| `fruit-4` | برتقال | fruit | Pending | `/public/products/fruit-4.webp` | Fresh juicy orange citrus fruits, centered, 3/4 top-down angle, soft natural daylight, subtle contact shadow, pure white #FFFFFF background, no props |
| `fruit-5` | مانجو | fruit | Pending | `/public/products/fruit-5.webp` | Fresh ripe Egyptian mango, centered, 3/4 top-down angle, soft natural daylight, subtle contact shadow, pure white #FFFFFF background, no props |
| `fruit-6` | كمثرى | fruit | Pending | `/public/products/fruit-6.webp` | Fresh sweet green-yellow pears, centered, 3/4 top-down angle, soft natural daylight, subtle contact shadow, pure white #FFFFFF background, no props |
| `fruit-7` | جوافة | fruit | Pending | `/public/products/fruit-7.webp` | Fresh ripe Egyptian guava, centered, 3/4 top-down angle, soft natural daylight, subtle contact shadow, pure white #FFFFFF background, no props |
| `cut-1` | قلقاس مكعبات مع سلق | cut | Pending | `/public/products/cut-1.webp` | Diced taro cubes with chopped green swiss chard in a simple clear round food container with a plain sage green lid placed beside it, centered, 3/4 top-down angle, soft natural daylight, subtle contact shadow, pure white #FFFFFF background, no props |
| `cut-2` | ملوخية متخرطة | cut | Pending | `/public/products/cut-2.webp` | Finely minced fresh green molokhia leaves in a simple clear round container with a plain sage green lid placed beside it, centered, 3/4 top-down angle, soft natural daylight, subtle contact shadow, pure white #FFFFFF background, no props |
| `cut-3` | سبانخ بيبي | cut | Pending | `/public/products/cut-3.webp` | Clean baby spinach leaves in a simple clear round food container with a plain sage green lid placed beside it, centered, 3/4 top-down angle, soft natural daylight, subtle contact shadow, pure white #FFFFFF background, no props |
| `cut-4` | فاصوليا متقطعة | cut | Pending | `/public/products/cut-4.webp` | Cut green beans in a simple clear round food container with a plain sage green lid placed beside it, centered, 3/4 top-down angle, soft natural daylight, subtle contact shadow, pure white #FFFFFF background, no props |
| `cut-5` | بسلة متفصصة | cut | Pending | `/public/products/cut-5.webp` | Shelled green peas in a simple clear round food container with a plain sage green lid placed beside it, centered, 3/4 top-down angle, soft natural daylight, subtle contact shadow, pure white #FFFFFF background, no props |
| `cut-6` | بسلة مع جزر مكعبات | cut | Pending | `/public/products/cut-6.webp` | Mixed green peas and diced orange carrots in a simple clear round food container with a plain sage green lid placed beside it, centered, 3/4 top-down angle, soft natural daylight, subtle contact shadow, pure white #FFFFFF background, no props |
| `cut-7` | كرنب مسلوق ومتقطع | cut | Pending | `/public/products/cut-7.webp` | Boiled and cut cabbage leaves ready for rolling in a simple clear round container with a plain sage green lid placed beside it, centered, 3/4 top-down angle, soft natural daylight, subtle contact shadow, pure white #FFFFFF background, no props |
| `cut-8` | قرنبيط مسلوق ومتقطع | cut | Pending | `/public/products/cut-8.webp` | Steamed cauliflower florets in a simple clear round container with a plain sage green lid placed beside it, centered, 3/4 top-down angle, soft natural daylight, subtle contact shadow, pure white #FFFFFF background, no props |
| `cut-9` | قرنبيط متقطع فصوص | cut | Pending | `/public/products/cut-9.webp` | Fresh cut raw cauliflower florets in a simple clear round container with a plain sage green lid placed beside it, centered, 3/4 top-down angle, soft natural daylight, subtle contact shadow, pure white #FFFFFF background, no props |
| `cut-10` | بروكلي مسلوق ومتقطع | cut | Pending | `/public/products/cut-10.webp` | Steamed broccoli florets in a simple clear round container with a plain sage green lid placed beside it, centered, 3/4 top-down angle, soft natural daylight, subtle contact shadow, pure white #FFFFFF background, no props |
| `cut-11` | قرع عسل متقطع | cut | Pending | `/public/products/cut-11.webp` | Diced butternut pumpkin cubes in a simple clear round container with a plain sage green lid placed beside it, centered, 3/4 top-down angle, soft natural daylight, subtle contact shadow, pure white #FFFFFF background, no props |
| `cut-12` | ذرة متقطعة | cut | Pending | `/public/products/cut-12.webp` | Cut sweet corn cob sections in a simple clear round container with a plain sage green lid placed beside it, centered, 3/4 top-down angle, soft natural daylight, subtle contact shadow, pure white #FFFFFF background, no props |
| `cut-13` | أفوكادو متقطع | cut | Pending | `/public/products/cut-13.webp` | Sliced fresh green avocado in a simple clear round container with a plain sage green lid placed beside it, centered, 3/4 top-down angle, soft natural daylight, subtle contact shadow, pure white #FFFFFF background, no props |
| `cut-14` | كوسة متقورة | cut | Pending | `/public/products/cut-14.webp` | Cored hollowed zucchini for stuffing in a simple clear round container with a plain sage green lid placed beside it, centered, 3/4 top-down angle, soft natural daylight, subtle contact shadow, pure white #FFFFFF background, no props |
| `cut-15` | بذنجان متقور أبيض | cut | Pending | `/public/products/cut-15.webp` | Cored hollowed white eggplants for stuffing in a simple clear round container with a plain sage green lid placed beside it, centered, 3/4 top-down angle, soft natural daylight, subtle contact shadow, pure white #FFFFFF background, no props |
| `cut-16` | بذنجان متقور أسود | cut | Pending | `/public/products/cut-16.webp` | Cored hollowed black eggplants for stuffing in a simple clear round container with a plain sage green lid placed beside it, centered, 3/4 top-down angle, soft natural daylight, subtle contact shadow, pure white #FFFFFF background, no props |
| `cut-17` | بطاطس متقورة | cut | Pending | `/public/products/cut-17.webp` | Cored hollowed potatoes for stuffing in a simple clear round container with a plain sage green lid placed beside it, centered, 3/4 top-down angle, soft natural daylight, subtle contact shadow, pure white #FFFFFF background, no props |
| `cut-18` | بصل متقور | cut | Pending | `/public/products/cut-18.webp` | Cored hollowed onions for stuffing in a simple clear round container with a plain sage green lid placed beside it, centered, 3/4 top-down angle, soft natural daylight, subtle contact shadow, pure white #FFFFFF background, no props |
| `cut-19` | طماطم متقورة | cut | Pending | `/public/products/cut-19.webp` | Cored hollowed red tomatoes for stuffing in a simple clear round container with a plain sage green lid placed beside it, centered, 3/4 top-down angle, soft natural daylight, subtle contact shadow, pure white #FFFFFF background, no props |
| `cut-20` | خضار سوتيه متقطع | cut | Pending | `/public/products/cut-20.webp` | Mixed chopped sauté vegetables (carrots, zucchini, beans) in a simple clear round container with a plain sage green lid placed beside it, centered, 3/4 top-down angle, soft natural daylight, subtle contact shadow, pure white #FFFFFF background, no props |
| `salad-1` | سلطة خضراء حلقات | salad | Pending | `/public/products/salad-1.webp` | Sliced green salad rings (cucumbers, tomatoes, onions) in a small clear plastic deli tub, centered, 3/4 top-down angle, soft natural daylight, subtle contact shadow, pure white #FFFFFF background, no props |
| `salad-2` | سلطة خضراء صوابع | salad | Pending | `/public/products/salad-2.webp` | Fresh vegetable batons / sticks (carrots, cucumber, peppers) in a small clear plastic deli tub, centered, 3/4 top-down angle, soft natural daylight, subtle contact shadow, pure white #FFFFFF background, no props |
| `salad-3` | سلطة خضراء مكعبات صغيرة | salad | Pending | `/public/products/salad-3.webp` | Fine diced Mediterranean green salad in a small clear plastic deli tub, centered, 3/4 top-down angle, soft natural daylight, subtle contact shadow, pure white #FFFFFF background, no props |
| `salad-4` | كابوتشي متقطع | salad | Pending | `/public/products/salad-4.webp` | Shredded crisp iceberg lettuce in a small clear plastic deli tub, centered, 3/4 top-down angle, soft natural daylight, subtle contact shadow, pure white #FFFFFF background, no props |
| `salad-5` | كرنب أخضر متقطع | salad | Pending | `/public/products/salad-5.webp` | Finely shredded green cabbage in a small clear plastic deli tub, centered, 3/4 top-down angle, soft natural daylight, subtle contact shadow, pure white #FFFFFF background, no props |
| `salad-6` | كرنب أحمر متقطع | salad | Pending | `/public/products/salad-6.webp` | Finely shredded red cabbage in a small clear plastic deli tub, centered, 3/4 top-down angle, soft natural daylight, subtle contact shadow, pure white #FFFFFF background, no props |
| `salad-7` | ليمون حلقات | salad | Pending | `/public/products/salad-7.webp` | Fresh sliced lemon rounds in a small clear plastic deli tub, centered, 3/4 top-down angle, soft natural daylight, subtle contact shadow, pure white #FFFFFF background, no props |
| `salad-8` | برتقال حلقات | salad | Pending | `/public/products/salad-8.webp` | Fresh sliced orange rounds in a small clear plastic deli tub, centered, 3/4 top-down angle, soft natural daylight, subtle contact shadow, pure white #FFFFFF background, no props |
| `salad-9` | رمان حبات | salad | Pending | `/public/products/salad-9.webp` | Fresh ruby red pomegranate seeds in a small clear plastic deli tub, centered, 3/4 top-down angle, soft natural daylight, subtle contact shadow, pure white #FFFFFF background, no props |
| `salad-10` | جزر صوابع | salad | Pending | `/public/products/salad-10.webp` | Fresh carrot batons in a small clear plastic deli tub, centered, 3/4 top-down angle, soft natural daylight, subtle contact shadow, pure white #FFFFFF background, no props |
| `salad-11` | خيار صوابع | salad | Pending | `/public/products/salad-11.webp` | Fresh crisp cucumber batons in a small clear plastic deli tub, centered, 3/4 top-down angle, soft natural daylight, subtle contact shadow, pure white #FFFFFF background, no props |
| `salad-12` | جزر وخيار صوابع | salad | Pending | `/public/products/salad-12.webp` | Fresh mixed carrot and cucumber batons in a small clear plastic deli tub, centered, 3/4 top-down angle, soft natural daylight, subtle contact shadow, pure white #FFFFFF background, no props |
| `salad-13` | طماطم حلقات | salad | Pending | `/public/products/salad-13.webp` | Fresh sliced red tomato rounds in a small clear plastic deli tub, centered, 3/4 top-down angle, soft natural daylight, subtle contact shadow, pure white #FFFFFF background, no props |
| `salad-14` | أفوكادو صوابع | salad | Pending | `/public/products/salad-14.webp` | Fresh avocado slices in a small clear plastic deli tub, centered, 3/4 top-down angle, soft natural daylight, subtle contact shadow, pure white #FFFFFF background, no props |
| `salad-15` | جرجير بالرمان والأفوكادو | salad | Pending | `/public/products/salad-15.webp` | Fresh wild arugula salad with pomegranate arils and sliced avocado in a small clear plastic deli tub, centered, 3/4 top-down angle, soft natural daylight, subtle contact shadow, pure white #FFFFFF background, no props |
| `salad-16` | طماطم شيري مع جرجير وذرة | salad | Pending | `/public/products/salad-16.webp` | Fresh cherry tomatoes, wild arugula, and sweet corn kernels in a small clear plastic deli tub, centered, 3/4 top-down angle, soft natural daylight, subtle contact shadow, pure white #FFFFFF background, no props |
| `salad-17` | فاصوليا حمراء وذرة وفلفل | salad | Pending | `/public/products/salad-17.webp` | Fresh red kidney beans, sweet corn, diced bell peppers, and pomegranate arils in a small clear plastic deli tub, centered, 3/4 top-down angle, soft natural daylight, subtle contact shadow, pure white #FFFFFF background, no props |
