// Product data generated from all images inside public/images

const imageFromPublic = (fileName) => `/images/${encodeURIComponent(fileName)}`;

const imageFiles = [
  "(1) copy 3.png",
  "(204) copy 2.png",
  "Brightness_Contrast 1.png",
  "Layer 1.png",
  "Layer 10.png",
  "Layer 13.png",
  "Layer 14 copy 2.png",
  "Layer 15.png",
  "Layer 16.png",
  "Layer 17.png",
  "Layer 18.png",
  "Layer 19.png",
  "Layer 2.png",
  "Layer 20.png",
  "Layer 21.png",
  "Layer 22.png",
  "Layer 23.png",
  "Layer 24.png",
  "Layer 25 copy 4.png",
  "Layer 25.png",
  "Layer 26.png",
  "Layer 27.png",
  "Layer 28.png",
  "Layer 29.png",
  "Layer 3.png",
  "Layer 30.png",
  "Layer 31.png",
  "Layer 32.png",
  "Layer 33.png",
  "Layer 34.png",
  "Layer 340 copy 2.png",
  "Layer 35.png",
  "Layer 36.png",
  "Layer 366 copy 2.png",
  "Layer 37.png",
  "Layer 378.png",
  "Layer 379.png",
  "Layer 38.png",
  "Layer 380.png",
  "Layer 381.png",
  "Layer 382.png",
  "Layer 383.png",
  "Layer 384.png",
  "Layer 39.png",
  "Layer 394.png",
  "Layer 395.png",
  "Layer 396.png",
  "Layer 397.png",
  "Layer 398.png",
  "Layer 4.png",
  "Layer 40.png",
  "Layer 403 copy.png",
  "Layer 415.png",
  "Layer 42.png",
  "Layer 429 copy.png",
  "Layer 43.png",
  "Layer 44.png",
  "Layer 45.png",
  "Layer 46.png",
  "Layer 47.png",
  "Layer 48.png",
  "Layer 49.png",
  "Layer 5.png",
  "Layer 6.png",
  "Layer 7.png",
  "Layer 9 copy.png",
];

const nameFromFile = (fileName) =>
  fileName
    .replace(/\.[^/.]+$/, "")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toUpperCase();

const slugFromFile = (fileName) =>
  fileName
    .replace(/\.[^/.]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const products = imageFiles.map((fileName, index) => {
  const slug = slugFromFile(fileName) || `image-${index + 1}`;
  const id = `nox-${String(index + 1).padStart(3, "0")}-${slug}`;
  const name = nameFromFile(fileName);
  const tags = slug.split("-").filter(Boolean).slice(0, 3);

  return {
    id,
    name,
    price: 50,
    category: "stickers",
    badge: index < 8 ? "NEW" : null,
    images: [imageFromPublic(fileName)],
    description: `${name} sticker. Premium vinyl print with durable adhesive and weather-resistant finish.`,
    tags: tags.length ? tags : ["sticker"],
    dimensions: "3 x 3 in",
    material: "Premium Vinyl",
    finish: "Matte",
  };
});

// Get all unique categories
export const categories = ["all", ...new Set(products.map(p => p.category))];

// Get product by id
export const getProductById = (id) => products.find(p => p.id === id);

// Get featured products (first 4)
export const getFeaturedProducts = () => products.slice(0, 4);
