import { getImage } from "@/service/frontend";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import React, { useEffect } from "react";

function Upload({ value, onChange }) {
  const [image, setImage] = React.useState(value);

  useEffect(() => {
    if (value) {
      setImage(value);
    }
  }, [value]);
  return (
    <CldUploadWidget signatureEndpoint="/api/upload">
      {({ open, results, isLoading }) => {
        if (results?.event === "queues-end") {
          setImage(results?.info?.files?.[0]?.uploadInfo?.thumbnail_url);
          onChange?.(results?.info?.files?.[0]?.uploadInfo?.thumbnail_url);
        }

        return (
          <div>
            <button onClick={open}>Upload an Image</button>
            {image && (
              <Image src={getImage(image)} alt="" width={100} height={130} />
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
}

export default Upload;
