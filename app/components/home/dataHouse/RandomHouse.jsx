import CardHome from "@/components/base/CardHome";
import HeaderProduct from "@/components/base/HeaderProduct";
import { useRandomHouseQuery } from "@/store/service/user.service";
import { Grid } from "@mui/material";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import React, { useMemo } from "react";

function RandomHouse() {
  const { data, isSuccess } = useRandomHouseQuery({
    type: "RENT",
  });

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
