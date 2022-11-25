import React, { useState,useEffect } from "react";
import { Layout, Menu, Avatar,Descriptions } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  ShopOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import CustomerInfo from "./CustomerInfo";
import { Route, Switch, Link } from "react-router-dom";
import CustomerOrder from "./CustomerOrder";
import ChangeAddress from "./ChangeAddress";
import CustomerOrderInfo from "./CustomerOrderInfo";
import axios from 'axios'
import  CustomerInfoEdit  from './CustomerInfoEdit';
import { Mail } from './Mail';
import {ChangePass} from './ChangePass'
const { Header, Sider, Content } = Layout; 

const CustomerPage = () => {
  const [idkh,setIdkh] = useState(JSON.parse(localStorage.getItem('IDKH'))? JSON.parse(localStorage.getItem('IDKH')) : 0)


const [info,setInfo] = useState([])
  const [infoEdit,setInfoEdit] = useState([])

  useEffect(() => {
    const id = JSON.parse(localStorage.getItem('IDKH'))
    setIdkh(id)
    }, [idkh]);

 
    useEffect(() => {
      const fetchData = async () => {
        const res = await axios.get(`https://localhost:44315/api/taikhoans/${idkh}`)
        setInfo(res.data);
      };
      fetchData();
  
    }, [idkh]);



    return (
      <div className=" customer-page" style={{paddingLeft:30,paddingRight:30}}>
        <Layout>
          <Sider trigger={null} collapsible >
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
              <Avatar size={40}>USER</Avatar>
            </div>
            <Menu mode="inline" defaultSelectedKeys={["1"]} style={{fontWeight:'bold'}}>
              <Menu.Item key="1" icon={<UserOutlined />}>
                <Link to="/account/customerInfo">Tài khoản của tôi</Link>
              </Menu.Item>

              <Menu.Item key="2" icon={<ShopOutlined />}>
                <Link to="/account/customerOrder">Hóa đơn của tôi</Link>
              </Menu.Item>

              <Menu.Item key="3" icon={<SettingOutlined />}>
                <Link to="/account/changeAddress">Sổ địa chỉ</Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }}>
            <Descriptions title="Quản lý tài khoản" style={{  marginLeft:24, paddingTop:14}}/>
            </Header>
            <Content
              className="site-layout-background"
              style={{
                margin: "15px 12px",
                padding: 24,
                minHeight: 400,
              }}
            >
              
                <Switch>
                  <Route
                    path="/account/customerInfo"
                    
                  ><CustomerInfo /></Route>
                   <Route
                    path="/account/customerInfoEdit" 
                  ><CustomerInfoEdit info={info}/></Route>
                  <Route
                    path="/account/customerOrder"
                    
                  ><CustomerOrder/></Route>
                  <Route
                    path="/account/customerOrder/info"
                    component={CustomerOrderInfo}
                  />
                  <Route
                    path="/account/changeAddress"
                    
                  ><ChangeAddress info={info}/></Route>
                  <Route
                    path="/account/mail"
                    
                  ><Mail/></Route>
                    <Route
                    path="/account/pass"
                    
                  ><ChangePass/></Route>
                </Switch>
             
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }


export default CustomerPage;
