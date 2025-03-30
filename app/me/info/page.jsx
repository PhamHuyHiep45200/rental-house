"use client";
import UploadSignImage from "@/app/components/common/UploadSignImage";
import useAuthState from "@/hooks/useAuthState";
import { uploadImages } from "@/service/frontend";
import { useGetMeQuery, useUpdateMeMutation } from "@/service/rtk-query";
import { useAppDispatch } from "@/store/hooks";
import { initialStateUser, setUser } from "@/store/slide/auth.slide";
import { validationSchema } from "@/validation/info_user.validation";
import {
  Button,
  Chip,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  TextField,
} from "@mui/material";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";

function InfoMe() {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAuthState();

  const {
    data,
    isSuccess: isGetMeSuccess,
    isError: isGetMeError,
  } = useGetMeQuery(
    {
      userId: user?.id,
    },
    {
      skip: !user,
      refetchOnMountOrArgChange: true,
    }
  );

  const [initialValues, setInitialValues] = useState({
    username: "",
    phone: "",
  });

  const [updateMe] = useUpdateMeMutation();

  const handleUpload = async (file) => {
    try {
      if (!file || typeof file === "string") return file;
      // Tạo FormData để gửi lên API
      const formData = new FormData();

      formData.append("files", file);

      // Gọi API upload
      const response = await uploadImages(formData);

      return response.files?.[0];
    } catch (error) {
      console.error("Upload error:", error);
      return [];
    }
  };

  const handleSubmit = async (values) => {
    const avatar = await handleUpload(values.avatar);

    const res = await updateMe({
      userId: data.id,
      address: values.address,
      avatar,
      phone: values.phone,
      username: values.username,
    });
    enqueueSnackbar("Thay Đổi Thành Công", {
      variant: "success",
    });

    if (res.data) {
      dispatch(
        setUser({
          ...user,
          address: values.address,
          avatar,
          phone: values.phone,
          username: values.username,
        })
      );
      return;
    }

    enqueueSnackbar("Đã có lỗi xảy ra", {
      variant: "error",
    });
  };

  useEffect(() => {
    if (isGetMeSuccess) {
      setInitialValues(data);
    }

    if (isGetMeError) {
      dispatch(setUser(initialStateUser));
      router.replace("/login");
    }
  }, [data, isGetMeSuccess, isGetMeError]);

  useEffect(() => {
    if (!user) {
      router.replace("/login"); // Chuyển hướng nếu không có user
      return;
    }
  }, [user]);

  return (
    <>
      <Container className="py-5 bg-white rounded-lg">
        <h1>Thông Tin Của Tôi</h1>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={handleSubmit}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit}>
              <FormControl fullWidth>
                <UploadSignImage
                  value={props.values.avatar}
                  onChange={(value) => {
                    props.setFieldValue("avatar", value);
                    props.setFieldTouched("avatar", true);
                  }}
                />
                <FormHelperText error sx={{ height: 30 }}>
                  {props.touched.avatar && props.errors.avatar}
                </FormHelperText>
              </FormControl>
              <FormControl fullWidth>
                <FormLabel>Số Điện Thoại</FormLabel>
                <TextField
                  id="outlined-basic"
                  value={props.values.phone}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  name="phone"
                  variant="outlined"
                  error={props.touched.phone && Boolean(props.errors.phone)}
                />
                <FormHelperText error sx={{ height: 30 }}>
                  {props.touched.phone && props.errors.phone}
                </FormHelperText>
              </FormControl>
              <FormControl fullWidth>
                <FormLabel>Tên Hiển Thị</FormLabel>
                <TextField
                  id="outlined-basic"
                  value={props.values.username}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  name="username"
                  variant="outlined"
                  error={
                    props.touched.username && Boolean(props.errors.username)
                  }
                />
                <FormHelperText error sx={{ height: 30 }}>
                  {props.touched.username && props.errors.username}
                </FormHelperText>
              </FormControl>
              <FormControl fullWidth>
                <FormLabel>Địa Chỉ</FormLabel>
                <TextField
                  id="outlined-basic"
                  value={props.values.address}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  name="address"
                  variant="outlined"
                  error={props.touched.address && Boolean(props.errors.address)}
                />
                <FormHelperText error sx={{ height: 30 }}>
                  {props.touched.address && props.errors.address}
                </FormHelperText>
              </FormControl>
              <div className="flex items-center space-x-2 my-5 mt-2">
                <span>Quyền Hạn:</span>
                <span
                  className="font-semibold"
                  style={{ color: data?.role !== "USER" ? "red" : "blue" }}
                >
                  {data?.role !== "USER" ? "ADMIN" : "Người Dùng"}
                </span>
              </div>
              <div className="flex items-center space-x-2 my-5">
                <Chip
                  label={!data?.active ? "ĐANG HOẠT ĐỘNG" : "NGỪNG HOẠT ĐỘNG"}
                  color={!data?.active ? "success" : "error"}
                  variant="outlined"
                />
              </div>
              <div className="flex justify-center">
                <Button variant="contained" type="submit">
                  Lưu Thông Tin
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </Container>
    </>
  );
}

export default InfoMe;
