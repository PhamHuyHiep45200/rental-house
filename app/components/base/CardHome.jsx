import { Avatar, Card, CardHeader } from "@mui/material";
import Image from "next/image";
import React from "react";
import MaskImage from "./MaskImage";
import { formatMoney, getDistrict, getProvince } from "@/utils/common.util";
import moment from "moment";
import { useRouter } from "next/router";

function CardHome(props) {
  const { house, favorite } = props;
  const router = useRouter();

  const detailHouse = () => {
    router.push(`/detail_post/${house._id}`);
  };
  return (
    <Card sx={{ margin: "5px 0", cursor: 'pointer' }} onClick={detailHouse}>
      <CardHeader
        avatar={
          <Avatar
            // eslint-disable-next-line max-len
            src={house?.user?.avatar}
          >
            {house?.user?.username?.[0]}
          </Avatar>
        }
        title={<span className="font-semibold">{house?.user?.username}</span>}
        subheader={<span>{moment(house?.updatedAt).fromNow()}</span>}
      />
      <MaskImage height={200} src={house?.imgs?.[0]} />
      <div className="p-5 pt-2">
        <span className="block font-semibold truncate-2 h-[40px]">{house?.title}</span>
        <div className="flex items-center my-2 space-x-1">
          <Image src="/image/money.png" alt="" width={30} height={30} />
          <span className="font-semibold">
            {formatMoney(house?.money ?? 0)} đ
          </span>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-1">
            <Image src="/image/address.png" alt="" width={25} height={25} />
            <span className="text-gray-500 text-[14px] truncate" style={{width: favorite ? "140px" : "auto"}}>
              {getProvince(house?.province)}
              {" ~ "}
              {getDistrict(house?.province, house?.district)}
            </span>
          </div>
          {favorite && <Image src="/image/heart-active.png" width={30} height={30} alt="" />}
        </div>
      </div>
    </Card>
  );
}

export default CardHome;