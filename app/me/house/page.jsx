"use client";
import { formatMoney, getDistrict, getProvince } from "@/utils/common.util";
import {
  Chip,
  Container,
  Divider,
  Pagination,
  Switch,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tabs,
} from "@mui/material";
import { useSnackbar } from "notistack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RunningWithErrorsIcon from "@mui/icons-material/RunningWithErrors";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import React, { useEffect, useMemo, useState } from "react";
import BrushIcon from "@mui/icons-material/Brush";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import { HOUSE_STATUS } from "@/config/house.config";
import { useRouter, useSearchParams } from "next/navigation";
import DialogConfirm from "@/app/components/base/DialogConfirm";
import MaskImage from "@/app/components/base/MaskImage";
import { useGetHouseForMeQuery } from "@/service/rtk-query";
import useQueryString from "@/hooks/useQueryString";
import useAuthState from "@/hooks/useAuthState";
import { PRODUCT_STATUS } from "@/contants/product";

function House() {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { updateQueryStrings, updateQueryString } = useQueryString();
  const tab = searchParams.get("tab") || "1";
  const page = searchParams.get("page") || "1";

  const status = useMemo(() => {
    switch (tab) {
      case "0":
        return PRODUCT_STATUS.APPROVED;
      case "1":
        return PRODUCT_STATUS.APPROVE;
      case "2":
        return PRODUCT_STATUS.UN_APPROVE;
      default:
        return PRODUCT_STATUS.APPROVED;
    }
  }, [tab]);

  const { user } = useAuthState();

  const [open, setOpen] = useState(false);
  const [idAction, setIdAction] = useState("");

  const { data, isSuccess, refetch } = useGetHouseForMeQuery(
    {
      userId: user?.id,
      page,
      status,
    },
    { skip: !user?.id }
  );
  const [updateHouse, { isSuccess: isSuccessUpdate, isError: isErrorUpdate }] =
    [[], { isSuccess: true, isError: false }];

  const [deleteHouse, { isSuccess: isSuccessDelete, isError: isErrorDelete }] =
    [[], { isSuccess: true, isError: false }];

  useEffect(() => {
    if (user && isSuccessUpdate) {
      refetch?.();
    }
    if (isErrorUpdate) {
      enqueueSnackbar("Update Thất Bại", {
        variant: "error",
      });
    }
  }, [isSuccessUpdate, isErrorUpdate, user]);

  useEffect(() => {
    if (user && isSuccessDelete) {
      refetch?.();
    }
    if (isErrorDelete) {
      enqueueSnackbar("Xoá Thất Bại", {
        variant: "error",
      });
    }
  }, [isSuccessDelete, isErrorDelete, user]);

  const changeActive = (e, id) => {
    updateHouse({
      id,
      data: {
        active: e.target.checked,
      },
    });
  };

  const changePage = (_, page) => {
    updateQueryString("page", page);
  };

  const handleChangeTabs = (_, tab) => {
    updateQueryStrings({
      tab: tab.toString(),
      page: 1,
    });
  };

  const submitDialog = () => {
    if (tab === "1") {
      router.push(`/update/${idAction}`);
      return;
    }
    deleteHouse({ id: idAction });
    setOpen(false);
  };

  const openDialogAction = (id) => {
    setOpen(true);
    setIdAction(id);
  };

  useEffect(() => {
    if (!user) {
      router.replace("/login"); // Chuyển hướng nếu không có user
      return;
    }
  }, [user]);

  return (
    <Container className="bg-white rounded-lg py-5">
      <Tabs
        value={Number(tab)}
        onChange={handleChangeTabs}
        variant="scrollable"
        scrollButtons={false}
        aria-label="scrollable prevent tabs example"
      >
        <Tab
          label={
            <Chip color="success" icon={<CheckCircleIcon />} label="Đã Duyệt" />
          }
        />
        <Tab
          label={
            <Chip
              color="warning"
              icon={<RunningWithErrorsIcon />}
              label="Đang Đợi Duyệt"
            />
          }
        />
        <Tab
          label={
            <Chip color="error" icon={<HighlightOffIcon />} label="Bị Huỷ" />
          }
        />
      </Tabs>
      <Divider />
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Phòng Trọ</TableCell>
            <TableCell>Địa Chỉ</TableCell>
            <TableCell>Số Tiền</TableCell>
            <TableCell>Hoạt Động</TableCell>
            {tab === "0" && <TableCell>Xoá Bài</TableCell>}
            {tab === "1" && <TableCell>Sửa Bài</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.data?.map((row) => (
            <TableRow
              key={row?.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <div className="flex items-start space-x-2">
                  <MaskImage
                    src={row?.imgs?.[0]}
                    className="w-[150px] h-[100px]"
                  />
                  <div>
                    <span className="font-semibold w-[200px] truncate-2">
                      {row?.title}
                    </span>
                    <span className="text-[#666] block mt-1 text-[12px]">
                      Thể Loại: {row?.category?.name}
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col items-start">
                  <span className="text-gray font-bold">
                    {getProvince(row?.province)}
                  </span>
                  <span className="text-gray font-semibold">
                    {getDistrict(row?.province, row?.district)}
                  </span>
                  <span className="text-gray w-[150px] truncate">
                    {row?.address}
                  </span>
                </div>
              </TableCell>
              <TableCell className="text-[red] font-semibold">
                {formatMoney(row?.money ?? 0)}đ
              </TableCell>
              <TableCell>
                <Switch
                  checked={row?.active}
                  onClick={(e) => changeActive(e, row?.id)}
                />
              </TableCell>
              {tab === "1" && (
                <TableCell>
                  <BrushIcon
                    className="text-[#ff9500] text-[30px] cursor-pointer"
                    onClick={() => openDialogAction(row?.id)}
                  />
                </TableCell>
              )}
              {(tab === "0" || tab === undefined) && (
                <TableCell>
                  <DeleteSweepIcon
                    className="text-[red] text-[30px]"
                    onClick={() => openDialogAction(row?.id)}
                  />
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <DialogConfirm
        openDialog={open}
        title={tab === "1" ? "Chỉnh Sửa Bài" : "Xoá Bài"}
        textContent={
          tab === "1"
            ? "Bạn Muốn Chỉnh Sửa Bài?"
            : "Bạn Chắc Chắn Muốn Xoá Bài?"
        }
        textSubmit={tab === "1" ? "Chỉnh Sửa" : "Xoá Bài"}
        onClose={() => setOpen(false)}
        onSubmit={submitDialog}
      />
      <Divider />
      {isSuccess && data?.totalRecord > 0 && (
        <div className="flex justify-center mt-5">
          <Pagination
            count={data.totalRecord}
            page={page}
            onChange={changePage}
            color="primary"
          />
        </div>
      )}
    </Container>
  );
}

export default House;
