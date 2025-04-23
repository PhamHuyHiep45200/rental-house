import { formatMoney } from "@/utils/common.util";
import {
  Button,
  Dialog,
  DialogContentText,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slider,
} from "@mui/material";
import hanoiDistrict from "@/data/district/hanoi.json";
import danangDistrict from "@/data/district/danang.json";
import hcmDistrict from "@/data/district/hcm.json";
import React, { useMemo } from "react";
import { Field } from "formik";
import { useAppSelector } from "@/store/hooks";
import Image from "next/image";
import province from "@/data/province.json";
import { useGetAllCategoryQuery } from "@/service/rtk-query";

function SearchEnhanced(props) {
  const { open, setOpen, formValue } = props;
  const { infoAccout } = useAppSelector((state) => state.authSlice);

  const { data, isSuccess } = useGetAllCategoryQuery({});

  const handleClose = () => {
    setOpen(false);
  };

  const category = useMemo(() => data?.data || [], [data]);

  const prices = useMemo(
    () => [
      {
        label: "0 - 2 triệu",
        value: "0-2",
      },
      {
        label: "2 - 5 triệu",
        value: "2-5",
      },
      {
        label: "5 - 10 triệu",
        value: "5-10",
      },
      {
        label: "10 triệu trở lên",
        value: "10-up",
      },
    ],
    []
  );

  const acreage = useMemo(
    () => [
      {
        label: "0 - 30 m2",
        value: "0-30",
      },
      {
        label: "30 - 50 m2",
        value: "30-50",
      },
      {
        label: "Trên 50 m2",
        value: "50-up",
      },
    ],
    []
  );

  const district = useMemo(() => {
    if (formValue.values.province) {
      switch (formValue.values.province) {
        case 1:
          return hanoiDistrict;
        case 48:
          return danangDistrict;
        case 79:
          return hcmDistrict;
        default:
          return [];
      }
    }
  }, [formValue.values]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <div className="p-5 px-10">
        <DialogContentText component={"span"}>
          <div className="font-bold">Tìm kiếm nâng cao:</div>
          <div className="flex flex-1 justify-center my-3">
            <FormControl fullWidth={true}>
              <InputLabel id="demo-simple-select-standard-label">
                <div className="flex items-center space-x-2">
                  <span className="text-[16px] block mt-1">Tìm kiếm theo</span>
                </div>
              </InputLabel>
              <Field
                as={Select}
                id="demo-simple-select"
                variant="standard"
                labelId="demo-simple-select-standard-label"
                sx={{ width: 200 }}
                name="type"
                defaultValue={""}
              >
                <MenuItem value="RENT">Thuê Nhà</MenuItem>
                <MenuItem value="PAIR">Tìm Người Ở Ghép</MenuItem>
              </Field>
            </FormControl>
          </div>
          <div className="flex flex-1 justify-center my-3">
            <FormControl fullWidth={true}>
              <InputLabel id="demo-simple-select-standard-label">
                Khu Vực
              </InputLabel>
              <Field
                as={Select}
                id="demo-simple-select"
                variant="standard"
                labelId="demo-simple-select-standard-label"
                name="province"
                sx={{ width: 200 }}
                defaultValue={""}
              >
                {province.map((pro) => (
                  <MenuItem key={pro.code} value={pro.code}>
                    {pro.name}
                  </MenuItem>
                ))}
              </Field>
            </FormControl>
          </div>
          <div className="flex flex-1 justify-center my-3">
            <FormControl fullWidth={true}>
              <InputLabel id="demo-simple-select-standard-label">
                Thể Loại
              </InputLabel>
              <Field
                as={Select}
                id="demo-simple-select"
                variant="standard"
                labelId="demo-simple-select-standard-label"
                name="category"
                sx={{ width: 200 }}
                defaultValue={""}
              >
                {category.map((cate) => (
                  <MenuItem key={cate.id} value={cate.id}>
                    {cate.name}
                  </MenuItem>
                ))}
              </Field>
            </FormControl>
          </div>
          <div className="flex flex-1 justify-center my-3">
            <FormControl fullWidth={true}>
              <InputLabel id="demo-simple-select-standard-label">
                Mức giá
              </InputLabel>
              <Field
                as={Select}
                id="demo-simple-select"
                variant="standard"
                labelId="demo-simple-select-standard-label"
                name="money_range"
                sx={{ width: 200 }}
                defaultValue={""}
              >
                {prices.map((cate) => (
                  <MenuItem key={cate.value} value={cate.value}>
                    {cate.label}
                  </MenuItem>
                ))}
              </Field>
            </FormControl>
          </div>
          <div className="flex flex-1 justify-center my-3">
            <FormControl fullWidth={true}>
              <InputLabel id="demo-simple-select-standard-label">
                Diện tích
              </InputLabel>
              <Field
                as={Select}
                id="demo-simple-select"
                variant="standard"
                labelId="demo-simple-select-standard-label"
                name="square_range"
                sx={{ width: 200 }}
                defaultValue={""}
              >
                {acreage.map((cate) => (
                  <MenuItem key={cate.value} value={cate.value}>
                    {cate.label}
                  </MenuItem>
                ))}
              </Field>
            </FormControl>
          </div>
          <FormControl>
            <InputLabel id="demo-simple-select-standard-label">
              Chọn Huyện/Quận
            </InputLabel>
            <Field
              name="district"
              as={Select}
              id="demo-simple-select"
              variant="standard"
              labelId="demo-simple-select-standard-label"
              sx={{ width: 200 }}
              defaultValue={""}
            >
              {district?.map((dis) => (
                <MenuItem key={dis.code} value={dis.code}>
                  {dis.name}
                </MenuItem>
              ))}
            </Field>
          </FormControl>
          <div className="text-center mt-5">
            <Button
              variant="contained"
              color="warning"
              className="px-[40px]"
              onClick={handleClose}
            >
              Đóng
            </Button>
          </div>
        </DialogContentText>
      </div>
    </Dialog>
  );
}

export default SearchEnhanced;
