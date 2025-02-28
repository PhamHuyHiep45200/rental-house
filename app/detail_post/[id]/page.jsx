"use client";
import InfoProduct from "@/components/detail/InfoProduct";
import InfoUser from "@/components/detail/InfoUser";
import { useDetailHouseQuery } from "@/store/service/user.service";
import { Container } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useRouter } from "next/navigation";
import React, { useMemo } from "react";

function DetailPost() {
  const router = useRouter();
  const id = router.query.id;
  const { data, isSuccess } = useDetailHouseQuery(id, {
    skip: !id,
  });

  const detail = useMemo(() => {
    if (isSuccess) {
      return data.data;
    }
    return [];
  }, [isSuccess]);
  return (
    <Container className="bg-white rounded-lg py-10">
      <Grid container spacing={4}>
        <Grid xs={9}>
          <InfoProduct detail={detail} />
        </Grid>
        <Grid xs={3}>
          <InfoUser detail={detail} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default DetailPost;
