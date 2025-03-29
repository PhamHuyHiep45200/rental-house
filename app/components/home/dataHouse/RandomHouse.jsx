import { newHouseApi } from "@/service/frontend";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import CardHome from "../../base/CardHome";
import HeaderProduct from "../../base/HeaderProduct";

function RandomHouse() {
  const [randomHouse, setRandomHouse] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const getTopFavorite = async () => {
    setIsFetching(true);
    try {
      const res = await newHouseApi();
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
          <Grid item xs={6} key={product.id}>
            <CardHome house={product} />
          </Grid>
        );
      })}
    </Grid>
  );
}

export default RandomHouse;
