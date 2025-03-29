import { newHouseApi } from "@/service/frontend";
import { useEffect, useState } from "react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import CardHome from "../../base/CardHome";
import SlideHome from "../../loading/home/Slide";

function RandomPair() {
  const [randomHouse, setRandomHouse] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const getTopFavorite = async () => {
    setIsFetching(true);
    try {
      const res = await newHouseApi();
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
        loop={randomHouse.length > 0}
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
          randomHouse?.map((e) => {
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
