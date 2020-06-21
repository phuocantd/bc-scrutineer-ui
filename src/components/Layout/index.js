import React, { useState } from "react";
import "antd/dist/antd.css";
import { Layout, Menu } from "antd";
import { HomeOutlined, UserOutlined, TableOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

import "./index.css";

const { Header, Content, Footer, Sider } = Layout;

function LayoutPage({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [width, setWidth] = useState();

  const onCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        breakpoint="xs"
        collapsedWidth={width}
        onBreakpoint={(broken) => {
          if (broken) {
            setWidth(0);
          } else {
            setWidth(80);
          }
        }}
        collapsible
        collapsed={collapsed}
        onCollapse={() => onCollapse()}
      >
        <div className="logo" />
        <Menu
          theme="dark"
          defaultSelectedKeys={[`/${window.location.href.split("/").pop()}`]}
          mode="inline"
        >
          <Menu.Item key="/">
            <Link to="/">
              <HomeOutlined />
              <span>Home</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="/manage">
            <Link to="/manage">
              <TableOutlined />
              <span>Manage</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="/profile">
            <Link to="/profile">
              <UserOutlined />
              <span>Profile</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="/blockchain">
            <Link to="/blockchain">
              <span>POA Network</span>
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            background: "#fff",
            padding: 0,
            fontWeight: "bold",
            marginLeft: "16px",
            marginRight: "16px",
            paddingLeft: "10px",
            marginTop: "16px",
            fontSize: 30,
          }}
        >
          SCRUTINEER
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <div style={{ margin: "16px 0" }} />
          <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
}

export default LayoutPage;
