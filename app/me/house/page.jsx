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
import { useRouter } from "next/navigation";
import DialogConfirm from "@/app/components/base/DialogConfirm";
import MaskImage from "@/app/components/base/MaskImage";

function House() {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const tabStatus = false;
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
  });
  const [tab, setTab] = useState(0);
  const [open, setOpen] = useState(false);
  const [idAction, setIdAction] = useState("");

  const { data, isSuccess, refetch } = {
    data: [],
    isSuccess: true,
    refetch: () => {},
  };
  const [updateHouse, { isSuccess: isSuccessUpdate, isError: isErrorUpdate }] =
    [[], { isSuccess: true, isError: false }];

  const [deleteHouse, { isSuccess: isSuccessDelete, isError: isErrorDelete }] =
    [[], { isSuccess: true, isError: false }];

  const listHouse = [];

  useEffect(() => {
    if (isSuccessUpdate) {
      refetch();
    }
    if (isErrorUpdate) {
      enqueueSnackbar("Update Thất Bại", {
        variant: "error",
      });
    }
  }, [isSuccessUpdate, isErrorUpdate]);

  useEffect(() => {
    if (isSuccessDelete) {
      refetch();
    }
    if (isErrorDelete) {
      enqueueSnackbar("Xoá Thất Bại", {
        variant: "error",
      });
    }
  }, [isSuccessDelete, isErrorDelete]);

  const changeActive = (e, id) => {
    updateHouse({
      id,
      data: {
        active: e.target.checked,
      },
    });
  };

  const changePage = (_, page) => {
    setPagination({
      ...pagination,
      page,
    });
  };

  const handleChangeTabs = (_, tab) => {
    setTab(tab);
    setPagination({
      ...pagination,
      page: 1,
    });
    router.replace({
      query: {
        tab: tab,
      },
    });
  };

  const submitDialog = () => {
    if (tabStatus === "1") {
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
    // if (router.query.tab) {
    setTab(1);
    // }
  }, [router]);

  return (
    <Container className="bg-white rounded-lg py-5">
      <Tabs
        value={tab}
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
            {tabStatus === "0" && <TableCell>Xoá Bài</TableCell>}
            {tabStatus === "1" && <TableCell>Sửa Bài</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {listHouse?.map((row) => (
            <TableRow
              key={row?.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <div className="flex items-start space-x-2">
                  <MaskImage src={row?.imgs?.[0]} width={150} height={100} />
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
              {tabStatus === "1" && (
                <TableCell>
                  <BrushIcon
                    className="text-[#ff9500] text-[30px]"
                    onClick={() => openDialogAction(row?.id)}
                  />
                </TableCell>
              )}
              {(tabStatus === "0" || tabStatus === undefined) && (
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
        title={tabStatus === "1" ? "Chỉnh Sửa Bài" : "Xoá Bài"}
        textContent={
          tabStatus === "1"
            ? "Bạn Muốn Chỉnh Sửa Bài?"
            : "Bạn Chắc Chắn Muốn Xoá Bài?"
        }
        textSubmit={tabStatus === "1" ? "Chỉnh Sửa" : "Xoá Bài"}
        onClose={() => setOpen(false)}
        onSubmit={submitDialog}
      />
      <Divider />
      {isSuccess && data?.data?.total > 0 && (
        <div className="flex justify-center mt-5">
          <Pagination
            count={Math.floor(pagination?.total / 10 + 1)}
            page={pagination.page}
            onChange={changePage}
            color="primary"
          />
        </div>
      )}
    </Container>
  );
}

export default House;
