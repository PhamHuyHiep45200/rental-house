"use client";
import useAuthState from "@/hooks/useAuthState";
import { AreaChartOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

const { Sider, Content } = Layout;

function LayoutMain({ children }) {
  const router = useRouter();
  const { user } = useAuthState();
  const pathName = usePathname();

  useEffect(() => {
    if (!user) {
      router.replace("/login"); // Chuyển hướng nếu không có user
      return;
    }
    if (user?.role !== "ADMIN") {
      router.replace("/");
    }
  }, [user]);

  if (!user) {
    return <div>Loading...</div>; // Hiển thị loading thay vì null
  }

  if (user?.role !== "ADMIN") {
    return null;
  }

  const changeMenu = (e) => {
    if (e.key === "/login") {
      logout();
    } else {
      router.push(e.key);
    }
  };

  const itemsLayout = [
    { key: "/admin", icon: <AreaChartOutlined />, label: "Trang chủ" },
    { key: "/admin/user", icon: <UsergroupAddOutlined />, label: "Người dùng" },
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
    { key: "/admin/login", icon: <UsergroupAddOutlined />, label: "Đăng Xuất" },
  ];

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[pathName]}
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
