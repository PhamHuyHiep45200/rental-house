import React, { useEffect, useMemo, useState } from "react";
import { getAllProduct, updateMultiProduct } from "@/service/admin/product";
import { formatMoney } from "@/utils/common.util";
import { Button, Image, Pagination, Table } from "antd";
import { PRODUCT_STATUS } from "@/contants/product";
import { HOUSE_DEFAULT } from "@/contants/image";

function ProductApproved({ checkCall, resetData }) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    total: 0,
  });

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const changeStatusProducts = async (status) => {
    try {
      await updateMultiProduct({
        status,
        listId: selectedRowKeys,
      });
      getAllCartProductAproved();
      resetData();
    } catch (error) {
      console.log(error);
    }
  };

  const getAllCartProductAproved = async () => {
    setLoading(true);
    try {
      const { data } = await getAllProduct({
        status: "ACCEPT",
        page: pagination.page,
      });
      setData(
        data?.map((e) => ({
          ...e,
          key: e.id,
        }))
      );
      setPagination({
        ...pagination,
        total: data.total,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getAllCartProductAproved();
  }, [checkCall, pagination.page]);
  const columns = [
    {
      key: "imgs",
      dataIndex: "imgs",
      title: "Nhà Trọ",
      render: (imgs, record) => (
        <div className="flex items-center space-x-4">
          <Image
            src={imgs[0] || HOUSE_DEFAULT}
            alt=""
            className="max-w-[100px] min-w-[100px] min-h-[100px] max-h-[100px] rounded-[6px]"
          />
          <div className="max-w-[200px]">{record?.title}</div>
          <div>
            <span className="block text-[12px] text-[#999] italic">
              Thể Loại
            </span>
          </div>
        </div>
      ),
    },
    {
      title: "Thể Loại",
      render: (_, record) => <span>{record?.category?.name}</span>,
    },
    {
      key: "type",
      dataIndex: "type",
      title: "Kiểu Bài Đăng",
      align: "center",
      // render: (_, record) => <span>{record?.type}</span>,
    },
    {
      key: "money",
      dataIndex: "money",
      title: "Giá",
      render: (money) => (
        <span className="text-[red] font-semibold">{formatMoney(money)} đ</span>
      ),
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const changePage = (page) => {
    setPagination({
      ...pagination,
      page,
    });
  };

  return (
    <div>
      <div className="flex justify-end mb-5">
        <Button
          danger
          onClick={() => changeStatusProducts(PRODUCT_STATUS.UN_APPROVE)}
        >
          Gỡ sản phẩm
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        rowSelection={rowSelection}
        pagination={false}
      />
      {!!data.length && (
        <div className="flex justify-center mt-5">
          <Pagination
            current={pagination.page}
            total={pagination.total}
            onChange={changePage}
          />
        </div>
      )}
    </div>
  );
}

export default ProductApproved;
