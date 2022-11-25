import React, { useState, useEffect} from "react";
import { Input, Badge, notification, Button, Dropdown, Menu } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import  axios  from 'axios';
const { Search } = Input;

const Nav = ({count,onSearch}) => {
  
  const [isLogout, setIsLogout] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  
  const logout = () => {
    axios.post("https://localhost:44315/api/logs", {
      idkh: '',
      message: 'Logout',
      ip:'1.127.134.4',
      date: Date()
  })
    // localStorage.clear();
    localStorage.setItem('isAuthor',JSON.stringify(false))
    localStorage.removeItem('isLogin')
    localStorage.removeItem('NAME')
    localStorage.removeItem('ROLE')
    localStorage.removeItem('TOKEN')
    localStorage.removeItem('IDKH')
    setIsLogout(true);
    setIsLogin(false);
    notification.success({
      message: "Thông báo",
      description: "Đăng xuất thành công",
      placement: "bottomRight",
    });
    window.location.reload()
  };
  useEffect(() => {
    const isLogin = localStorage.getItem("isLogin");
    setIsLogin(isLogin);
  }, []);
  const role = JSON.parse(localStorage.getItem("ROLE"));
  const name = JSON.parse(localStorage.getItem("NAME"))
  const menu = (
    <Menu>
      <Menu.Item>
        <Link to="/account/customerInfo">My Account</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/account/customerOrder">My Orders</Link>
      </Menu.Item>
      <Menu.Item onClick={logout}>
        <Link to="/">Log Out</Link>
      </Menu.Item>
    </Menu>
  );
  const menuAdmin = (
    <Menu>
      <Menu.Item>
        <Link to="/admin/productmanager">Dashboard</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/account/customerInfo">Admin Account</Link>
      </Menu.Item>
      <Menu.Item onClick={logout}>
        <Link to="/">Log Out</Link>
      </Menu.Item>
    </Menu>
  );
  return (
    <header className="header">
      <Menu
        mode="horizontal"
        style={{ borderBottom: 0, fontSize: 17, fontWeight: "bolder" }}
      >
        <Menu.Item key="logo">
          <Link to="/" style={{ fontSize: 20, fontWeight: "bolder" }}>
           <img src="./../logo.png" alt="" style={{height:50,width:110}}/>
          </Link>
        </Menu.Item>
        <Menu.Item key="product">
          <Link to="/product">Sản phẩm</Link>
        </Menu.Item>
        <Menu.Item key="aboutus">
          <Link to="/aboutus">About Us</Link>
        </Menu.Item>
      </Menu>
      <Search
        placeholder="Search sản phẩm..."
        // onSearch={(value) => localStorage.setItem("SEARCH", JSON.stringify(value))}
        onSearch={onSearch}
        style={{ width: 300 }}
      />

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {isLogin ? (
          <div>
            {/* check admin */}
            {role == 1 ? (
              <Dropdown overlay={menuAdmin} placement="bottomCenter" arrow>
                <Button type="button" className="btn btn-default">
                  Hi! Admin {name}
                </Button>
              </Dropdown>
            ) : (
              <Dropdown overlay={menu} placement="bottomCenter" arrow>
                <Button type="button" className="btn btn-default">
                  Hi! {name}
                </Button>
              </Dropdown>
            )}
          </div>
        ) : (
          <Link to="/login">
            <Button type="button" className="btn btn-default">
              SIGN-IN
            </Button>
          </Link>
        )}

        <Link to="/cart">
          <Badge count={count}>
            <Button type="button" className="btn btn-default">
              <ShoppingCartOutlined /> CART
            </Button>
          </Badge>
        </Link>
      </div>
    </header>
  );
};

export default Nav;
