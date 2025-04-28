import React, { useState, useEffect } from "react";
import { Box, Button, IconButton, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import { getImage } from "@/service/frontend";

// Styled component cho input file ẩn
const VisuallyHiddenInput = styled("input")({
  display: "none",
});

// Component UploadMultipleImage
const UploadMultipleImage = ({ value, onChange }) => {
  const [previews, setPreviews] = useState([]);

  // Đồng bộ previews với value từ Formik
  useEffect(() => {
    if (value && value.length > 0) {
      const newPreviews = value
        .map((item) => {
          if (item instanceof File) {
            // Nếu là File object (từ input file)
            return { file: item, url: URL.createObjectURL(item) };
          } else if (typeof item === "string") {
            // Nếu là URL (từ API)
            return { file: null, url: getImage(item) };
          }
          return null;
        })
        .filter(Boolean); // Loại bỏ các giá trị null

      setPreviews(newPreviews);
    } else {
      setPreviews([]);
    }
  }, [value]);

  // Xử lý khi chọn file mới
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const newFiles = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    const updatedFiles = [...previews, ...newFiles];
    setPreviews(updatedFiles);
    onChange(updatedFiles.map((item) => item.file || item.url)); // Gửi cả file và URL
  };

  // Xử lý xóa ảnh
  const handleDelete = (index) => {
    const updatedFiles = previews.filter((_, i) => i !== index);
    setPreviews(updatedFiles);
    onChange(updatedFiles.map((item) => item.file || item.url)); // Gửi cả file và URL
  };

  return (
    <Box>
      {/* Input file ẩn và nút upload */}
      <label htmlFor="upload-multiple-images">
        <VisuallyHiddenInput
          id="upload-multiple-images"
          type="file"
          accept="image/*"
          multiple
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

      {/* Hiển thị preview các ảnh */}
      {previews.length > 0 ? (
        <Grid container spacing={2}>
          {previews.map((item, index) => (
            <Grid item xs={6} sm={4} md={3} key={index}>
              <Box position="relative">
                <img
                  src={item.url}
                  alt={`preview-${index}`}
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "8px",
                    maxHeight: "150px",
                    objectFit: "cover",
                  }}
                />
                <IconButton
                  aria-label="delete"
                  onClick={() => handleDelete(index)}
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
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body2" color="text.secondary">
          Chưa có ảnh nào được chọn.
        </Typography>
      )}
    </Box>
  );
};

export default UploadMultipleImage;
