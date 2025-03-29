"use client";
import { Container, Divider, Grid, Pagination } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useMemo } from "react";
import CardHome from "../components/base/CardHome";
import Search from "../components/home/Search";
import useQueryString from "@/hooks/useQueryString";
import { useGetNewHouseQuery } from "@/service/rtk-query";

function SearchData() {
  const searchParams = useSearchParams();
  const { updateQueryString } = useQueryString();

  // Chuyển searchParams thành object
  const params = useMemo(
    () => Object.fromEntries(searchParams.entries()),
    [searchParams]
  );

  const page = params.page || "1";

  // Gọi API với toàn bộ params từ URL
  const { data, isFetching } = useGetNewHouseQuery(params);

  const changePage = (_, newPage) => {
    updateQueryString("page", newPage.toString());
  };

  return (
    <Container>
      <Search />
      <div className="mt-[50px]">
        <Divider sx={{ marginBottom: 2 }} />
        <Grid container spacing={2}>
          {data?.data?.map((product) => (
            <Grid item xs={3} key={product.id}>
              <CardHome house={product} />
            </Grid>
          ))}
        </Grid>
        <div className="flex justify-center mt-5">
          <Pagination
            count={data?.totalPage || 1}
            page={Number(page)}
            onChange={changePage}
            color="primary"
            disabled={isFetching}
          />
        </div>
      </div>
    </Container>
  );
}

export default SearchData;
