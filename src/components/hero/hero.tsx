import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, CirclePlay } from "lucide-react";
import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-screen-xl w-full mx-auto grid lg:grid-cols-2 gap-12 px-6 py-12">
        <div>
          <h1 className="mt-6 max-w-md text-lg md:text-2xl lg:text-3xl xl:text-4xl font-bold leading-tight">
            Pondok Pesantren Tahfidz & Bahasa
          </h1>
          <h1 className="mt-4 max-w-md text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold leading-tight whitespace-nowrap">
            BAROKATUL QUR'AN
          </h1>
          
          <div className="mt-12 flex items-center gap-4">
            <Button size="lg" className="rounded-full text-base">
              Get Started <ArrowUpRight className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full text-base shadow-none"
            >
              <CirclePlay className="h-5 w-5" /> Watch Demo
            </Button>
          </div>
        </div>
        <div className="w-full aspect-video rounded-xl overflow-hidden">
          <Image
            src="/l.svg"
            alt="Hero Image"
            width={400}
            height={200}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
