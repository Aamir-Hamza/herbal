export type Product = {
  id: string
  name: string
  tagline: string
  description: string
  price: number
  compareAt?: number
  image: string
  badge?: string
  concern: string
  rating: number
  reviews: number
  tags: string[]
  ingredients: string[]
  accent: string
  glassColor: string
  liquidColor: string
  size: string
  featured?: boolean
}

export const products: Product[] = [
  {
    id: "tulsi-tea",
    name: "Tulsi Original Herbal Tea",
    tagline: "Holy basil for everyday calm",
    description:
      "A daily cup of Rama, Krishna, Vana, and Holy Basil — the complete plant, never an extract — grown on regenerative plots and harvested at first light.",
    price: 8.75,
    compareAt: 10.5,
    image: "/images/product-tulsi-tea.png",
    badge: "Best Seller",
    concern: "Stress & Mood",
    rating: 4.9,
    reviews: 2140,
    tags: ["100% Organic", "Farm Direct"],
    ingredients: ["Rama Tulsi", "Krishna Tulsi", "Vana Tulsi"],
    accent: "#3F6B4A",
    glassColor: "#6f8f68",
    liquidColor: "#1e3a28",
    size: "18 sachets",
    featured: true,
  },
  {
    id: "ashwagandha",
    name: "Ashwagandha Whole Root",
    tagline: "Strength, stamina & vitality",
    description:
      "Whole KSM-grade root, milled slowly to keep the plant’s full spectrum. A grounding tonic for stamina, focus, and the long arc of the day.",
    price: 16.0,
    compareAt: 19.0,
    image: "/images/product-ashwagandha.png",
    badge: "Best Seller",
    concern: "Energy",
    rating: 4.8,
    reviews: 1688,
    tags: ["100% Organic", "Whole Root"],
    ingredients: ["Ashwagandha root", "Black pepper"],
    accent: "#8B5A2B",
    glassColor: "#9a6b3c",
    liquidColor: "#5c3418",
    size: "90 capsules",
    featured: true,
  },
  {
    id: "ghee",
    name: "Grass-fed Cow Ghee",
    tagline: "Slow-churned kitchen essential",
    description:
      "Cultured, slow-churned ghee from pasture-raised herds. A golden fat for cooking, coffee, and evening rituals — nutty, clean, and shelf-stable.",
    price: 14.25,
    image: "/images/product-ghee.png",
    concern: "Kitchen",
    rating: 4.7,
    reviews: 940,
    tags: ["Farm Direct", "Grass-fed"],
    ingredients: ["Cultured cow ghee"],
    accent: "#D4AF37",
    glassColor: "#e8d59a",
    liquidColor: "#c4a035",
    size: "250 ml",
    featured: true,
  },
  {
    id: "honey",
    name: "Raw Wildflower Honey",
    tagline: "Unheated & single-origin",
    description:
      "Unheated wildflower honey from high-meadow apiaries. Floral, mineral, and never blended — a spoonful of the season it was made in.",
    price: 11.5,
    compareAt: 13.0,
    image: "/images/product-honey.png",
    badge: "Limited",
    concern: "Kitchen",
    rating: 4.9,
    reviews: 612,
    tags: ["Raw", "Single Origin"],
    ingredients: ["Wildflower honey"],
    accent: "#C48A2A",
    glassColor: "#d4a04a",
    liquidColor: "#b56b16",
    size: "350 g",
    featured: true,
  },
  {
    id: "moringa",
    name: "Moringa Whole Leaf Capsules",
    tagline: "Daily plant-based greens",
    description:
      "Shade-dried whole leaf, not a juice powder. Iron, chlorophyll, and the quiet density of a plant that thrives in harsh soil.",
    price: 15.0,
    image: "/images/product-moringa.png",
    badge: "New",
    concern: "Immunity",
    rating: 4.6,
    reviews: 421,
    tags: ["100% Organic", "Whole Leaf"],
    ingredients: ["Moringa oleifera leaf"],
    accent: "#1B3B2B",
    glassColor: "#3d5c48",
    liquidColor: "#14261c",
    size: "60 capsules",
    featured: true,
  },
  {
    id: "turmeric",
    name: "Turmeric Formula Blend",
    tagline: "Golden root, whole-spice power",
    description:
      "Whole turmeric root with ginger and black pepper — the kitchen trinity, kept intact so curcuminoids travel with their natural companions.",
    price: 12.5,
    compareAt: 15.0,
    image: "/images/product-turmeric.png",
    badge: "New",
    concern: "Joint Support",
    rating: 4.8,
    reviews: 1304,
    tags: ["100% Organic", "Farm Direct"],
    ingredients: ["Turmeric root", "Ginger", "Black pepper"],
    accent: "#C26B1A",
    glassColor: "#d4893a",
    liquidColor: "#a34e0f",
    size: "90 capsules",
    featured: true,
  },
]

export const bestSellers = products.filter((p) =>
  ["tulsi-tea", "ashwagandha", "ghee", "honey"].includes(p.id),
)

export const newArrivals = products.filter((p) =>
  ["moringa", "turmeric"].includes(p.id),
)

export const concerns = [
  "Immunity",
  "Stress & Mood",
  "Sleep",
  "Digestion",
  "Energy",
  "Joint Support",
  "Heart Care",
  "Kitchen",
] as const

export const blogs = [
  {
    id: "tulsi",
    title: "Tulsi: The Queen of Herbs You Should Know",
    excerpt:
      "For thousands of years, holy basil has been a cornerstone of daily wellness rituals. Here is why we grow it whole.",
    image: "/images/blog-tulsi.png",
    date: "Aug 24, 2026",
    author: "Priya Menon",
  },
  {
    id: "sleep",
    title: "A Bedtime Ritual for Deeper, Calmer Sleep",
    excerpt:
      "Small, consistent evening habits — including the right herbal tea — can reset your body clock gently.",
    image: "/images/blog-sleep.png",
    date: "Aug 18, 2026",
    author: "Priya Menon",
  },
]

export const certifications = [
  "USDA Organic",
  "Non-GMO",
  "Fair Trade",
  "Gluten Free",
  "Whole Herb",
  "Ethically Sourced",
]

export const farmSteps = [
  {
    id: "seed",
    numeral: "01",
    title: "Seed",
    kicker: "Heirloom genetics",
    body: "We begin with open-pollinated varietals — Rama tulsi, wild ashwagandha, high-curcumin turmeric — saved by the same families who tend them.",
  },
  {
    id: "soil",
    numeral: "02",
    title: "Soil",
    kicker: "Living earth",
    body: "Cover crops, compost teas, and zero synthetic inputs. The farm is a closed loop: what we take from the land, we return richer.",
  },
  {
    id: "harvest",
    numeral: "03",
    title: "Harvest",
    kicker: "Peak potency",
    body: "Leaves and roots are hand-cut at first light, when volatile oils sit highest. Nothing is stripped, fractionated, or left behind.",
  },
  {
    id: "craft",
    numeral: "04",
    title: "Craft",
    kicker: "Whole herb, always",
    body: "Shade-drying, stone milling, and slow infusion. We keep the plant intact so you receive the spectrum nature designed.",
  },
  {
    id: "table",
    numeral: "05",
    title: "Table",
    kicker: "Your daily ritual",
    body: "From our fields to your cup, cabinet, or bedside. A flagship store, a farm, and a quiet practice in between.",
  },
] as const
