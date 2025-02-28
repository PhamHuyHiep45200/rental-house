import React, { useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import CardHome from "../base/CardHome";
import SlideHome from "../loading/home/Slide";

export default function Slide() {
  // const { data, isFetching } = useFavoriteQuery({});
  const data = []
  const isFetching = false

  const favorite = useMemo(() => {
    if (!isFetching && data) {
      return data?.data?.data || [];
    }
    return [];
  }, [isFetching]);

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