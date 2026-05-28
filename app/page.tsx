import BestsellerSlider from "@/components/BestsellerSlider";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import MenuSection from "@/components/MenuSection";
import MobileBottomBar from "@/components/MobileBottomBar";
import Navbar from "@/components/Navbar";
import Reviews from "@/components/Reviews";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="app-main">
        <Hero />
        <BestsellerSlider />
        <MenuSection />
        <Reviews />
      </main>
      <Footer />
      <MobileBottomBar />
    </>
  );
}
