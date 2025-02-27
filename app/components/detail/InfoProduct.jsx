import React, { useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import MaskImage from "../base/MaskImage";
import {
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  tableCellClasses,
} from "@mui/material";
import styled from "@emotion/styled";
import Image from "next/image";
import { formatMoney, getDistrict, getProvince } from "@/utils/common.util";
import moment from "moment";

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#000",
    color: "#fff",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#f5f5f5",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function InfoProduct({ detail }) {
  const [slideIndex, setSlideIndex] = useState < number > 0;

  const changeSlide = (e) => {
    if (!Number.isNaN(e.realIndex)) {
      setSlideIndex(e.realIndex);
    }
  };
  const locationTableCell = useMemo(() => {
    return [
      {
        id: 1,
        label: "Tỉnh",
        value: getProvince(detail?.province ?? 1),
      },
      {
        id: 2,
        label: "Huyện",
        value: getDistrict(detail?.province ?? 1, detail?.district ?? 1),
      },
      {
        id: 3,
        label: "Địa Chỉ",
        value: detail?.address,
      },
    ];
  }, [detail]);

  const infoOther = useMemo(() => {
    return [
      {
        id: 1,
        label: "Thể Loại",
        value: detail?.category?.name,
      },
      {
        id: 2,
        label: "Diện Tích",
        value: detail?.square + " m2",
      },
      {
        id: 3,
        label: "Thông Tin",
        value: detail?.contact,
      },
      {
        id: 4,
        label: "Ngày Chỉnh Sửa Cuối",
        value: moment(detail?.updatedAt).fromNow(),
      },
    ];
  }, [detail]);
  return (
    <div>
      <Swiper
        spaceBetween={40}
        autoplay
        loop
        speed={600}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper relative"
        onSlideChange={changeSlide}
      >
        {detail?.imgs?.map((img) => {
          return (
            <SwiperSlide key={img} className="cursor-pointer">
              <div>
                <MaskImage src={img} height={400} />
              </div>
            </SwiperSlide>
          );
        })}
        <div className="text-white font-bold w-[45px] h-[45px] rounded-full absolute right-5 bottom-5 z-10 bg-[rgba(0,0,0,0.3)] flex justify-center items-center">
          {slideIndex + 1} / {detail?.imgs?.length}
        </div>
      </Swiper>
      <h1 className="text-[#333]">{detail?.title}</h1>
      <span className="text-[18px]">
        Chuyên Mục:{" "}
        <span className="font-semibold">
          {detail?.type === "RENT" ? "Thuê Trọ" : "Tìm Người Ở Ghép"}
        </span>
      </span>

      <div className="flex items-center my-2 mt-4space-x-1">
        <Image src="/image/money.png" alt="" width={40} height={40} />
        <span className="font-semibold text-[25px] text-[red]">
          {formatMoney(detail?.money ?? 0)} đ
        </span>
      </div>

      <Divider />

      <h3>Thông Tin Mô Tả</h3>
      <div dangerouslySetInnerHTML={{ __html: detail?.description }} />

      <h3>Địa Điểm Thuê</h3>
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableBody>
            {locationTableCell.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell width={"30%"} component="th" scope="row">
                  {row.label}
                </StyledTableCell>
                <StyledTableCell>{row.value}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <h3>Thông Tin Khác</h3>
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableBody>
            {infoOther.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell width={"30%"} component="th" scope="row">
                  {row.label}
                </StyledTableCell>
                <StyledTableCell>{row.value}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default InfoProduct;
