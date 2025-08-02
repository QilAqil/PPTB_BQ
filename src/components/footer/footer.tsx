import { Separator } from "@/components/ui/separator";
import { Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-muted">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Section - Logo and Contact Information */}
            <div className="md:col-span-1">
          {/* Logo */}
              <div className="mb-4">
                <Image
                  src="/l.svg"
                  alt="PPTB BAROKATUL QUR'AN Logo"
                  width={124}
                  height={32}
                  className="h-8 w-auto"
                />
              </div>
              
              <p className="text-muted-foreground mb-4 font-semibold">
                Pondok Pesantren Tahfidz & Bahasa<br />
                "BAROKATUL QUR'AN"
              </p>
              
              {/* Contact Information */}
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>Jl. Bawah, RT.05/RW.11, Munggang, Kalibeber, Kec. Mojotengah, Kabupaten Wonosobo, Jawa Tengah 56351</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>Telp: 0852-2055-8881</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>Fax: 0852-2972-2907</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>Email: ponpestahfidzbarokatulquran@gmail.com</span>
                </div>
              </div>
              

            </div>

            {/* Right Section - Google Maps */}
            <div className="md:col-span-1">
              <Link 
                href="https://maps.app.goo.gl/yVd1SJhdH1zSBhiG7" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full h-48 bg-muted border border-border rounded-lg overflow-hidden hover:border-foreground/20 transition-colors group"
              >
                <div className="relative w-full h-full">
                  {/* Map Image - Static map representation */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200">
                    {/* Map grid pattern */}
                    <div className="absolute inset-0 opacity-20">
                      <div className="w-full h-full" style={{
                        backgroundImage: `
                          linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
                        `,
                        backgroundSize: '20px 20px'
                      }}></div>
                    </div>
                    
                    {/* Location marker */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="relative">
                        <div className="w-8 h-8 bg-red-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded text-xs font-medium shadow-sm whitespace-nowrap">
                          PPTB BAROKATUL QUR'AN
                        </div>
                      </div>
                    </div>
                    
                    {/* Map features */}
                    <div className="absolute top-4 left-4">
                      <div className="w-16 h-2 bg-gray-300 rounded"></div>
                    </div>
                    <div className="absolute top-8 left-4">
                      <div className="w-12 h-2 bg-gray-300 rounded"></div>
                    </div>
                    <div className="absolute bottom-8 right-4">
                      <div className="w-20 h-2 bg-gray-300 rounded"></div>
                    </div>
                    <div className="absolute bottom-12 right-4">
                      <div className="w-14 h-2 bg-gray-300 rounded"></div>
                    </div>
                  </div>
                  
                  {/* Overlay with location info */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3">
                    <div className="text-white">
                      <p className="text-sm font-medium">Lihat di Google Maps</p>
                      <p className="text-xs opacity-90">MWF3+8XP, Jl. Bawah, RT.05/RW.11, Munggang, Kalibeber, Kec. Mojotengah, Kabupaten Wonosobo, Jawa Tengah</p>
                    </div>
                  </div>
                  
                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                    <div className="bg-white/95 rounded-lg px-4 py-2 text-center shadow-lg">
                      <p className="text-sm font-medium text-blue-700">Buka di Google Maps</p>
                    </div>
                  </div>
                </div>
            </Link>
            </div>
          </div>
        </div>
        
        <Separator />
        
        {/* Copyright */}
        <div className="py-6 text-center">
          <span className="text-sm text-muted-foreground">
            Copyright © {new Date().getFullYear()} PPTB BAROKATUL QUR'AN | Developed by Sa'id Aqil
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
