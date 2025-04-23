"use client";
import { registerUserApi } from "@/service/frontend";
import { validationSchema } from "@/validation/register.validation";
import { Textarea } from "@mui/joy";
import {
  Button,
  Divider,
  FormControl,
  FormHelperText,
  TextField,
} from "@mui/material";
import { Field, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import React from "react";

const initialValues = {
  phone: "",
  password: "",
  email: "",
  username: "",
  address: "",
};
function Register() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = React.useState(false);

  const registerUser = async (data) => {
    try {
      await registerUserApi(data);
      enqueueSnackbar("Tạo tài khoản Thành Công", {
        variant: "success",
      });
      router.push("/login");
    } catch (error) {
      enqueueSnackbar(error?.response?.data?.error, {
        variant: "error",
      });
    }
  };

  return (
    <div className="flex justify-center">
      <div className="w-[400px]">
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
                        label="Tên Đăng Nhập"
                        name="email"
                        variant="outlined"
                        margin="dense"
                        helperText={props.touched.email && props.errors.email}
                        error={props.errors.email && props.touched.email}
                      ></Field>
                    </FormControl>
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
                    <FormControl fullWidth>
                      <Field
                        as={Textarea}
                        minRows={4}
                        placeholder="Địa Chỉ Cụ Thể ..."
                        variant="soft"
                        name="address"
                        margin="dense"
                        error={props.errors.address && props.touched.address}
                      ></Field>
                      <FormHelperText error sx={{ height: 30 }}>
                        {props.touched.address && props.errors.address}
                      </FormHelperText>
                    </FormControl>
                    <FormControl fullWidth className="mt-5">
                      <Field
                        as={TextField}
                        id="outlined-adornment-password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        helperText={
                          props.touched.password && props.errors.password
                        }
                        error={props.touched.password && props.errors.password}
                        label="Password"
                      />
                    </FormControl>
                  </div>
                </div>

                <div className="mt-5 flex justify-center">
                  <Button
                    variant="contained"
                    color="info"
                    size="large"
                    type="submit"
                    className="w-full"
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
    </div>
  );
}

export default Register;
