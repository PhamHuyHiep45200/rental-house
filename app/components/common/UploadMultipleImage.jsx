import React, { useState } from "react";
import { Box, Button, IconButton, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";

// Styled component cho input file ẩn
const VisuallyHiddenInput = styled("input")({
  display: "none",
});

// Component UploadMultipleImage
const UploadMultipleImage = ({ value, onChange }) => {
  const [previews, setPreviews] = useState(value || []); // Lưu trữ preview của ảnh

  // Xử lý khi chọn file mới
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const newFiles = files.map((file) => ({
      file,
      url: URL.createObjectURL(file), // Tạo URL tạm để preview
    }));

    const updatedFiles = [...previews, ...newFiles];
    setPreviews(updatedFiles);
    onChange(updatedFiles.map((item) => item.file)); // Cập nhật giá trị cho Formik (chỉ gửi file)
  };

  // Xử lý xóa ảnh
  const handleDelete = (index) => {
    const updatedFiles = previews.filter((_, i) => i !== index);
    setPreviews(updatedFiles);
    onChange(updatedFiles.map((item) => item.file)); // Cập nhật lại Formik
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
