import React, { useState, useEffect } from "react";
import {
  Drawer,
  Form,
  Button,
  Col,
  Row,
  Input,
  Select,
  DatePicker,
  message,
  Upload,
} from "antd";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import axios from "axios";
import _ from "lodash";
const { Option } = Select;

export const Adduser = () => {
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
   const onSave = () => {
//     setVisible(false);
   
    // const key = "add";
    // message.loading({
    //   content: "Thêm mới tài khoản......",
    //   key,
    //   style: {
    //     marginTop: "14vh",
    //     fontSize: "20px",
    //   },
    // });
    // setTimeout(() => {
    //     axios.post(`https://localhost:44315/api/taikhoans`,data).then(res => { 
    //         console.log(res.data)
    //         message.success({ content: 'Thêm thành công !', key, duration: 2, style: {
    //             marginTop: '15vh', fontSize:"20px"
    //           }, });
    //       }).catch (message.success({ content: 'Thêm thất bại !', key, duration: 2, style: {
    //         marginTop: '15vh', fontSize:"20px"
    //       }, }))
    //    }, 1000);
 };
  const onFinish = (values) => {
    console.log(values);
   
   
    const key = "add";
    message.loading({
      content: "Thêm mới tài khoản......",
      key,
      style: {
        marginTop: "14vh",
        fontSize: "20px",
      },
    });
    setTimeout(() => {
      axios.post(`https://localhost:44315/api/taikhoans`, values).then(res => {     
        setVisible(false);
            message.success({ content: 'Thêm thành công !', key, duration: 2, style: {
                marginTop: '15vh', fontSize:"20px"
              }, });
          }).catch (message.success({ content: 'Thêm thất bại !', key, duration: 2, style: {
            marginTop: '15vh', fontSize:"20px"
          }, }))
       }, 1000);
  };
  return (
   
    <>
      <Button type="primary" onClick={showDrawer}>
        <PlusOutlined /> Thêm tài khoản
      </Button>
      <Drawer
        title="Tạo tài khoản mới"
        width={720}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 0 }}
        footer={
          <Button onClick={onSave} type="primary" style={{ float: "right" }}>
            Tạo tài khoản mới
          </Button>
        }
      >
        <Form layout="vertical" hideRequiredMark onFinish={onFinish}>
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
                <Input placeholder="Username" />
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
                <Input placeholder="Password" />
              </Form.Item>
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
            <Col span={12}>
              <Form.Item
                name="roles"
                label="Đặc quyền"
                rules={[
                  { required: true, message: "Đặc quyền không được để trống" },
                ]}
              >
                <Select placeholder="">
                  <Option value="1">Quản trị viên</Option>
                  <Option value="0">Khách hàng</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Col span={12}>
            <Form.Item
              name="status"
              label="Trạng thái"
              rules={[{ required: true, message: "" }]}
            >
              <Select placeholder="Trạng thái">
                <Option value="1">Kích hoạt</Option>
                <Option value="0">Vô hiệu hóa</Option>
              </Select>
            </Form.Item>
          </Col>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item>
                <Button onClick={onClose} style={{ marginRight: 8 }}>
                  Thoát
                </Button>
                <Button type="primary" htmlType="submit">
                  Kiểm tra
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

