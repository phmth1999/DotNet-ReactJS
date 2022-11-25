import React,{ useState } from "react";
import { Form, Input, Button, Checkbox, message } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";


export const FormLogin = () => {
  const onFinish = (values) => {
    console.log("Success:", values);

    axios
      .post("https://localhost:44315/api/taikhoans/login", values)
      .then((res) => {
        const key ='login';
       message.loading({ content: 'Kiểm tra thông tin .',key , style: {
        marginTop: '14vh', fontSize:"15px"
      },});
    setTimeout(() => {
      message.success({ content: 'Login thành công !', key, duration: 2, style: {
        marginTop: '14vh', fontSize:"15px"
      }, });
      localStorage.setItem("isLogin", true);
      localStorage.setItem("TOKEN", JSON.stringify(res.data.token));
      localStorage.setItem("ROLE", JSON.stringify(res.data.user.roles));
      localStorage.setItem("NAME", JSON.stringify(res.data.user.hoten));
      localStorage.setItem("IDKH", JSON.stringify(res.data.user.idkh));
      window.location.reload();
    }, 1000);
       
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const layout = {
    labelCol: {
      span: 7,
    },
    wrapperCol: {
      span: 12,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 7,
      span: 12,
    },
  };
  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="pass"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailLayout} valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Link to="/register">
          <span style={{ marginLeft: 30 }}>Tạo tài khoản</span>{" "}
        </Link>
      </Form.Item>
    </Form>
  );
};
