import { Grid } from "@mui/material";
import React from "react";
import BaseLoadingSkeleton from "../../base/BaseLoadingSkeleton";

function SlideHome({ span, listNum }) {
  return (
    <Grid container spacing={4}>
      {Array.from({ length: listNum ?? 4 }, (_, i) => i).map((e) => (
        <Grid
          xs={span ?? 3}
          key={e}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <BaseLoadingSkeleton />
        </Grid>
      ))}
    </Grid>
  );
}
export default SlideHome;
