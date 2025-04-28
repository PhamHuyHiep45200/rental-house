import React, { useState, useEffect } from "react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import { getImage } from "@/service/frontend";

const VisuallyHiddenInput = styled("input")({
  display: "none",
});

const UploadSignImage = ({ value, onChange }) => {
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (value) {
      if (value instanceof File) {
        setPreview({ file: value, url: URL.createObjectURL(value) });
      } else if (typeof value === "string") {
        setPreview({ file: null, url: getImage(value) });
      }
    } else {
      setPreview(null);
    }
  }, [value]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const newPreview = { file, url: URL.createObjectURL(file) };
      setPreview(newPreview);
      onChange(file);
    }
  };

  const handleDelete = () => {
    setPreview(null);
    onChange(null);
  };

  return (
    <Box textAlign="center">
      <label htmlFor="upload-sign-image">
        <VisuallyHiddenInput
          id="upload-sign-image"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
        <Button
          variant="contained"
          component="span"
          startIcon={<CloudUploadIcon />}
          sx={{ mb: 2 }}
        >
          Chọn ảnh
        </Button>
      </label>

      {preview ? (
        <Box position="relative" display="inline-block">
          <img
            src={preview.url}
            alt="preview"
            style={{
              width: "100%",
              maxWidth: "300px",
              height: "auto",
              borderRadius: "8px",
              objectFit: "contain",
              border: "1px solid #ccc",
            }}
          />
          <IconButton
            aria-label="delete"
            onClick={handleDelete}
            sx={{
              position: "absolute",
              top: 5,
              right: 5,
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              color: "white",
              "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.8)" },
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ) : (
        <Typography variant="body2" color="text.secondary">
          Chưa có ảnh nào được chọn.
        </Typography>
      )}
    </Box>
  );
};

export default UploadSignImage;
