// Mock product data for NOX sticker brand
// Each product has a unique id, name, price, category, images, and description

export const products = [
  {
    id: "nox-001",
    name: "VOID SKULL",
    price: 4.99,
    category: "dark",
    badge: "BESTSELLER",
   images: [
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80",
      "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=600&q=80",
    ],
    description: "Holographic skull sticker with void effect. Die-cut precision. Weatherproof vinyl. Perfect for laptops, skateboards, and anything worth tagging.",
    tags: ["holographic", "skull", "dark"],
    dimensions: "3 × 3 in",
    material: "Premium Vinyl",
    finish: "Holographic",
  },
  {
    id: "nox-002",
    name: "DRIP ANGEL",
    price: 5.49,
    category: "art",
    badge: "NEW",
    images: [
      "https://images.unsplash.com/photo-1614102073832-030967418971?w=600&q=80",
      "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=600&q=80",
    ],
    description: "Melting angel figure caught mid-drip. Gloss-finish die-cut. Ultra-thin adhesive. Iconic streetwear energy in 4 inches.",
    tags: ["angel", "drip", "art"],
    dimensions: "2 × 4 in",
    material: "Premium Vinyl",
    finish: "Gloss",
  },
  {
    id: "nox-003",
    name: "NOX LOGO PACK",
    price: 8.99,
    category: "brand",
    badge: "PACK",
    images: [
      "https://images.unsplash.com/photo-1636622433525-127afdf3662d?w=600&q=80",
      "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=600&q=80",
    ],
    description: "The original NOX branding set. 5 stickers, 5 sizes, 1 energy. Black-and-white matte finish with micro-detail cuts. Statement pieces for any surface.",
    tags: ["logo", "pack", "brand"],
    dimensions: "Various",
    material: "Premium Vinyl",
    finish: "Matte",
  },
  {
    id: "nox-004",
    name: "STATIC GHOST",
    price: 4.49,
    category: "dark",
    badge: null,
    images: [
      "https://images.unsplash.com/photo-1600706432502-77a0e2e32790?w=600&q=80",
      "https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=600&q=80",
    ],
    description: "TV static ghost, wandering through frequencies. White on transparent vinyl. Great layering piece — put it over anything dark.",
    tags: ["ghost", "static", "transparent"],
    dimensions: "3 × 3.5 in",
    material: "Clear Vinyl",
    finish: "Matte",
  },
  {
    id: "nox-005",
    name: "GLITCH ROSE",
    price: 5.99,
    category: "art",
    badge: "LIMITED",
    images: [
      "https://images.unsplash.com/photo-1579548122080-c35fd6820ecb?w=600&q=80",
      "https://images.unsplash.com/photo-1614853316476-de00d14cb1fc?w=600&q=80",
    ],
    description: "A glitching red rose frozen mid-corruption. RGB shift print on gloss vinyl. Contrast that hits different.",
    tags: ["rose", "glitch", "art"],
    dimensions: "2.5 × 4 in",
    material: "Premium Vinyl",
    finish: "Gloss",
  },
  {
    id: "nox-006",
    name: "CHROME BUTTERFLY",
    price: 6.49,
    category: "foil",
    badge: "FOIL",
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
      "https://images.unsplash.com/photo-1615716173510-db64f40b51ec?w=600&q=80",
    ],
    description: "Mirror chrome butterfly. Holographic foil finish that shifts with every angle. Die-cut with .5mm precision. The most premium piece in the collection.",
    tags: ["butterfly", "chrome", "foil"],
    dimensions: "3.5 × 3.5 in",
    material: "Foil Vinyl",
    finish: "Chrome Holographic",
  },
  {
    id: "nox-007",
    name: "DEAD FLOWERS",
    price: 4.99,
    category: "dark",
    badge: null,
    images: [
      "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=600&q=80",
      "https://images.unsplash.com/photo-1490750967868-88df5691cc6f?w=600&q=80",
    ],
    description: "Wilted, monochrome florals with a brutalist edge. For those who find beauty in decay. Matte black print.",
    tags: ["flowers", "dark", "mono"],
    dimensions: "2 × 3 in",
    material: "Premium Vinyl",
    finish: "Matte",
  },
  {
    id: "nox-008",
    name: "NEON KANJI",
    price: 5.49,
    category: "art",
    badge: "NEW",
    images: [
      "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80",
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=80",
    ],
    description: "Acid-neon Japanese kanji on black. Meaning: 'Exist Loudly'. UV-reactive ink. Hits under blacklight.",
    tags: ["kanji", "neon", "japanese"],
    dimensions: "2 × 3.5 in",
    material: "UV-Reactive Vinyl",
    finish: "Gloss + UV",
  },
];

// Get all unique categories
export const categories = ["all", ...new Set(products.map(p => p.category))];

// Get product by id
export const getProductById = (id) => products.find(p => p.id === id);

// Get featured products (first 4)
export const getFeaturedProducts = () => products.slice(0, 4);
