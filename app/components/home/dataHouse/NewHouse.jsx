import { useNewHouseQuery } from "@/store/service/user.service";
import { formatMoney, getDistrict } from "@/utils/common.util";
import { Grid } from "@mui/material";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useMemo } from "react";

function NewHouse() {
  const router = useRouter()
  const { data, isFetching, isSuccess } = useNewHouseQuery({});

  const newHouse = useMemo(() => {
    if (isSuccess) {
      return data.data.data;
    }
    return [];
  }, [isSuccess, isFetching]);

  const detailHouse = (id) => {
    router.push(`/detail_post/${id}`);
  };
  return (
    <div>
      {newHouse.map((e) => {
        return (
          <Grid
            container
            spacing={[1]}
            key={e._id}
            className="mb-5 cursor-pointer bg-white py-2 px-2 rounded-lg"
            onClick={()=>detailHouse(e._id)}
          >
            <Grid xs={4}>
              <Image
                src={e?.imgs?.[0]}
                width={110}
                height={110}
                alt=""
                className="rounded-md"
              />
            </Grid>
            <Grid xs={8}>
              <div className="h-full flex flex-col justify-between">
                <div>
                  <span className="font-semibold truncate-2">{e?.title}</span>
                  <div className="flex space-x-3 items-center mt-1">
                    <span className="text-[14px] text-gray-500">
                      {moment(e?.createdAt).fromNow()}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Image
                        src="/image/address2.png"
                        alt=""
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
                  <Image src="/image/money.png" alt="" width={30} height={30} />
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