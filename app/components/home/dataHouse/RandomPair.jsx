import { newHouseApi } from "@/service/frontend";
import { useEffect, useState } from "react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import CardHome from "../../base/CardHome";
import SlideHome from "../../loading/home/Slide";
import { useGetNewHouseQuery } from "@/service/rtk-query";
import { HOUSE_TYPE } from "@/contants/house";

function RandomPair() {
  const { data, isFetching } = useGetNewHouseQuery({
    type: HOUSE_TYPE.PAIR,
  });

  return (
    <div className="px-5 py-10">
      <Swiper
        slidesPerView={3}
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        // loop={data.length > 0}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        autoplay={{
          delay: 3000, // Thời gian delay giữa các slide (3000ms = 3 giây)
          disableOnInteraction: false, // Tiếp tục autoplay ngay cả khi người dùng tương tác
        }}
        pagination={{ clickable: true }}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="mySwiper"
      >
        {isFetching ? (
          <SlideHome listNum={3} span={4} />
        ) : (
          data?.data?.map((e) => {
            return (
              <SwiperSlide key={e.id} className="cursor-pointer">
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
