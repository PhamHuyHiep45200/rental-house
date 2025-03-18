import React, { useEffect, useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";
import CardHome from "../../base/CardHome";
import SlideHome from "../../loading/home/Slide";
import { randomHouseApi } from "@/service/frontend";

function RandomPair() {
  const [randomHouse, setRandomHouse] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const getTopFavorite = async () => {
    setIsFetching(true);
    try {
      const res = await randomHouseApi();
      setRandomHouse(res);
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
      <Swiper
        slidesPerView={3}
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        loop
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      >
        {isFetching ? (
          <SlideHome listNum={3} span={4} />
        ) : (
          randomHouse.map((e) => {
            return (
              <SwiperSlide key={e._id} className="cursor-pointer">
                <CardHome house={e} />
              </SwiperSlide>
            );
          })
        )}
      </Swiper>
    </div>
  );
}

export default RandomPair;
