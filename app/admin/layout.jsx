"use client";
import { AreaChartOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { useRouter } from "next/navigation";
import React from "react";

const { Sider, Content } = Layout;
function LayoutMain({ children }) {
  const router = useRouter();
  const changeMenu = (e) => {
    if (e.key === "/login") {
      logout();
    } else {
      router.push(e.key);
    }
  };
  const itemsLayout = [
    {
      key: "/admin",
      icon: <AreaChartOutlined />,
      label: "Trang chủ",
    },
    {
      key: "/admin/user",
      icon: <UsergroupAddOutlined />,
      label: "Người dùng",
    },
    {
      key: "/admin/category",
      icon: <UsergroupAddOutlined />,
      label: "Thể Loại",
    },
    {
      key: "/admin/product",
      icon: <UsergroupAddOutlined />,
      label: "Quản Lý Bài Đăng",
    },
    {
      key: "/admin/login",
      icon: <UsergroupAddOutlined />,
      label: "Đăng Xuất",
    },
  ];
  return (
    <Layout style={{ height: "100vh" }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={itemsLayout}
          onClick={changeMenu}
        />
      </Sider>
      <Layout>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{ padding: 24, minHeight: 360 }}
            className="max-h-[calc(100vh-60px)] overflow-y-auto"
          >
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default LayoutMain;
