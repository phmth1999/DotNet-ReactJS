import React, { Component } from "react";
import { Layout, Menu, Avatar } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  ShopOutlined,
  SettingOutlined,
} from "@ant-design/icons";

import { Route, Switch, Link } from "react-router-dom";
import ProductContent from "./ProductContent/ProductContent";
import AdminContent from "./AdminContent/AdminContent";
import ProductTypeContent from "./ProductTypeContent/ProductTypeContent";
import OrderContent from "./OrderContent/OrderContent";
import { Logs } from "./Logs";


const { Header, Sider, Content } = Layout;

class AdminPage extends Component {
  state = {
    collapsed: false,
    author: JSON.parse(localStorage.getItem("isAuthor"))
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <div className=" customer-page">
        <Layout>
          <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
            <div
              className="logo"
              style={{
                backgroundColor: "lightgray",
                height: 65,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Avatar size={40}>ADMIN</Avatar>
            </div>
            <Menu mode="inline" defaultSelectedKeys={["1"]}>
              <Menu.Item key="product" icon={<UserOutlined />}>
                <Link to="/admin/productmanager">Quản lý sản phẩm</Link>
              </Menu.Item>

              <Menu.Item key="thuonghieu" icon={<ShopOutlined />}>
                <Link to="/admin/producttypemanager">Quản lý thương hiệu</Link>
              </Menu.Item>
              <Menu.Item key="taikhoanadmin" icon={<SettingOutlined />}>
                <Link to="/admin/adminmanager">Quản lý tài khoản</Link>
              </Menu.Item>
              <Menu.Item key="hoadon" icon={<SettingOutlined />}>
                <Link to="/admin/ordermanager">Quản lý hóa đơn</Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }}>
              {React.createElement(
                this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                {
                  className: "trigger",
                  onClick: this.toggle,
                }
              )}
              
            </Header>
            <Logs />
            <Content
              className="site-layout-background"
              style={{
                margin: "24px 16px",
                padding: 24,
                minHeight: 400,
              }}
            > 
            {this.state.author === false ? <Switch>
                {/* <Route path="/admin/productmanager">
                    <ProductContent/>
                </Route>
              
                <Route path="/admin/producttypemanager">
                  <ProductTypeContent />
                </Route>
                <Route path="/admin/adminmanager">
                  <AdminContent />
                </Route>
                <Route path="/admin/ordermanager">
                  <OrderContent />
                </Route> */}
              </Switch>: <Switch>
                <Route path="/admin/productmanager">
                    <ProductContent/>
                </Route>
              
                <Route path="/admin/producttypemanager">
                  <ProductTypeContent />
                </Route>
                <Route path="/admin/adminmanager">
                  <AdminContent />
                </Route>
                <Route path="/admin/ordermanager">
                  <OrderContent />
                </Route>
              </Switch>}
              
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}
export default AdminPage;
