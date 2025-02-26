import React, { useEffect, useMemo, useState } from "react";
import { getAllProduct, updateMultiProduct } from "@/service/product";
import { formatMoney } from "@/utils/common";
import { Button, Image, Pagination, Table } from "antd";
import { useRouter } from "next/router";
import { PRODUCT_STATUS } from "@/enum/product.enum";

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
      const product = data?.data?.map((e) => ({
        ...e,
        key: e?._id,
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
  const columns = useMemo(() => {
    return [
      {
        title: "Nhà Trọ",
        render: (_, record) => (
          <div className="flex items-center space-x-4">
            <Image
              src={record?.imgs?.[0]}
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
        title: "Kiểu Bài Đăng",
        align: "center",
        render: (_, record) => <span>{record?.type} đ</span>,
      },
      {
        title: "Giá",
        render: (_, record) => (
          <span className="text-[red] font-semibold">
            {formatMoney(record?.money)} đ
          </span>
        ),
      },
    ];
  }, []);
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