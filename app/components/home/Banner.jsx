import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { Box, Button, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

// Dữ liệu giả lập cho banner
const bannerData = [
  {
    id: 1,
    image: "/image/banner-1.png",
    title: "Khám Phá Nhà Đẹp",
    description: "Tìm ngôi nhà mơ ước của bạn ngay hôm nay!",
  },
  {
    id: 2,
    image: "/image/banner-2.jpg",
    title: "Ưu Đãi Đặc Biệt",
    description: "Giảm giá 20% cho mọi giao dịch trong tuần này.",
  },
  {
    id: 3,
    image: "/image/banner-3.png",
    title: "Phong Cách Sống",
    description: "Tận hưởng không gian sống hiện đại và tiện nghi.",
  },
  {
    id: 4,
    image: "/image/banner-4.png",
    title: "Khám Phá Nhà Đẹp",
    description: "Tìm ngôi nhà mơ ước của baise ngay hôm nay!",
  },
];

const Banner = () => {
  return (
    <Box className="w-full mb-5" sx={{ overflow: "hidden" }}>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet bg-gray-400",
          bulletActiveClass: "swiper-pagination-bullet-active bg-white",
        }}
        navigation={false}
        modules={[Autoplay, Pagination, Navigation]}
        className="shadow-lg"
      >
        {bannerData.map((banner) => (
          <SwiperSlide key={banner.id}>
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Ảnh nền */}
              <img
                src={banner.image}
                alt={banner.title}
                className="w-full h-full object-cover"
              />
              {/* Nội dung overlay */}
              {/* <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white bg-black bg-opacity-40 p-4">
                <Typography
                  variant="h3"
                  className="font-bold mb-2"
                  sx={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)" }}
                >
                  {banner.title}
                </Typography>
                <Typography
                  variant="body1"
                  className="mb-4"
                  sx={{ textShadow: "1px 1px 3px rgba(0, 0, 0, 0.6)" }}
                >
                  {banner.description}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  endIcon={<ArrowForwardIcon />}
                  className="px-6 py-2"
                  sx={{
                    backgroundColor: "#1976d2",
                    "&:hover": { backgroundColor: "#115293" },
                  }}
                >
                  Xem Thêm
                </Button>
              </div> */}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default Banner;
