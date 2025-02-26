import {
  HighlightOutlined,
  LockOutlined,
  UnlockOutlined,
} from "@ant-design/icons";
import { Button, Pagination, Table } from "antd";
import React, { useEffect, useState } from "react";
import AddUser from "./addCategory";
import UpdateUser from "./updateCategory";
import { deleteCategory, getAllCategory } from "@/service/admin/category";

function Category() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [dataUpdate, setDataUpdate] = useState(null);
  const [add, setAdd] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);

  const columns = [
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Thao Tác",
      key: "action",
      render: (e) => (
        <div className="flex items-center space-x-[10px]">
          <div
            className="px-[10px] py-[5px] rounded-xl bg-[green] border-[green] border-[1px] bg-opacity-25 space-x-[5px] text-[white] flex items-center cursor-pointer font-medium"
            onClick={() => {
              setDataUpdate(e);
              setOpenUpdate(true);
            }}
          >
            <HighlightOutlined className="text-[green]" />
            <span className="text-[green]">Chỉnh Sửa</span>
          </div>
          {!e.active ? (
            <div
              className="px-[10px] py-[5px] rounded-xl bg-[#ffae00] border-[#ffae00] border-[1px] bg-opacity-25 space-x-[5px] text-[white] flex items-center cursor-pointer font-medium"
              onClick={() => handleDelete(e._id, true)}
            >
              <span className="text-[#ffae00]">Công Khai</span>
            </div>
          ) : (
            <div
              className="px-[10px] py-[5px] rounded-xl bg-[red] border-[red] border-[1px] bg-opacity-25 space-x-[5px] text-[white] flex items-center cursor-pointer font-medium"
              onClick={() => handleDelete(e._id, false)}
            >
              <span className="text-[red]">Khóa</span>
            </div>
          )}
        </div>
      ),
    },
  ];
  useEffect(() => {
    getAll();
  }, []);
  const getAll = async () => {
    setLoading(true);
    try {
      const { data } = await getAllCategory();
      setData(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const closeAdd = () => {
    setAdd(false);
    setOpenUpdate(false);
  };
  const handleDelete = async (id, active) => {
    try {
      await deleteCategory(id, active);
      getAll();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="text-center text-[30px] font-bold text-[#333]">
        Quản Lý Thể Loại
      </div>
      <div className="mb-5">
        <Button size="large" onClick={() => setAdd(true)}>
          Thêm thể loại
        </Button>
      </div>
      <AddUser open={add} refresh={getAll} closeAdd={closeAdd} />
      <UpdateUser
        open={openUpdate}
        refresh={getAll}
        closeAdd={closeAdd}
        data={dataUpdate}
      />
      <Table columns={columns} dataSource={data} loading={loading} />
    </div>
  );
}

export default Category;
