import React, { Component } from "react";

import {  Form,Row,Col,Input,Card,Button,Descriptions,message } from 'antd';
import { Link,useHistory } from 'react-router-dom';
import { useState } from 'react';
import axios from "axios";

const CheckMail =()=>  {
    const history = useHistory();

    const onFinish = (values) => {
        const key = "add";
        message.loading({
          content: "Kiểm tra email......",
          key,
          style: {
            marginTop: "14vh",
            fontSize: "15px",
          },
        });
        setTimeout(() => {
          axios
            .post(`https://localhost:44315/api/taikhoans/quenpass`, values)
            .then((res) => {
              
              if (res.data == '') {
                message.error({
                  content: "Email bạn nhập không đúng !",
                  key,
                  duration: 2,
                  style: {
                    marginTop: "15vh",
                    fontSize: "17px",
                  },
                })
              } else {
                message.success({
                  content: "Vào mail để lấy mã xác nhận ^ ^ ",
                  key,
                  duration: 2,
                  style: {
                    marginTop: "15vh",
                    fontSize: "17px",
                  },
                })
                console.log(res.data.a)
                console.log(res.data.user)
                localStorage.setItem('MAXN',JSON.stringify(res.data.a))
                localStorage.setItem('MAIL',JSON.stringify(values))
                history.push("/forgetpass")
              }
            });
        }, 5000);
      };
    return (
      <div
        className="container loginpage"
       
      >
        <div className="d-flex justify-content-center h-100">
        <Card
        title="Xác nhận Email"
        className="scale-card"
        style={{ width: 400,marginTop:100,height:250 }}
      >
        <Form
          // style={{ marginTop: 40 }}
          layout="vertical"
          hideRequiredMark
          onFinish={onFinish}
        >
          <Row gutter={16}>
            <Col span={19}>
              <Form.Item
                name="email"
                label="Nhập email"
                rules={[
                  {
                    required: true,
                    message: "Email không được để trống!",
                  },
                ]}
              >
                <Input placeholder="Email" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item>
                <Link to="/login">
                  <Button style={{ marginRight: 8 }}>Quay lại</Button>
                </Link>
                <Button type="primary" htmlType="submit">
                  Nhận mã xác thực
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
        </div>
      </div>
    );
  }


export default CheckMail;

