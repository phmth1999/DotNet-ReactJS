import React, { Component } from 'react';
import {  Form,Row,Col,Input,Card,Button,Descriptions,message } from 'antd';
import { Link,useHistory } from 'react-router-dom';
import { useState } from 'react';
import axios from "axios";

export const Mail = () => {
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
            localStorage.setItem('TK',JSON.stringify(res.data.user))
            history.push("/account/pass")
          }
        });
    }, 5000);
  };
  return (
    <div>
      <Card
        title="Xác nhận Email"
        className="scale-card"
        style={{ width: "100%" }}
      >
        <Form
          // style={{ marginTop: 40 }}
          layout="vertical"
          hideRequiredMark
          onFinish={onFinish}
        >
          <Row gutter={16}>
            <Col span={12}>
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
                <Link to="/account/customerInfo">
                  <Button style={{ marginRight: 8 }}>Thoát</Button>
                </Link>
                <Button type="primary" htmlType="submit">
                  Nhận mã xác thực qua Email
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
};
