"use client";
import { Container, Divider, Grid, Pagination } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import CardHome from "../components/base/CardHome";
import Search from "../components/home/Search";
import { newHouseApi } from "@/service/frontend";

function SearchData() {
  const router = useRouter();
  const [dataApi, setDataApi] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
  });

  const getSearchApi = async () => {
    setIsFetching(true);
    try {
      const res = await newHouseApi({
        ...router.query,
        page_size: 8,
        page: pagination.page,
      });
      setDataApi(res.data);
    } catch (error) {
    } finally {
      setIsFetching(false);
    }
  };

  const changePage = (_, page) => {
    setPagination({
      ...pagination,
      page: page,
    });
  };

  useEffect(() => {
    getSearchApi();
  }, [pagination]);

  return (
    <Container>
      <Search />
      <div className="mt-[50px]">
        <Divider sx={{ marginBottom: 2 }} />
        <Grid container spacing={2}>
          {dataApi?.map((product) => {
            return (
              <Grid item xs={3} key={product._id}>
                <CardHome house={product} />
              </Grid>
            );
          })}
        </Grid>
        <div className="flex justify-center mt-5">
          <Pagination
            count={Math.floor(pagination.total / 10 + 1)}
            page={pagination.page}
            onChange={changePage}
            color="primary"
          />
        </div>
      </div>
    </Container>
  );
}

export default SearchData;
