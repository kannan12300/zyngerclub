import About from "@/components/About";
import Contact from "@/components/Contact";
import FeaturedItems from "@/components/FeaturedItems";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import Hero from "@/components/Hero";
import MenuSection from "@/components/MenuSection";
import MobileBottomBar from "@/components/MobileBottomBar";
import Navbar from "@/components/Navbar";
import Offers from "@/components/Offers";
import PartyOrder from "@/components/PartyOrder";
import Reviews from "@/components/Reviews";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Offers />
        <MenuSection />
        <FeaturedItems />
        <PartyOrder />
        <About />
        <Gallery />
        <Reviews />
        <Contact />
      </main>
      <Footer />
      <MobileBottomBar />
    </>
  );
}
