"use client";
import { cn } from "@/utils/common.util";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

function Description(props) {
  const { className, ...rest } = props;

  return (
    <ReactQuill
      theme="snow"
      className={cn(
        "text-black",
        "[&>.ql-toolbar]:rounded-ss-md [&>.ql-toolbar]:rounded-se-md",
        "[&>.ql-container]:rounded-es-md [&>.ql-container]:rounded-ee-md",
        className
      )}
      {...rest}
    />
  );
}

export default Description;
