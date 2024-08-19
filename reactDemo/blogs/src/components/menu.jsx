import React, { useState } from "react";
import { Button, Menu } from "antd";
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from "@ant-design/icons";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [
  getItem("概况", "1", <PieChartOutlined />),
  getItem("文章", "2", <DesktopOutlined />),
  getItem("记事", "3", <ContainerOutlined />),
  getItem("照片", "4", <MailOutlined />),
  getItem("关于我", "sub1", <AppstoreOutlined />,[
    getItem("简历",'5')
  ]),
  getItem("生活趣闻", "6", <AppstoreOutlined />),
  getItem("留言", "7", <AppstoreOutlined />),
];

const LeftMenu = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <>
      <Menu
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        items={items}
      />
    </>
  );
};

export default LeftMenu;
