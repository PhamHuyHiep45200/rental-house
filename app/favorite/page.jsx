"use client";

import useAuthState from "@/hooks/useAuthState";
import { useGetFavoriteQuery } from "@/service/rtk-query";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { Grid, Pagination, Typography } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import HeaderProduct from "../components/base/HeaderProduct";
import CardHome from "../components/base/CardHome";
import useQueryString from "@/hooks/useQueryString";
import SlideHome from "../components/loading/home/Slide";
import { useEffect } from "react";

const Favorite = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { updateQueryString } = useQueryString();

  const page = searchParams.get("page") || "1";

  const { user } = useAuthState();

  const { data, isFetching } = useGetFavoriteQuery(
    { page, userId: user?.id },
    { skip: !user?.id, refetchOnMountOrArgChange: true }
  );

  const changePage = (_, newPage) => {
    updateQueryString("page", newPage.toString());
  };

  useEffect(() => {
    if (!user) {
      router.replace("/login"); // Chuyển hướng nếu không có user
      return;
    }
  }, [user]);

  return (
    <div className="p-5">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <HeaderProduct
            icon={
              <AccountBalanceIcon
                color="warning"
                sx={{ width: 40, height: 40 }}
              />
            }
            title="Danh sách yêu thích"
          />
        </Grid>
        {isFetching && <SlideHome listNum={3} span={4} />}
        {data?.data?.map((product) => {
          return (
            <Grid item xs={4} key={product.id}>
              <CardHome house={product} />
            </Grid>
          );
        })}
      </Grid>
      {data?.data?.length === 0 ? (
        <div className="h-[150px] flex justify-center items-center w-full">
          <Typography className="text-black">
            Bạn chưa thích phòng nào cả!
          </Typography>
        </div>
      ) : (
        <div className="flex justify-center mt-5">
          <Pagination
            count={data?.total || 1}
            page={Number(page)}
            onChange={changePage}
            color="primary"
            disabled={isFetching}
          />
        </div>
      )}
    </div>
  );
};

export default Favorite;
