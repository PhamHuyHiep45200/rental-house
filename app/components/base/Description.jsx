"use client";
import { cn } from "@/utils/common.util";
// import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

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
