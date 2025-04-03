import React, { Suspense } from "react";
import HousePage from "./HousePage";

const House = () => {
  return (
    <Suspense>
      <HousePage />
    </Suspense>
  );
};

export default House;
