import Grid from "@mui/material/Unstable_Grid2";
import React from "react";
import RandomHouse from "./dataHouse/RandomHouse";
import NewHouse from "./dataHouse/NewHouse";
import HeaderProduct from "../base/HeaderProduct";
import FiberNewIcon from "@mui/icons-material/FiberNew";

function DataHouse() {
  return (
    <Grid container spacing={4}>
      <Grid xs={8}>
        <RandomHouse />
      </Grid>
      <Grid xs={4}>
        <div className="mb-5">
          <HeaderProduct
            color="#ffd2d2"
            icon={<FiberNewIcon color="error" sx={{ width: 40, height: 40 }} />}
            title="Tin Mới Nhất"
          />
        </div>
        <NewHouse />
      </Grid>
    </Grid>
  );
}

export default DataHouse;
