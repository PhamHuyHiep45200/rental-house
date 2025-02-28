"use client";
import { FORMAT_DEFAULT_DATE } from "@/config/date.config";
import { useAppDispatch } from "@/store/hooks";
import { useLoginUserMutation } from "@/store/service/user.service";
import { setAuth } from "@/store/slide/auth.slide";
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
import React, { useEffect } from "react";

const initialValues = {
  phone: "",
  password: "",
};
function Login() {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);

  const [loginUser, { data, isLoading, isSuccess, isError }] =
    useLoginUserMutation();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (isSuccess && data) {
      localStorage.setItem("token", data.data.accessToken);
      localStorage.setItem("refresh_token", data.data.refreshToken);
      localStorage.setItem(
        "expires",
        moment().add(data.data.expires, "second").format(FORMAT_DEFAULT_DATE)
      );
      dispatch(setAuth(true));
      router.push("/");
    }
    if (isError) {
      enqueueSnackbar("Vui lòng kiểm tra lại thông tin Tài Khoản", {
        variant: "error",
      });
    }
  }, [isSuccess, isError, data]);

  useEffect(() => {
    if (isLoading) {
      dispatch(startLoading());
    } else {
      dispatch(stopLoading());
    }
  }, [isLoading]);

  return (
    <div className="w-[400px]">
      <div className="p-10 bg-white rounded-lg">
        <div className="my-5 font-[500] text-center text-[30px]">Đăng Nhập</div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            loginUser(values);
          }}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit}>
              <FormControl fullWidth>
                <Field
                  as={TextField}
                  label="Số Điện Thoại"
                  name="phone"
                  variant="outlined"
                  margin="dense"
                  helperText={props.touched.phone && props.errors.phone}
                  error={props.errors.phone && props.touched.phone}
                ></Field>
              </FormControl>
              <FormControl fullWidth className="mt-5">
                <Field
                  as={TextField}
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
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
  );
}

export default Login;
