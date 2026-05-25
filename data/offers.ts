export type Offer = {
  title: string;
  price?: string;
  label: string;
  description: string;
};

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
