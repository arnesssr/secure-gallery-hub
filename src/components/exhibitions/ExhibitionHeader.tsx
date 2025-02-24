import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface Exhibition {
  id: string;
  title: string;
  description: string;
  image_url: string;
}

interface ExhibitionHeaderProps {
  exhibitions: Exhibition[];
}

const ExhibitionHeader = ({ exhibitions }: ExhibitionHeaderProps) => {
  return (
    <div className="w-full h-[600px] relative">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        className="w-full h-full"
      >
        {exhibitions.map((exhibition) => (
          <SwiperSlide key={exhibition.id}>
            <div className="relative w-full h-full">
              <img
                src={exhibition.image_url}
                alt={exhibition.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                <div className="container mx-auto">
                  <Card className="bg-charcoal/80 backdrop-blur-sm border-gold/20 w-full md:w-2/3 lg:w-1/2">
                    <CardContent className="p-6">
                      <h2 className="text-3xl md:text-4xl font-playfair text-offwhite mb-4">
                        {exhibition.title}
                      </h2>
                      <p className="text-lg text-offwhite/80 mb-6">
                        {exhibition.description}
                      </p>
                      <Button className="bg-gold hover:bg-gold/80 text-charcoal">
                        Learn More <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ExhibitionHeader;