import { Grid } from "@mui/material";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import React, { useMemo } from "react";
import HeaderProduct from "../../base/HeaderProduct";
import CardHome from "../../base/CardHome";

function RandomHouse() {
  const { data, isSuccess } = { data: { data: [] }, isSuccess: true };

  const randomHouse = useMemo(() => {
    if (isSuccess) {
      return data.data;
    }
    return [];
  }, [isSuccess]);
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <HeaderProduct
          icon={
            <AccountBalanceIcon
              color="warning"
              sx={{ width: 40, height: 40 }}
            />
          }
          title="Cho Thuê Trọ"
        />
      </Grid>
      {randomHouse.map((product) => {
        return (
          <Grid item xs={6} key={product._id}>
            <CardHome house={product} />
          </Grid>
        );
      })}
    </Grid>
  );
}

export default RandomHouse;
