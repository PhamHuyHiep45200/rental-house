"use client";

import { HOUSE_DEFAULT } from "@/contants/image";
import { PRODUCT_STATUS } from "@/contants/product";
import useAuthState from "@/hooks/useAuthState";
import { getImage } from "@/service/frontend";
import {
  useGetHouseForMeQuery,
  useGetNewHouseQuery,
} from "@/service/rtk-query";
import { formatMoney, getDistrict } from "@/utils/common.util";
import { Grid } from "@mui/material";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

function NewHouse() {
  const router = useRouter();

  const { user } = useAuthState();

  const { data, isFetching } = useGetHouseForMeQuery(
    {
      userId: user?.id,
      status: PRODUCT_STATUS.APPROVED,
    },
    {
      skip: !user?.id,
      refetchOnMountOrArgChange: true,
    }
  );

  const { data: dataNew } = useGetNewHouseQuery(
    {},
    {
      skip: user?.id,
      refetchOnMountOrArgChange: true,
    }
  );

  const dataHouse = useMemo(
    () => data?.data || dataNew?.data || [],
    [data, dataNew]
  );

  const detailHouse = (id) => {
    router.push(`/detail_post/${id}`);
  };
  return (
    <div>
      {dataHouse?.map((e, index) => {
        return (
          <Grid
            container
            spacing={[1]}
            key={index}
            className="mb-5 cursor-pointer bg-white py-2 px-2 rounded-lg"
            onClick={() => detailHouse(e.id)}
          >
            <Grid xs={4}>
              <Image
                src={getImage(e?.imgs?.[0]) || HOUSE_DEFAULT}
                width={110}
                height={110}
                alt="img"
                className="rounded-md object-cover h-full w-full"
              />
            </Grid>
            <Grid xs={8} className="pl-2">
              <div className="h-full flex flex-col justify-between">
                <div>
                  <p className="font-semibold line-clamp-4 min-h-[100px]">
                    {e?.title}
                  </p>
                  <div className="flex space-x-3 items-center mt-1">
                    <span className="text-[14px] text-gray-500">
                      {moment(e?.createdAt).fromNow()}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Image
                        src="/image/location.png"
                        alt="location"
                        width={20}
                        height={20}
                      />
                      <span className="text-gray-500 text-[14px]">
                        {getDistrict(e?.province, e?.district)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Image src="/image/money.png" alt="" width={20} height={20} />
                  <span className="font-semibold">
                    {formatMoney(e?.money ?? 0)} đ
                  </span>
                </div>
              </div>
            </Grid>
          </Grid>
        );
      })}
    </div>
  );
}

export default NewHouse;
