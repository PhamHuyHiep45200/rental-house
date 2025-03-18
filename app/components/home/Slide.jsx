import React, { useEffect, useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import CardHome from "../base/CardHome";
import SlideHome from "../loading/home/Slide";
import { topFavorite } from "@/service/frontend";

export default function Slide() {
  const [favorite, setFavorite] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const getTopFavorite = async () => {
    setIsFetching(true);
    try {
      const res = await topFavorite();
      setFavorite(res);
    } catch (error) {
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    getTopFavorite();
  }, []);

  return (
    <div className="px-5 py-10">
      {isFetching ? (
        <SlideHome />
      ) : (
        <Swiper
          slidesPerView={4}
          spaceBetween={40}
          autoplay
          loop={true}
          speed={600}
          modules={[Autoplay, Pagination]}
          className="mySwiper"
        >
          {favorite.map((e) => (
            <SwiperSlide key={e._id} className="cursor-pointer">
              <CardHome house={e} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}
