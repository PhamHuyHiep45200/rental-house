/* eslint-disable @next/next/no-img-element */
import { HOUSE_DEFAULT } from "@/contants/image";
import { cn } from "@/utils/common.util";
import React from "react";

function MaskImage(props) {
  const { src, alt, className, ...rest } = props;
  return (
    <img
      // onLoad={getSizeImage}
      src={src || HOUSE_DEFAULT}
      loading="lazy"
      alt={alt ?? "image"}
      className={cn("object-cover w-full aspect-video", className)}
      {...rest}
    />
  );
}

export default MaskImage;
