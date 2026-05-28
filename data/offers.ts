export type Offer = {
  title: string;
  price?: string;
  label: string;
  description: string;
};

export type HeroSlide = {
  eyebrow: string;
  title: string;
  description: string;
  price?: string;
  image: string;
  href: string;
};

export const heroSlides: HeroSlide[] = [
  {
    eyebrow: "Wednesday Drop",
    title: "10 Piece Chicken",
    description: "Hot bucket deal for friends, family and late-night cravings.",
    price: "Rs 599",
    image: "/menu/bucket-meal.png",
    href: "/menu/bucket-meals"
  },
  {
    eyebrow: "Friday Burger Run",
    title: "Buy 2 Get 1 Classic",
    description: "Crispy burger stack with a free classic on Fridays.",
    image: "/menu/zinger-burger.png",
    href: "/menu/burger"
  },
  {
    eyebrow: "Combo Favorite",
    title: "Zynger Platter",
    description: "Burger, strips, chicken, wrap, garlic dips and fries in one loaded plate.",
    price: "Rs 749",
    image: "/menu/family-meal.png",
    href: "/menu/bucket-meals"
  }
];

export const offers: Offer[] = [
  {
    title: "Buy Any 2 Burger Get 1 Classic Burger Free",
    label: "Fridays",
    description: "Stack the weekend with crispy burgers and a free classic."
  },
  {
    title: "10 Piece Chicken",
    price: "₹599",
    label: "Wednesday",
    description: "A midweek crispy chicken bucket deal built for sharing."
  },
  {
    title: "Zynger Platter",
    price: "₹749",
    label: "Combo",
    description:
      "Zynger Burger, Classic Burger, 4 Strips, 2pc Chicken, 2 Garlic Dip, Zynger Wrap and French Fries."
  },
  {
    title: "Family Meal starts from",
    price: "₹799",
    label: "Family",
    description: "Crispy chicken, buns, garlic dip, coleslaw and fries for family cravings."
  }
];
