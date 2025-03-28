import hanoi from "@/data/district/hanoi.json";
import danang from "@/data/district/danang.json";
import hcm from "@/data/district/hcm.json";
import province from "@/data/province.json";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const formatMoney = (num) => {
  return new Intl.NumberFormat().format(+num);
};

export const copyText = (text) => {
  navigator.clipboard.writeText(text);
};

export const getProvince = (code) => {
  return province?.find((pro) => pro.code === code)?.name;
};

export const getDistrict = (provinceCode, districtCode) => {
  const provinceData = {
    1: hanoi,
    48: danang,
    79: hcm,
  };
  return provinceData[provinceCode]?.find((e) => e.code === districtCode).name;
};

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const getImage = (url) => {
  if (!url) return "";

  return `/uploads/${url}`;
};
