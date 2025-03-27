"use client";
import { FORMAT_DEFAULT_DATE } from "@/config/date.config";
import { loginUserData } from "@/service/frontend";
import { useAppDispatch } from "@/store/hooks";
import { setAuth, setUser } from "@/store/slide/auth.slide";
import { startLoading, stopLoading } from "@/store/slide/common.slide";
import { validationSchema } from "@/validation/login.validation";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Field, Formik } from "formik";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const initialValues = {
  email: "",
  password: "",
};
function Login() {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const dispath = useDispatch()

  const loginUserApi = async (values) => {
    setIsFetching(true);
    try {
      const data = await loginUserData(values);
      localStorage.setItem("user", JSON.stringify(data));
      enqueueSnackbar("Đăng nhập thành công", {
        variant: "success",
      });
      dispath(setAuth(true))
      dispath(setUser(data))
      router.push("/");
    } catch (error) {
      enqueueSnackbar("Vui lòng kiểm tra lại thông tin Tài Khoản", {
        variant: "error",
      });
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="w-[400px]">
        <div className="p-10 bg-white rounded-lg">
          <div className="my-5 font-[500] text-center text-[30px]">
            Đăng Nhập
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              loginUserApi(values);
            }}
          >
            {(props) => (
              <form onSubmit={props.handleSubmit}>
                <FormControl fullWidth>
                  <Field
                    as={TextField}
                    label="Email"
                    name="email"
                    variant="outlined"
                    margin="dense"
                    helperText={props.touched.email && props.errors.email}
                    error={props.errors.email && props.touched.email}
                  ></Field>
                </FormControl>
                <FormControl fullWidth className="mt-5">
                  <Field
                    as={TextField}
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    helperText={props.touched.password && props.errors.password}
                    error={props.touched.password && props.errors.password}
                    label="Password"
                  />
                </FormControl>
                <FormControl fullWidth className="mt-5">
                  <Button
                    variant="contained"
                    color="info"
                    size="large"
                    type="submit"
                  >
                    Đăng Nhập
                  </Button>
                </FormControl>
                <div className="text-center my-5">
                  Bạn chưa có tài khoản?{" "}
                  <Link className="text-[blue]" href="/register">
                    Tạo Tài Khoản
                  </Link>
                </div>
                <Divider />
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default Login;
