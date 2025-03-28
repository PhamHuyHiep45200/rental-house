"use client";
import { validationSchema } from "@/validation/post.validation";
import { Container, Divider } from "@mui/material";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import FormPost from "@/components/post/FormPost";
import {
  useDetailHouseQuery,
  useGetCategoryQuery,
  useUpdateHouseMutation,
  userQuery,
} from "@/store/service/user.service";
import { useSnackbar } from "notistack";
import { useAppDispatch } from "@/store/hooks";
import { startLoading, stopLoading } from "@/store/slide/common.slide";
import { useRouter } from "next/navigation";

const initialValues = {
  category: "",
  title: "",
  description: "",
  address: "",
  money: "",
  square: "",
  province: 1000,
  district: 1000,
  contact: "",
  type: "",
  imgs: [],
};
function Update() {
  const { enqueueSnackbar } = useSnackbar();
  const [categorys, setCategorys] = useState([]);
  const [initialValue, setInitialValue] = useState(initialValues);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const id = router.query.id;

  const {
    data: dataDetail,
    isFetching: fetchingDetail,
    isSuccess: successDetail,
  } = useDetailHouseQuery(id, {
    skip: !id,
  });

  const [updateHouse, { isLoading, isSuccess, isError }] =
    useUpdateHouseMutation();
  const {
    data,
    isFetching,
    isSuccess: categorySuccess,
  } = useGetCategoryQuery({});

  useEffect(() => {
    if (isSuccess) {
      enqueueSnackbar(
        "Cập Nhật Bài Viết Thành Công! Vui lòng đợi Admin phê duyệt",
        {
          variant: "success",
        }
      );
      router.push("/me/house?tab=1");
      dispatch(userQuery.util.resetApiState());
    }
    if (isError) {
      enqueueSnackbar("Đã có lỗi xảy ra", {
        variant: "error",
      });
    }
  }, [isSuccess, isError]);

  useEffect(() => {
    if (successDetail) {
      setInitialValue({
        ...dataDetail.data,
        category: dataDetail.data.category.id,
      });
    }
  }, [successDetail, fetchingDetail]);

  useEffect(() => {
    if (isLoading) {
      dispatch(startLoading());
    } else {
      dispatch(stopLoading());
    }
  }, [isLoading]);

  useEffect(() => {
    if (categorySuccess) {
      if (data) {
        setCategorys(data);
      } else {
        enqueueSnackbar("Đã có lỗi xảy ra", {
          variant: "error",
        });
      }
    }
  }, [isFetching]);
  return (
    <Container className="bg-white py-5 rounded-lg">
      <h1>Chỉnh Sửa Bài Đăng</h1>
      <Divider />
      <Formik
        initialValues={initialValue}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={(values) => {
          updateHouse({
            id,
            data: values,
          });
        }}
      >
        {(props) => (
          <FormPost props={props} categorys={categorys} type="update" />
        )}
      </Formik>
    </Container>
  );
}

export default Update;
