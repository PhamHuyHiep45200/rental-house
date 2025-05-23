"use client";

import danangDistrict from "@/data/district/danang.json";
import hanoiDistrict from "@/data/district/hanoi.json";
import hcmDistrict from "@/data/district/hcm.json";
import province from "@/data/province.json";
import { Textarea } from "@mui/joy";
import {
  Button,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Field } from "formik";
import { useMemo } from "react";
import Description from "../base/Description";
import UploadMultipleImage from "../common/UploadMultipleImage";

function FormPost(propsPost) {
  const { props, categories, type } = propsPost;

  const district = useMemo(() => {
    if (props.values.province) {
      switch (props.values.province) {
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
  }, [props.values.province]);

  return (
    <form onSubmit={props.handleSubmit}>
      <h3>Loại Tin</h3>
      <FormControl className="mt-4 block">
        <InputLabel id="type">Thể Loại Tin</InputLabel>
        <Field
          as={Select}
          id="type"
          label="Thể Loại Tin"
          name="type"
          sx={{ width: 300 }}
          variant="outlined"
          margin="dense"
          error={props.errors.type && props.touched.type}
        >
          <MenuItem value="RENT">Cho Thuê Trọ</MenuItem>
          <MenuItem value="PAIR">Tìm Người Ở Ghép</MenuItem>
        </Field>
        <FormHelperText error sx={{ height: 30 }}>
          {props.touched.type && props.errors.type}
        </FormHelperText>
      </FormControl>
      <Divider />
      <h3>Địa Chỉ Cho Thuê</h3>
      <div className="flex items-center space-x-10 mt-4">
        <FormControl>
          <InputLabel id="province">Thành Phố</InputLabel>
          <Field
            as={Select}
            id="province"
            label="Thành Phố"
            name="province"
            sx={{ width: 300 }}
            variant="outlined"
            margin="dense"
            error={props.errors.province && props.touched.province}
          >
            {province.map((pro) => (
              <MenuItem value={pro.code} key={pro.code}>
                {pro.name}
              </MenuItem>
            ))}
          </Field>
          <FormHelperText error sx={{ height: 30 }}>
            {props.touched.province && props.errors.province}
          </FormHelperText>
        </FormControl>
        <FormControl>
          <InputLabel id="district">Quận/Huyện</InputLabel>
          <Field
            as={Select}
            id="district"
            label="Quận/Huyện"
            name="district"
            sx={{ width: 300 }}
            variant="outlined"
            margin="dense"
            error={props.errors.district && props.touched.district}
          >
            {district?.map((dis) => (
              <MenuItem key={dis.code} value={dis.code}>
                {dis.name}
              </MenuItem>
            ))}
          </Field>
          <FormHelperText error sx={{ height: 30 }}>
            {props.touched.district && props.errors.district}
          </FormHelperText>
        </FormControl>
      </div>
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
      <Divider />
      <h3>Thông Tin Mô Tả</h3>
      <div className="mt-4">
        <FormControl>
          <InputLabel id="categoryId">Chọn Chuyên Mục Của Bài</InputLabel>
          <Field
            as={Select}
            id="categoryId"
            label="Chọn Chuyên Mục Của Bài"
            name="categoryId"
            sx={{ width: 300 }}
            variant="outlined"
            margin="dense"
            error={props.errors.categoryId && props.touched.categoryId}
          >
            {categories?.map((cate) => (
              <MenuItem value={cate.id} key={cate.id}>
                {cate.name}
              </MenuItem>
            ))}
          </Field>
          <FormHelperText error sx={{ height: 30 }}>
            {props.touched.categoryId && props.errors.categoryId}
          </FormHelperText>
        </FormControl>
        <FormControl fullWidth>
          <TextField
            id="outlined-basic"
            label="Tiêu Đề"
            value={props.values.title}
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            name="title"
            variant="outlined"
            error={props.touched.title && Boolean(props.errors.title)}
          />
          <FormHelperText error sx={{ height: 30 }}>
            {props.touched.title && props.errors.title}
          </FormHelperText>
        </FormControl>
        <FormControl fullWidth>
          <Field
            as={Description}
            name="description"
            placeholder="Nội Dung Mô Tả ..."
            onChange={(value) => props.setFieldValue("description", value)}
          />
          <FormHelperText error sx={{ height: 30 }}>
            {props.touched.description && props.errors.description}
          </FormHelperText>
        </FormControl>
        <FormControl fullWidth>
          <Field
            as={Textarea}
            minRows={6}
            placeholder="Thông Tin Liên Hệ ..."
            variant="soft"
            name="contact"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            error={!!props.touched.contact && Boolean(props.errors.contact)}
          />
          <FormHelperText error sx={{ height: 30 }}>
            {props.touched.contact && props.errors.contact}
          </FormHelperText>
        </FormControl>
        <div className="flex items-center space-x-10">
          <FormControl>
            <Field
              as={TextField}
              type="number"
              label="Diện Tích"
              name="square"
              id="outlined-start-adornment"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              error={!!props.touched.square && Boolean(props.errors.square)}
            />
            <FormHelperText error sx={{ height: 30 }}>
              {props.touched.square && props.errors.square}
            </FormHelperText>
          </FormControl>
          <FormControl>
            <Field
              as={TextField}
              label="Số Tiền"
              type="number"
              name="money"
              id="outlined-start-adornment"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              error={!!props.touched.money && Boolean(props.errors.money)}
            />
            <FormHelperText error sx={{ height: 30 }}>
              {props.touched.money && props.errors.money}
            </FormHelperText>
          </FormControl>
        </div>
        <div className="mb-5">
          <FormLabel>Upload Ảnh</FormLabel>
          <UploadMultipleImage
            value={props.values.imgs}
            onChange={(value) => {
              props.setFieldValue("imgs", [...value]);
            }}
          />
          <FormHelperText error sx={{ height: 30 }}>
            {props.touched.imgs && props.errors.imgs}
          </FormHelperText>
        </div>
      </div>
      <div className="text-center">
        <Button variant="contained" size="large" color="primary" type="submit">
          {type === "update" ? "Cập Nhật" : "Đăng Bài"}
        </Button>
      </div>
    </form>
  );
}

export default FormPost;
