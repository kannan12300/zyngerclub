export type MenuCategory =
  | "Meals"
  | "Bucket Meals"
  | "Burgers"
  | "Pizza"
  | "Wraps"
  | "Loaded Fries"
  | "Strips & Wings"
  | "Chicken Pop"
  | "Nuggets"
  | "Fries"
  | "Mojitos & Lime"
  | "Shakes"
  | "Add-ons"
  | "Dips";

export type MenuBadge = "Popular" | "New" | "Combo" | "Family" | "Offer" | "Spicy";

export type MenuItem = {
  id: string;
  name: string;
  price: number;
  category: MenuCategory;
  description?: string;
  badge?: MenuBadge;
  featured?: boolean;
};

export const menuCategories: MenuCategory[] = [
  "Meals",
  "Bucket Meals",
  "Burgers",
  "Pizza",
  "Wraps",
  "Loaded Fries",
  "Strips & Wings",
  "Chicken Pop",
  "Nuggets",
  "Fries",
  "Mojitos & Lime",
  "Shakes",
  "Add-ons",
  "Dips"
];

export const menuItems: MenuItem[] = [
  {
    id: "snack-meal",
    name: "Snack Meal",
    price: 190,
    category: "Meals",
    description: "2 pcs chicken, 1 bun, 1 garlic small",
    badge: "Combo"
  },
  {
    id: "besties-meal",
    name: "Besties Meal",
    price: 399,
    category: "Meals",
    description: "4 pcs chicken, 2 bun, 1 garlic large, 1 french fries medium",
    badge: "Popular"
  },
  {
    id: "family-meal",
    name: "Family Meal",
    price: 799,
    category: "Meals",
    description: "8 pcs chicken, 3 bun, 1 garlic large, 1 coleslaw, 1 french fries large",
    badge: "Family",
    featured: true
  },
  {
    id: "signature-meal",
    name: "Signature Meal",
    price: 1199,
    category: "Meals",
    description: "12 pcs chicken, 5 bun, 2 garlic large, 1 coleslaw, 1 french fries large",
    badge: "Family"
  },
  {
    id: "mega-zynger-meal",
    name: "Mega Zynger Meal",
    price: 1499,
    category: "Meals",
    description: "16 pcs chicken, 6 bun, 2 garlic large, 2 coleslaw",
    badge: "Family",
    featured: true
  },
  {
    id: "celebration-meal",
    name: "Celebration Meal",
    price: 1999,
    category: "Meals",
    description: "21 pcs chicken, 7 bun, 3 garlic large, 2 coleslaw",
    badge: "Family"
  },
  {
    id: "value-meal",
    name: "Value Meal",
    price: 229,
    category: "Meals",
    description: "1 pcs chicken, 1 crispy burger, 1 combo french fries, 1 garlic dip",
    badge: "Combo"
  },
  {
    id: "kids-meal",
    name: "Kids Meal",
    price: 129,
    category: "Meals",
    description: "1 pcs chicken leg piece, 1 bun, 1 garlic dip, french fries"
  },
  { id: "bucket-8", name: "8 pcs Bucket Meal", price: 599, category: "Bucket Meals", badge: "Offer" },
  { id: "bucket-12", name: "12 pcs Bucket Meal", price: 849, category: "Bucket Meals", badge: "Family" },
  { id: "bucket-16", name: "16 pcs Bucket Meal", price: 1249, category: "Bucket Meals", badge: "Family" },
  { id: "bucket-20", name: "20 pcs Bucket Meal", price: 1499, category: "Bucket Meals", badge: "Family" },
  { id: "zinger-burger", name: "Zinger Burger", price: 199, category: "Burgers", badge: "Popular", featured: true },
  { id: "cheesy-crunchy-burger", name: "Cheesy Crunchy Burger", price: 199, category: "Burgers", badge: "Popular" },
  { id: "spicy-burger", name: "Spicy Burger", price: 199, category: "Burgers", badge: "Spicy" },
  { id: "tandoori-burger", name: "Tandoori Burger", price: 199, category: "Burgers" },
  { id: "classic-burger", name: "Classic Burger", price: 179, category: "Burgers" },
  { id: "double-decker-classic", name: "Double Decker Classic", price: 199, category: "Burgers", badge: "New" },
  { id: "veg-burger", name: "Veg Burger", price: 140, category: "Burgers" },
  { id: "bbq-chicken-pizza-small", name: "BBQ Chicken Pizza Small", price: 299, category: "Pizza" },
  { id: "bbq-chicken-pizza-medium", name: "BBQ Chicken Pizza Medium", price: 399, category: "Pizza" },
  { id: "tandoori-chicken-pizza-small", name: "Tandoori Chicken Pizza Small", price: 299, category: "Pizza" },
  { id: "tandoori-chicken-pizza-medium", name: "Tandoori Chicken Pizza Medium", price: 399, category: "Pizza" },
  { id: "margaritta-pizza-small", name: "Margaritta Pizza Small", price: 199, category: "Pizza" },
  { id: "margaritta-pizza-medium", name: "Margaritta Pizza Medium", price: 299, category: "Pizza" },
  { id: "paneer-tikka-pizza-small", name: "Paneer Tikka Pizza Small", price: 249, category: "Pizza" },
  { id: "paneer-tikka-pizza-medium", name: "Paneer Tikka Pizza Medium", price: 349, category: "Pizza" },
  { id: "zynger-wrap", name: "Zynger Wrap", price: 159, category: "Wraps" },
  { id: "spicy-wrap", name: "Spicy Wrap", price: 159, category: "Wraps", badge: "Spicy" },
  { id: "tandoori-wrap", name: "Tandoori Wrap", price: 159, category: "Wraps" },
  { id: "cheesy-wrap", name: "Cheesy Wrap", price: 159, category: "Wraps" },
  { id: "chicken-smashed-wrap", name: "Chicken Smashed Wrap", price: 189, category: "Wraps", badge: "New" },
  { id: "veg-wrap", name: "Veg Wrap", price: 149, category: "Wraps" },
  { id: "signature-chicken-loaded-fries", name: "Signature Chicken Loaded Fries", price: 279, category: "Loaded Fries", badge: "Popular", featured: true },
  { id: "pop-loaded-fries", name: "Pop Loaded Fries", price: 299, category: "Loaded Fries" },
  { id: "nachos-loaded-fries", name: "Nachos Loaded Fries", price: 299, category: "Loaded Fries" },
  { id: "cheesy-loaded-fries", name: "Cheesy Loaded Fries", price: 299, category: "Loaded Fries" },
  { id: "crazy-loaded-fries", name: "Crazy Loaded Fries", price: 299, category: "Loaded Fries", badge: "New" },
  { id: "paneer-loaded-fries", name: "Paneer Loaded Fries", price: 268, category: "Loaded Fries" },
  { id: "strips-6", name: "6 pcs Strips", price: 299, category: "Strips & Wings" },
  { id: "strips-10", name: "10 pcs Strips", price: 499, category: "Strips & Wings", badge: "Combo" },
  { id: "wings-8", name: "8 pcs Wings", price: 299, category: "Strips & Wings", badge: "Spicy" },
  { id: "wings-12", name: "12 pcs Wings", price: 429, category: "Strips & Wings" },
  { id: "chick-pop", name: "Chick Pop", price: 179, category: "Chicken Pop" },
  { id: "chili-pop", name: "Chili Pop", price: 199, category: "Chicken Pop" },
  { id: "texas-pop", name: "Texas Pop", price: 229, category: "Chicken Pop" },
  { id: "cuban-pop", name: "Cuban Pop", price: 229, category: "Chicken Pop" },
  { id: "mexican-pop", name: "Mexican Pop", price: 229, category: "Chicken Pop" },
  { id: "nuggets-6", name: "Nuggets 6 pcs", price: 129, category: "Nuggets" },
  { id: "nuggets-9", name: "Chicken Nuggets 9 pcs", price: 189, category: "Nuggets" },
  { id: "nuggets-12", name: "Chicken Nuggets 12 pcs", price: 249, category: "Nuggets" },
  { id: "nuggets-15", name: "Chicken Nuggets 15 pcs", price: 299, category: "Nuggets" },
  { id: "normal-fries-medium", name: "Normal French Fries Medium", price: 100, category: "Fries" },
  { id: "normal-fries-large", name: "Normal French Fries Large", price: 120, category: "Fries" },
  { id: "peri-peri-fries-medium", name: "Peri Peri French Fries Medium", price: 110, category: "Fries" },
  { id: "peri-peri-fries-large", name: "Peri Peri French Fries Large", price: 130, category: "Fries" },
  { id: "blue-coraco", name: "Blue Coraco", price: 99, category: "Mojitos & Lime", badge: "Popular", featured: true },
  { id: "water-melon", name: "Water Melon", price: 99, category: "Mojitos & Lime" },
  { id: "passion-fruit", name: "Passion Fruit", price: 99, category: "Mojitos & Lime" },
  { id: "strawberry", name: "Strawberry", price: 99, category: "Mojitos & Lime" },
  { id: "green-apple", name: "Green Apple", price: 99, category: "Mojitos & Lime" },
  { id: "fresh-lime", name: "Fresh Lime", price: 30, category: "Mojitos & Lime" },
  { id: "mint-lime", name: "Mint Lime", price: 40, category: "Mojitos & Lime" },
  { id: "pineapple-lime", name: "Pineapple Lime", price: 40, category: "Mojitos & Lime" },
  { id: "grape-lime", name: "Grape Lime", price: 40, category: "Mojitos & Lime" },
  { id: "hazel-nut", name: "Hazel Nut", price: 179, category: "Shakes", badge: "Popular", featured: true },
  { id: "crunch-n-caramel", name: "Crunch N Caramel", price: 179, category: "Shakes" },
  { id: "coffee-mocha", name: "Coffee Mocha", price: 179, category: "Shakes" },
  { id: "tender-coconut", name: "Tender Coconut", price: 100, category: "Shakes" },
  { id: "tender-boost", name: "Tender Boost", price: 100, category: "Shakes" },
  { id: "tender-horlicks", name: "Tender Horlicks", price: 100, category: "Shakes" },
  { id: "single-piece-chicken", name: "Single Piece Chicken", price: 99, category: "Add-ons" },
  { id: "coleslaw", name: "Coleslaw", price: 40, category: "Add-ons" },
  { id: "garlic-small", name: "Garlic Small", price: 20, category: "Add-ons" },
  { id: "garlic-large", name: "Garlic Large", price: 40, category: "Add-ons" },
  { id: "bun", name: "Bun", price: 10, category: "Add-ons" },
  { id: "classic-dip-small", name: "Classic Dip Small", price: 25, category: "Dips" },
  { id: "classic-dip-large", name: "Classic Dip Large", price: 50, category: "Dips" },
  { id: "cheesy-dip-small", name: "Cheesy Dip Small", price: 25, category: "Dips" },
  { id: "cheesy-dip-large", name: "Cheesy Dip Large", price: 50, category: "Dips" },
  { id: "royal-dip-small", name: "Royal Dip Small", price: 25, category: "Dips" },
  { id: "royal-dip-large", name: "Royal Dip Large", price: 50, category: "Dips" }
];

export const zyngerPlatter: MenuItem = {
  id: "zynger-platter",
  name: "Zynger Platter",
  price: 749,
  category: "Meals",
  description:
    "1 Zynger Burger + 1 Classic Burger + 4 Strips + 2pc Chicken + 2 Garlic Dip + 1 Zynger Wrap + French Fries",
  badge: "Offer",
  featured: true
};
