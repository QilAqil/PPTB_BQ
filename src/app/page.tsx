import { Hero } from "@/components/hero/hero"
import { VisionMission } from "@/components/vision-mission/vision-mission"
import NewsSection from "@/components/news/news-section"
import GallerySection from "@/components/gallery/gallery-section"
import { Footer } from "@/components/footer/footer"

export default function HomePage() {
  return (
    <main>
      <Hero />
      <VisionMission />
      <NewsSection />
      <GallerySection />
      <Footer />
    </main>
  )
}
