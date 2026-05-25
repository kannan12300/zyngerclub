import type { MenuCategory, MenuItem } from "@/data/menu";

export const categoryIcons: Record<MenuCategory | "All", string> = {
  All: "★",
  Meals: "🍗",
  "Bucket Meals": "🪣",
  Burgers: "🍔",
  Pizza: "🍕",
  Wraps: "🌯",
  "Loaded Fries": "🍟",
  "Strips & Wings": "🔥",
  "Chicken Pop": "🍿",
  Nuggets: "◼",
  Fries: "🍟",
  "Mojitos & Lime": "🥤",
  Shakes: "🥛",
  "Add-ons": "➕",
  Dips: "◉"
};

const itemImages: Record<string, string> = {
  "zinger-burger": "/menu/zinger-burger.png",
  "signature-chicken-loaded-fries": "/menu/signature-loaded-fries.png",
  "family-meal": "/menu/family-meal.png",
  "mega-zynger-meal": "/menu/bucket-meal.png",
  "blue-coraco": "/menu/blue-coraco-mojito.png",
  "hazel-nut": "/menu/hazelnut-shake.png",
  "zynger-platter": "/menu/family-meal.png"
};

const categoryImages: Record<MenuCategory, string> = {
  Meals: "/menu/family-meal.png",
  "Bucket Meals": "/menu/bucket-meal.png",
  Burgers: "/menu/zinger-burger.png",
  Pizza: "/menu/pizza.png",
  Wraps: "/menu/wrap.png",
  "Loaded Fries": "/menu/signature-loaded-fries.png",
  "Strips & Wings": "/menu/wings.png",
  "Chicken Pop": "/menu/chicken-strips.png",
  Nuggets: "/menu/nuggets.png",
  Fries: "/menu/signature-loaded-fries.png",
  "Mojitos & Lime": "/menu/blue-coraco-mojito.png",
  Shakes: "/menu/hazelnut-shake.png",
  "Add-ons": "/menu/chicken-strips.png",
  Dips: "/menu/signature-loaded-fries.png"
};

export function getMenuImage(item: MenuItem) {
  return itemImages[item.id] ?? categoryImages[item.category];
}
