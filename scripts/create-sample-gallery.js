const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const sampleGallery = [
  {
    title: "Modern Web Design Portfolio",
    description: "A showcase of modern web design projects featuring clean layouts, responsive design, and cutting-edge UI/UX principles. These projects demonstrate our expertise in creating beautiful and functional websites.",
    imageUrl: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=400&fit=crop",
    isPublished: true,
    publishedAt: new Date(),
  },
  {
    title: "Mobile App Development",
    description: "Cross-platform mobile applications built with React Native and Flutter. These apps feature modern design patterns, smooth animations, and excellent user experience across iOS and Android platforms.",
    imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=400&fit=crop",
    isPublished: true,
    publishedAt: new Date(),
  },
  {
    title: "E-commerce Solutions",
    description: "Complete e-commerce platforms built with Next.js and modern payment gateways. These solutions include inventory management, order processing, and customer relationship management features.",
    imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop",
    isPublished: true,
    publishedAt: new Date(),
  },
  {
    title: "Data Analytics Dashboard",
    description: "Real-time analytics dashboards providing insights into business performance. Built with modern data visualization libraries and real-time data processing capabilities.",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
    isPublished: true,
    publishedAt: new Date(),
  },
  {
    title: "Cloud Infrastructure",
    description: "Scalable cloud solutions deployed on AWS, Google Cloud, and Azure. These infrastructures support high-traffic applications with automatic scaling and load balancing.",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop",
    isPublished: true,
    publishedAt: new Date(),
  },
  {
    title: "AI & Machine Learning",
    description: "Intelligent systems powered by artificial intelligence and machine learning algorithms. These solutions include recommendation engines, predictive analytics, and natural language processing.",
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
    isPublished: true,
    publishedAt: new Date(),
  },
  {
    title: "Cybersecurity Solutions",
    description: "Robust security measures and protocols to protect digital assets. These solutions include authentication systems, data encryption, and security monitoring tools.",
    imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=400&fit=crop",
    isPublished: true,
    publishedAt: new Date(),
  },
  {
    title: "Blockchain Technology",
    description: "Decentralized applications and blockchain solutions built with Ethereum and other blockchain platforms. These projects demonstrate the potential of Web3 technologies.",
    imageUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=400&fit=crop",
    isPublished: true,
    publishedAt: new Date(),
  }
];

async function createSampleGallery() {
  try {
    console.log('🚀 Creating sample gallery items...');

    // Get admin user (assuming admin exists)
    const adminUser = await prisma.user.findFirst({
      where: {
        role: 'ADMIN'
      }
    });

    if (!adminUser) {
      console.error('❌ No admin user found. Please create an admin user first.');
      console.log('Run: node scripts/create-admin.js');
      return;
    }

    // Create sample gallery items
    for (const galleryData of sampleGallery) {
      const gallery = await prisma.gallery.create({
        data: {
          ...galleryData,
          authorId: adminUser.id,
        }
      });
      console.log(`✅ Created gallery item: ${gallery.title}`);
    }

    console.log('🎉 Sample gallery items created successfully!');
    console.log(`📊 Total gallery items created: ${sampleGallery.length}`);

  } catch (error) {
    console.error('❌ Error creating sample gallery items:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createSampleGallery(); 