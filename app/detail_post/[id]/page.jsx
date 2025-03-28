"use client";
import InfoProduct from "@/app/components/detail/InfoProduct";
import InfoUser from "@/app/components/detail/InfoUser";
import { useDetailHouseQuery } from "@/service/rtk-query";
import { Container } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useParams, useRouter } from "next/navigation";
import React, { useMemo } from "react";

function DetailPost() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  const { data, isSuccess } = useDetailHouseQuery(id, {
    skip: !id,
  });

  return (
    <Container className="bg-white rounded-lg py-10">
      <Grid container spacing={4}>
        <Grid xs={9}>
          <InfoProduct detail={data} />
        </Grid>
        <Grid xs={3}>
          <InfoUser detail={data} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default DetailPost;
