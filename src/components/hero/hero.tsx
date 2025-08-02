import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Phone, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-teal-500 via-teal-600 to-blue-800"></div>
      
      <div className="max-w-screen-xl w-full mx-auto grid lg:grid-cols-2 gap-12 px-6 py-12 relative z-10">
        {/* Left Side - Text Content */}
        <div className="flex flex-col justify-center text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Pondok Pesantren Tahfidz & Bahasa
          </h1>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-8">
            BAROKATUL QUR'AN
          </h2>
          
          <p className="text-lg md:text-xl text-white/90 italic mb-8 max-w-2xl">
            "Menjadi Pondok Pesantren Tahfidz dan Bahasa yang Unggul, Profesional, Transformatif, Humanis dan Qur'ani di Indonesia"
          </p>
          
          <div className="flex items-center gap-4 mb-8">
            <Link href="/registration">
              <Button 
                size="lg" 
                className="rounded-full text-base bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-3 shadow-lg"
              >
                Admisi / Pendaftaran <ArrowUpRight className="h-5 w-5 ml-2" />
            </Button>
            </Link>
          </div>
        </div>

        {/* Right Side - People Images */}
        <div className="flex items-center justify-center relative">
          <div className="relative w-full max-w-md">
            {/* Three people standing side by side */}
            <div className="flex items-end justify-center space-x-4">
              {/* Person 1 - Male with peci */}
              <div className="relative">
                <div className="w-32 h-48 bg-black rounded-t-full flex items-end justify-center pb-2">
                  <div className="w-24 h-36 bg-gray-800 rounded-t-full relative">
                    {/* Head with peci */}
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                      <div className="w-8 h-8 bg-black rounded-full"></div>
                      <div className="w-10 h-3 bg-black rounded-full absolute -top-1 left-1/2 transform -translate-x-1/2"></div>
                    </div>
                    {/* White collar */}
                    <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-16 h-2 bg-white rounded"></div>
                    {/* Green lapels */}
                    <div className="absolute top-10 left-2 w-2 h-8 bg-green-600 rounded"></div>
                    <div className="absolute top-10 right-2 w-2 h-8 bg-green-600 rounded"></div>
                  </div>
                </div>
              </div>

              {/* Person 2 - Female with hijab */}
              <div className="relative">
                <div className="w-32 h-48 bg-black rounded-t-full flex items-end justify-center pb-2">
                  <div className="w-24 h-36 bg-gray-800 rounded-t-full relative">
                    {/* Head with hijab */}
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                      <div className="w-8 h-8 bg-beige-200 rounded-full"></div>
                      <div className="w-12 h-6 bg-beige-200 rounded-full absolute -top-1 left-1/2 transform -translate-x-1/2"></div>
                    </div>
                    {/* White collar */}
                    <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-16 h-2 bg-white rounded"></div>
                    {/* Yellow book */}
                    <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-8 h-10 bg-yellow-300 rounded border border-yellow-400"></div>
                  </div>
                </div>
              </div>

              {/* Person 3 - Male */}
              <div className="relative">
                <div className="w-32 h-48 bg-black rounded-t-full flex items-end justify-center pb-2">
                  <div className="w-24 h-36 bg-gray-800 rounded-t-full relative">
                    {/* Head */}
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                      <div className="w-8 h-8 bg-black rounded-full"></div>
                    </div>
                    {/* White collar */}
                    <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-16 h-2 bg-white rounded"></div>
                    {/* Green lapels */}
                    <div className="absolute top-10 left-2 w-2 h-8 bg-green-600 rounded"></div>
                    <div className="absolute top-10 right-2 w-2 h-8 bg-green-600 rounded"></div>
                    {/* Watch */}
                    <div className="absolute top-12 right-4 w-3 h-3 bg-gray-400 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Information Box - Bottom Right */}
      <div className="absolute bottom-6 right-6 bg-green-600 rounded-lg p-4 shadow-lg z-20">
        <div className="flex items-center gap-3">
          <div className="text-white">
            <div className="font-bold text-sm">PPTB Hotline</div>
            <div className="text-xs opacity-90">Saluran Siaga Pelayanan</div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-white text-sm">
              <MessageCircle className="h-4 w-4" />
              <span>0852-2055-8881</span>
            </div>
            <div className="flex items-center gap-2 text-white text-sm">
              <Phone className="h-4 w-4" />
              <span>0852-2972-2907</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
