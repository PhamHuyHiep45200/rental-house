"use client";

import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function useQueryString() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();

  // Cập nhật một query string duy nhất
  const updateQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams.toString());
      value ? params.set(name, value) : params.delete(name);
      router.replace(pathName + "?" + params.toString(), { scroll: false });
    },
    [searchParams, router, pathName]
  );

  // Tạo một query string mới
  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams();
      params.set(name, value);
      router.replace(pathName + "?" + params.toString(), { scroll: false });
    },
    [router, pathName]
  );

  // Cập nhật nhiều query strings cùng lúc
  const updateQueryStrings = useCallback(
    (values) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(values).forEach(([name, value]) => {
        value ? params.set(name, value) : params.delete(name);
      });
      router.replace(pathName + "?" + params.toString(), { scroll: false });
    },
    [searchParams, router, pathName]
  );

  return { updateQueryString, createQueryString, updateQueryStrings };
}
