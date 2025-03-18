import { Grid } from "@mui/material";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import React, { useEffect, useMemo, useState } from "react";
import HeaderProduct from "../../base/HeaderProduct";
import CardHome from "../../base/CardHome";
import { randomHouseApi } from "@/service/frontend";

function RandomHouse() {
  const [randomHouse, setRandomHouse] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const getTopFavorite = async () => {
    setIsFetching(true);
    try {
      const res = await randomHouseApi();
      setRandomHouse(res);
    } catch (error) {
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    getTopFavorite();
  }, []);
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
