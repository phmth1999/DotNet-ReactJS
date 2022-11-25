import React,{useEffect,useState} from "react";
import { useHistory, Link } from 'react-router-dom';
import {
  Descriptions,
  Divider,
  Button,
  Input,
  DatePicker,
  message,
  Form,
  Row,
  Col,
  Select,
} from "antd";

import axios from "axios";
const { Option } = Select;

const CustomerInfoEdit = ({info}) => {

    const history = useHistory();

  const onFinish = (values) => {
    Object.assign(values, { idkh : info.idkh,
    roles: info.roles, status: info.status
 });
  

    const key = "add";
    message.loading({
      content: "Chỉnh sửa thông tin tài khoản......",
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
            content: "Chỉnh sửa thành công !",
            key,
            duration: 2,
            style: {
              marginTop: "15vh",
              fontSize: "15px",
            },
          });
        }) 
    }, 3000);
  };

  return (
    <div>
      <Descriptions title="Thay đổi thông tin cá nhân" />
      <Form
        layout="vertical"
        hideRequiredMark
        onFinish={onFinish}
        initialValues={{
          username: info.username,
          pass: info.pass,
          hoten: info.hoten,
          diachi: info.diachi,
          email: info.email,
          gioitinh: info.gioitinh,
          ngaysinh: info.ngaysinh,
          cmnd: info.cmnd,
          sdt: info.sdt,
        }}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="username"
              label="Tên đăng nhập"
              rules={[
                {
                  required: true,
                  message: "Tên đăng nhập không được để trống!",
                },
              ]}
            >
              <Input placeholder="Username" disabled />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="pass"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Mật khẩu không được để trống!",
                },
              ]}
            >
              <Input.Password placeholder="Password" disabled />
              
            </Form.Item>
            <Link to="/account/mail" style={{marginTop:-23,position:'absolute'}}>Thay đổi mật khẩu ?</Link>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="hoten"
              label="Họ và tên"
              rules={[{ required: true, message: "" }]}
            >
              <Input placeholder="Họ tên" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="gioitinh"
              label="Giới tính"
              rules={[{ required: true, message: "Chọn giới tính!" }]}
            >
              <Select placeholder="Giới">
                <Option value="Nam">Nam</Option>
                <Option value="Nữ">Nữ</Option>
                <Option value="Khác">Khác...</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="ngaysinh"
              label="Ngày sinh"
              rules={[{ required: true, message: "Điền số ngày sinh" }]}
            >
              <Input placeholder="Ngày sinh : DD-MM-YY" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
            >
              <Input placeholder="Email" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="cmnd"
              label="Chứng minh nhân dân"
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
            >
              <Input placeholder="" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="diachi"
              label="Địa chỉ"
              rules={[
                {
                  required: true,
                  message: "Địa chỉ không được để trống!",
                },
              ]}
            >
              <Input placeholder="Địa chỉ" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="sdt"
              label="Số điện thoại"
              rules={[
                {
                  required: true,
                  message: "Số điện thoại không được để trống!",
                },
              ]}
            >
              <Input placeholder="sdt" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item>
                <Link to="/account/customerInfo">
              <Button style={{ marginRight: 8 }}  size="large">Thoát</Button>
              </Link>
              <Button type="primary" htmlType="submit"  size="large">
                LƯU THAY ĐỔI
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
export default CustomerInfoEdit;
