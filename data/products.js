// Mock product data for NOX sticker brand
// Each product has a unique id, name, price, category, images, and description

const imageFromPublic = (fileName) => `/images/${encodeURIComponent(fileName)}`;

export const products = [
  {
    id: "nox-001",
    name: "VOID SKULL",
    price: 4.99,
    category: "dark",
    badge: "BESTSELLER",
    images: [
      imageFromPublic("Layer 1.png"),
      imageFromPublic("Layer 2.png"),
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
      imageFromPublic("Layer 3.png"),
      imageFromPublic("Layer 4.png"),
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
      imageFromPublic("Layer 5.png"),
      imageFromPublic("Layer 6.png"),
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
      imageFromPublic("Layer 7.png"),
      imageFromPublic("Layer 9 copy.png"),
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
      imageFromPublic("Layer 10.png"),
      imageFromPublic("Layer 13.png"),
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
      imageFromPublic("Layer 14 copy 2.png"),
      imageFromPublic("Layer 15.png"),
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
      imageFromPublic("Layer 16.png"),
      imageFromPublic("Layer 17.png"),
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
      imageFromPublic("Layer 18.png"),
      imageFromPublic("Layer 19.png"),
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
