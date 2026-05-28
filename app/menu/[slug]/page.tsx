import { notFound } from "next/navigation";
import CategoryMenuPage from "@/components/CategoryMenuPage";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { getMenuRouteCategory, menuRouteCategories } from "@/data/menu";

export function generateStaticParams() {
  return menuRouteCategories.map((category) => ({ slug: category.slug }));
}

export default async function MenuCategoryRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = getMenuRouteCategory(slug);

  if (!category) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <CategoryMenuPage category={category} />
      <Footer />
    </>
  );
}
