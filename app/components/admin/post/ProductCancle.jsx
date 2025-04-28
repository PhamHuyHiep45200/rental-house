import React, { useEffect, useMemo, useState } from "react";
import { getAllProduct } from "@/service/admin/product";
import { formatMoney } from "@/utils/common.util";
import { Image, Pagination, Table } from "antd";
import { HOUSE_DEFAULT } from "@/contants/image";
import { getImage } from "@/service/frontend";

function ProductCancle({ checkCall }) {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    total: 0,
  });

  const getAllProductCancle = async () => {
    setLoading(true);
    try {
      const { data } = await getAllProduct({
        status: "REJECT",
        page: pagination.page,
      });
      const product = data?.map((e) => ({
        ...e,
        key: e?.id,
      }));
      setPagination({
        ...pagination,
        total: data.total,
      });
      if (product.length) {
        setProduct(product);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getAllProductCancle();
  }, [checkCall, pagination.page]);
  const columns = [
    {
      key: "imgs",
      dataIndex: "imgs",
      title: "Nhà Trọ",
      render: (imgs, record) => (
        <div className="flex items-center space-x-4">
          <Image
            src={getImage(imgs?.[0]) || HOUSE_DEFAULT}
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
  const changePage = (page) => {
    setPagination({
      ...pagination,
      page,
    });
  };
  return (
    <div>
      <Table
        columns={columns}
        pagination={false}
        dataSource={product}
        loading={loading}
      />
      {!!product.length && (
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

export default ProductCancle;
