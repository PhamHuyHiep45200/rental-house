/* eslint-disable @next/next/no-img-element */
import React from "react";

function MaskImage() {
  return (
    <img
      onLoad={getSizeImage}
      src={src}
      loading="lazy"
      alt={alt ?? "image"}
      className={`${sizeImage === "width" ? "w-full" : "h-full"}`}
    />
  );
}

export default MaskImage;
