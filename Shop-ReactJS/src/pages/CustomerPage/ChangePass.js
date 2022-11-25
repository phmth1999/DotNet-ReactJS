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

export const ChangePass = () => {
  const [info, setInfo] = useState([]);
  const [ma, setMa] = useState(
    JSON.parse(localStorage.getItem("MAXN"))
      ? JSON.parse(localStorage.getItem("MAXN"))
      : 0
  );
  const history = useHistory();
  useEffect(() => {
    let infotmp = JSON.parse(localStorage.getItem("TK"));
    let ma = JSON.parse(localStorage.getItem("MAXN"));
    setMa(ma);
    setInfo(infotmp);
  }, []);

  const onFinish = (values) => {
    setInfo({
      ...info,
      pass: values.pass,
    })
    console.log(values);
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
           
            message.success({
              content: "Thông tin chính xác ^ ^ ",
              key,
              duration: 2,
              style: {
                marginTop: "15vh",
                fontSize: "17px",
              },
            });
          }
        }
      }
    }, 1000);
    console.log(info);
   
  };
  const onChangePass = () => {
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
        .put(`https://localhost:44315/api/taikhoans/doipass/${info.idkh}`, info)
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
            history.push("/account/mail")
          } else {
            message.success({
              content: `Đổi pass thành công, pass mới : ${info.pass}  ^ ^ `,
              key,
              duration: 2,
              style: {
                marginTop: "16vh",
                fontSize: "17px",
              },
            })
           
            localStorage.removeItem('MAXN')
            localStorage.removeItem('TK')
            history.push("/account/customerInfo")
          }
        });
    }, 5000);
  };

  const layout = {
    labelCol: {
      span: 9,
    },
    wrapperCol: {
      span: 7,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 9,
      span: 14,
    },
  };
  return (
    <div>
      <Card
        title="Đổi mật khẩu mới"
        className="scale-card"
        style={{ width: "100%" }}
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
            <Link to="/account/customerInfo">
              <Button style={{ marginRight: 8 }}>Thoát</Button>
            </Link>
            <Button type="primary" htmlType="submit">
              Kiểm tra mã xác thực
            </Button>
            <br />
            <Button
              type="primary"
              onClick={onChangePass}
              style={{ marginTop: 20 }}
            >
              Cập nhật
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
