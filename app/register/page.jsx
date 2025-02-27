import UploadSignImage from "@/components/base/UploadSignImage";
import LayoutLogin from "@/components/layouts/auth";
import { useAppDispatch } from "@/store/hooks";
import { useRegisterUserMutation } from "@/store/service/user.service";
import { startLoading, stopLoading } from "@/store/slide/common.slide";
import { validationSchema } from "@/validation/register.validation";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  Divider,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Field, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React, { useEffect } from "react";

const initialValues = {
  phone: "",
  password: "",
  username: "",
  avatar: "",
};
function Register() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = React.useState(false);

  const [registerUser, { isLoading, isSuccess, isError }] =
    useRegisterUserMutation();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (isSuccess) {
      enqueueSnackbar("Tạo tài khoản Thành Công", {
        variant: "success",
      });
      router.push("/login");
    }
    if (isError) {
      enqueueSnackbar("Tạo tài khoản Thất Bại", {
        variant: "error",
      });
    }
  }, [isSuccess, isError]);

  useEffect(() => {
    if (isLoading) {
      dispatch(startLoading());
    } else {
      dispatch(stopLoading());
    }
  }, [isLoading]);

  return (
    <div className="min-w-[400px]">
      <div className="p-10 bg-white rounded-lg">
        <div className="my-5 font-[500] text-center text-[30px]">Đăng Ký</div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            registerUser(values);
          }}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit}>
              <div className="flex">
                <div>
                  <FormControl fullWidth>
                    <Field
                      as={TextField}
                      label="Tên Người Dùng"
                      name="username"
                      variant="outlined"
                      margin="dense"
                      helperText={
                        props.touched.username && props.errors.username
                      }
                      error={props.errors.username && props.touched.username}
                    ></Field>
                  </FormControl>
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
                      helperText={
                        props.touched.password && props.errors.password
                      }
                      error={props.touched.password && props.errors.password}
                      label="Password"
                    />
                  </FormControl>
                </div>
                <FormControl fullWidth>
                  <Field
                    as={UploadSignImage}
                    name="avatar"
                    onChange={(value) => {
                      props.setFieldValue("avatar", value);
                    }}
                  />
                  <FormHelperText error sx={{ height: 30 }}>
                    {props.touched.avatar && props.errors.avatar}
                  </FormHelperText>
                </FormControl>
              </div>

              <div className="mt-5 flex justify-center">
                <Button
                  variant="contained"
                  color="info"
                  size="large"
                  type="submit"
                  className="min-w-[400px]"
                >
                  Đăng Ký
                </Button>
              </div>
              <div className="text-center my-5">
                Bạn đã có tài khoản?{" "}
                <Link className="text-[blue]" href="/login">
                  Đăng Nhập
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

export default Register;
