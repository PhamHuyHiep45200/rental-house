import { CircularProgress } from "@mui/material";
import React from "react";

function MaskLoading() {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-mask-loading z-[1000]">
      <CircularProgress size={60} className="text-white" />
    </div>
  );
}

export default MaskLoading;
