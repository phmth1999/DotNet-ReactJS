import React, { Component } from "react";
import {
  Form,
  Row,
  Col,
  Input,
  Card,
  Button,
  Descriptions,
  message,
} from "antd";
import { Link, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { values } from 'lodash';

export const ForgetPass = () => {
  const [email,setEmail] = useState( JSON.parse(localStorage.getItem("MAIL"))
  ? JSON.parse(localStorage.getItem("MAIL"))
  : [])
  const [ma, setMa] = useState(
    JSON.parse(localStorage.getItem("MAXN"))
      ? JSON.parse(localStorage.getItem("MAXN"))
      : 0
  );
  const history = useHistory();
  useEffect(() => {
   let email = JSON.parse(localStorage.getItem("MAIL"))
    let ma = JSON.parse(localStorage.getItem("MAXN"));
    setMa(ma);
    setEmail(email)
   
  }, []);

  const onFinish = (values) => {
    console.log(values);
    console.log(email.email)
    const key = "add";
    message.loading({
      content: "Kiểm tra......",
      key,
      style: {
        marginTop: "14vh",
        fontSize: "15px",
      },
    });
    setTimeout(() => {
      if (values.pass != values.passconfirm && values.maxacnhan != ma) {
        message.error({
          content: "Sai mã xác nhận và pass không giống nhau !",
          key,
          duration: 2,
          style: {
            marginTop: "16vh",
            fontSize: "17px",
          },
        });
      } else {
        if (values.pass != values.passconfirm) {
          message.error({
            content: "Pass nhập không giống nhau !",
            key,
            duration: 2,
            style: {
              marginTop: "16vh",
              fontSize: "17px",
            },
          });
        } else {
          if (values.maxacnhan != ma) {
            message.error({
              content: "Sai mã xác nhận !",
              key,
              duration: 2,
              style: {
                marginTop: "16vh",
                fontSize: "17px",
              },
            });
          } else {
            axios
            .post(`https://localhost:44315/api/taikhoans/forgetpass`, {
              pass: values.pass,
              email: email.email
            })
            .then((res) => {
              if (res.data == false) {
                message.error({
                  content: "Thất bại !",
                  key,
                  duration: 2,
                  style: {
                    marginTop: "16vh",
                    fontSize: "17px",
                  }
                })
                history.push("/checkmail")
              } else {
                message.success({
                  content: `Đổi pass thành công, pass mới : ${values.pass}  ^ ^ `,
                  key,
                  duration: 2,
                  style: {
                    marginTop: "16vh",
                    fontSize: "17px",
                  },
                })
                axios.post("https://localhost:44315/api/logs", {
                  idkh: '',
                  message: 'Change pass',
                  ip:'1.127.134.4',
                  date: Date()
              })
                localStorage.removeItem('MAXN')
                history.push("/login")
              }
            });
          }
        }
      }
    }, 1000);

   
  };
 

  const layout = {
    labelCol: {
      span: 9,
    },
    wrapperCol: {
      span: 13,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 9,
      span: 14,
    },
  };
  return (
    <div
    className="container loginpage"
   
  >
      <div className="d-flex justify-content-center h-100">
      <Card
        title="Đổi mật khẩu mới"
        className="scale-card"
        style={{ width: 550,marginTop:100,height:400 }}
      >
        <Form {...layout} hideRequiredMark onFinish={onFinish}>
          <Form.Item
            name="pass"
            label="Nhập passwork mới"
            rules={[
              {
                required: true,
                message: "Passwork không được để trống!",
              },
            ]}
          >
            <Input.Password placeholder="Password mới" />
          </Form.Item>

          <Form.Item
            name="passconfirm"
            label="Nhập lại passwork mới"
            rules={[
              {
                required: true,
                message: "Passwork không được để trống!",
              },
            ]}
          >
            <Input.Password placeholder="Nhập lại password" />
          </Form.Item>

          <Form.Item
            name="maxacnhan"
            label="Nhập mã xác nhận"
            rules={[
              {
                required: true,
                message: "Mã không được để trống!",
              },
            ]}
          >
            <Input placeholder="Mã xác nhận" />
          </Form.Item>

          <Link to="/account/mail"></Link>

          <Form.Item {...tailLayout}>
            <Link to="/login">
              <Button style={{ marginRight: 8 }}>Thoát</Button>
            </Link>
            <Button type="primary" htmlType="submit">
              Xác nhận
            </Button>
            <br />
          </Form.Item>
        </Form>
      </Card>
      </div>
    </div>
  );
};

