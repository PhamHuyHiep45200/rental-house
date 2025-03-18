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

function SearchEnhanced(props) {
  const { open, setOpen, formValue } = props;
  const { infoAccout } = useAppSelector((state) => state.authSlice);

  const { data, isSuccess } = { data: { data: { data: [] } }, isSuccess: true };

  const handleClose = () => {
    setOpen(false);
  };

  const category = useMemo(() => {
    if (isSuccess) {
      return data.data.data;
    }
    return [];
  }, [isSuccess]);

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
          <div className="font-bold">Chọn Giá:</div>
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
                defaultValue={''}
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
                defaultValue={''}
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
                defaultValue={''}
              >
                {category.map((cate) => (
                  <MenuItem key={cate._id} value={cate._id}>
                    {cate.name}
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
              defaultValue={''}
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
