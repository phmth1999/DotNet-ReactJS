import React, { Component } from 'react';
import {  Form,Row,Col,Input,Card,Button,Descriptions,message } from 'antd';
import { Link,useHistory } from 'react-router-dom';
import { useState } from 'react';
import axios from "axios";
const ChangeAddress = ({info})=> {
    const history = useHistory();
    const [infoUpdate,setInfoUpdate] = useState([])
    const onFinish =(values)=>{
        Object.assign(values, { idkh : info.idkh,
            roles: info.roles, 
            status: info.status, 
            ngaysinh: info.ngaysinh,
            gioitinh: info.gioitinh, 
            sdt:info.sdt,
            username:info.username,
            pass:info.pass,
            email:info.email,
            hoten:info.hoten,
            cmnd:info.cmnd

         });
        //  console.log(values)
        const key = "add";
        message.loading({
          content: "Cập nhật địa chỉ nhận hàng......",
          key,
          style: {
            marginTop: "14vh",
            fontSize: "15px",
          },
        });
        setTimeout(() => {
          axios
            .put(`https://localhost:44315/api/taikhoans/${info.idkh}`, values)
            .then((res) => {
                history.push("/account/customerInfo")
                
              message.success({
                content: "Cập nhật thành công thành công !",
                key,
                duration: 2,
                style: {
                  marginTop: "15vh",
                  fontSize: "17px",
                },
              });
            }) 
        }, 3000);
    }
    
        return (
            <div>
               <Card
            title="Chỉnh sửa địa chỉ nhận hàng"
            className="scale-card"
            style={{ width: '100%' }}
          >
              <Descriptions size="small" >
              <Descriptions.Item>Địa chỉ nhận hàng mặc định:</Descriptions.Item>
            </Descriptions>
            <Descriptions size="small">
              <Descriptions.Item style={{ fontWeight: "bolder" }}>
                {info.hoten}
              </Descriptions.Item>
            </Descriptions>
            {info.diachi}
                  <Form
                  style={{marginTop:40}}
        layout="vertical"
        hideRequiredMark
        onFinish={onFinish}
        initialValues={{
          
          diachi: info.diachi
         
        }}
      >
            <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="diachi"
              label="Nhập địa chỉ mới"
              rules={[
                {
                  required: true,
                  message: "Địa chỉ không được để trống!",
                },
              ]}
            >
              <Input placeholder="Địa chỉ"  />
            </Form.Item>
          </Col>
         
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item>
                <Link to="/account/customerInfo">
              <Button style={{ marginRight: 8 }} >Thoát</Button>
              </Link>
              <Button type="primary" htmlType="submit"  >
                LƯU THAY ĐỔI
              </Button>
            </Form.Item>
          </Col>
        </Row>
        </Form>
          </Card>
            </div>
        );
    }


export default ChangeAddress;