import { Button, Input } from "@mui/material";
import React, { useEffect, useState } from "react";
import SearchEnhanced from "./search/SearchEnhanced";
import { Field, Formik } from "formik";
import { useRouter, useSearchParams } from "next/navigation";

function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);

  // Chuyển `searchParams` thành object để dùng làm initialValues
  const queryObject = Object.fromEntries(searchParams.entries());

  const [initialValues, setInitialValues] = useState({
    key_search: "",
    district: "",
    category: "",
    province: "",
    type: "",
  });

  useEffect(() => {
    // Khi query thay đổi -> cập nhật `initialValues`
    setInitialValues((prevValues) => ({
      ...prevValues,
      ...queryObject, // Cập nhật từ URL
    }));
  }, [searchParams]);

  const searchData = (values) => {
    const moneyQuery = values.money
      ? {
          money_from: values.money[0],
          money_to: values.money[1],
        }
      : {};
    const squareQuery = values.square
      ? {
          square_from: values.square[0],
          square_to: values.square[1],
        }
      : {};

    const query = {
      ...values,
      ...moneyQuery,
      ...squareQuery,
    };

    delete query.money;
    delete query.square;

    const searchParams = new URLSearchParams(query);

    router.replace(`/search?${searchParams.toString()}`);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      onSubmit={(values) => {
        searchData(values);
      }}
    >
      {(props) => (
        <form onSubmit={props.handleSubmit}>
          <div
            className="flex items-center px-4 py-5 rounded-xl space-x-10"
            style={{
              boxShadow: "1px 10px 27px 5px rgba(0,0,0,0.2)",
              WebkitBoxShadow: "1px 10px 27px 5px rgba(0,0,0,0.2)",
              MozBoxShadow: "1px 10px 27px 5px rgba(0,0,0,0.2)",
            }}
          >
            <Field
              as={Input}
              name="key_search"
              placeholder="Nhập thông tin tìm kiếm ..."
              className="flex-1"
            />
            <div className="flex justify-center">
              <Button
                variant="contained"
                color="warning"
                size="large"
                onClick={handleOpen}
              >
                Lọc Nâng Cao
              </Button>
            </div>
            <div className="flex justify-center">
              <Button variant="contained" size="large" type="submit">
                Tìm Kiếm
              </Button>
            </div>
            <SearchEnhanced open={open} setOpen={setOpen} formValue={props} />
          </div>
        </form>
      )}
    </Formik>
  );
}

export default Search;
