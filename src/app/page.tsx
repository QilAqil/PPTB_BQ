import Hero from "@/components/hero/hero";
import VisionMission from "@/components/vision-mission/vision-mission";
import Footer from "@/components/footer/footer";
import NewsSection from "@/components/news/news-section";
import GallerySection from "@/components/gallery/gallery-section";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <VisionMission />
      <NewsSection />
      <GallerySection />
      <Footer />
    </div>
  );
}
