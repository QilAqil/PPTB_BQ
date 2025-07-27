import Navbar from "@/components/navbar/navbar";
import Hero from "@/components/hero/hero";
import Footer from "@/components/footer/footer";
import NewsSection from "@/components/news/news-section";
import GallerySection from "@/components/gallery/gallery-section";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <NewsSection />
      <GallerySection />
      <Footer />
    </div>
  );
}
