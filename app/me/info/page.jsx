"use client";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useUpdateMeMutation } from "@/store/service/user.service";
import { setCheckChangeUser } from "@/store/slide/auth.slide";
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
import { Field, Formik } from "formik";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";

function InfoMe() {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.authSlice);
  const [initialValues, setInitialValues] =
    useState <
    IUSer >
    {
      username: "",
      phone: "",
    };

  const [updateMe, { isSuccess, isError }] = useUpdateMeMutation();

  useEffect(() => {
    if (user) {
      setInitialValues(user);
    }
  }, [user]);

  useEffect(() => {
    if (isSuccess) {
      enqueueSnackbar("Thay Đổi Thành Công", {
        variant: "success",
      });
      dispatch(setCheckChangeUser(Math.random()));
    }
    if (isError) {
      enqueueSnackbar("Đã có lỗi xảy ra", {
        variant: "error",
      });
    }
  }, [isSuccess, isError]);
  return (
    <>
      <Container className="py-5 bg-white rounded-lg">
        <h1>Thông Tin Của Tôi</h1>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={(values) => {
            updateMe({
              address: values.address,
              avatar: values.avatar,
              phone: values.phone,
              username: values.username,
            });
          }}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit}>
              <FormControl fullWidth>
                {/* <Field
                  as={UploadSignImage}
                  name="avatar"
                  onChange={(value) => {
                    props.setFieldValue("avatar", value);
                  }}
                /> */}
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
                  style={{ color: user?.role !== "USER" ? "red" : "blue" }}
                >
                  {user?.role !== "USER" ? "ADMIN" : "Người Dùng"}
                </span>
              </div>
              <div className="flex items-center space-x-2 my-5">
                <Chip
                  label={user?.active ? "ĐANG HOẠT ĐỘNG" : "NGỪNG HOẠT ĐỘNG"}
                  color={user?.active ? "success" : "error"}
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
