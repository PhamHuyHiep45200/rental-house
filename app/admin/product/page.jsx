"use client";
import ProductApproved from "@/app/components/admin/post/ProductApproved";
import ProductCancle from "@/app/components/admin/post/ProductCancle";
import ProductPending from "@/app/components/admin/post/ProductPending";
import { Tabs, Tag } from "antd";
import React, { useState } from "react";

function Product() {
  const [checkCall, setCheckCall] = useState(Math.random());

  const resetData = () => {
    setCheckCall(Math.random());
  };
  const onChange = (key) => {
    console.log(key);
  };

  const items = [
    {
      key: "1",
      label: <Tag color="green">Bài Đăng Đã Duyệt</Tag>,
      children: <ProductApproved checkCall={checkCall} resetData={resetData} />,
    },
    {
      key: "2",
      label: <Tag color="blue">Bài Đăng Đợi Duyệt</Tag>,
      children: <ProductPending checkCall={checkCall} resetData={resetData} />,
    },
    {
      key: "3",
      label: <Tag color="red">Bài Đăng Đã Hủy</Tag>,
      children: <ProductCancle checkCall={checkCall} />,
    },
  ];
  return (
    <div>
      <div className="text-center text-[30px] font-bold text-[#333]">
        Quản Lý Bài Đăng
      </div>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  );
}

export default Product;
