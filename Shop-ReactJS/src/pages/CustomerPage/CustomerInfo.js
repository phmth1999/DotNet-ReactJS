import React, { useState, useEffect } from "react";
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
  Card,
  Table,
  Collapse,
} from "antd";

import axios from "axios";
import { Link } from "react-router-dom";
import { EyeOutlined } from '@ant-design/icons';

const { Option } = Select;
const { Panel } = Collapse;
const CustomerInfo = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [idkh, setIdkh] = useState(
    JSON.parse(localStorage.getItem("IDKH"))
      ? JSON.parse(localStorage.getItem("IDKH"))
      : 0
  );
  console.log(idkh);
  const [info, setInfo] = useState([]);
  const [hoadon, setHoadon] = useState([]);
  const [chitiethoadon, setChitiethoadon] = useState([]);

  useEffect(() => {
    const id = JSON.parse(localStorage.getItem("IDKH"));
    setIdkh(id);
  }, [idkh]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `https://localhost:44315/api/taikhoans/${idkh}`
      );
      setInfo(res.data);
      setHoadon(res.data.hoadons);
    };
    fetchData();
  }, [idkh]);


  return (
    <div>
      <Row style={{ display: "flex", justifyContent: "space-between" }}>
        <Card
          title="Thông tin tài khoản"
          extra={<Link to="/account/customerInfoEdit">Chỉnh sửa</Link>}
          style={{ width: 270 }}
        >
          <Descriptions size="small">
            <Descriptions.Item>{info.hoten}</Descriptions.Item>
          </Descriptions>
          <Descriptions size="small">
            <Descriptions.Item>{info.email}</Descriptions.Item>
          </Descriptions>
        </Card>
        <Row>
          <Card
            title="Sổ địa chỉ"
            className="scale-card"
            extra={<Link to="/account/changeAddress">Chỉnh sửa</Link>}
            style={{ width: 350 }}
          >
            <Descriptions size="small">
              <Descriptions.Item>Địa chỉ nhận hàng mặc định:</Descriptions.Item>
            </Descriptions>
            <Descriptions size="small">
              <Descriptions.Item style={{ fontWeight: "bolder" }}>
                {info.hoten}
              </Descriptions.Item>
            </Descriptions>
            {info.diachi}
          </Card>
          <Card title="" style={{ width: 370 }}>
            <Descriptions size="small">
              <Descriptions.Item>
                Địa chỉ thanh toán mặc định:
              </Descriptions.Item>
            </Descriptions>
            <Descriptions size="small">
              <Descriptions.Item label="Khách hàng">
                <a style={{ fontWeight: "bold", color: "black" }}>
                  {info.hoten}
                </a>
              </Descriptions.Item>
            </Descriptions>
            <Descriptions size="small">
              <Descriptions.Item label="Số điện thoại">
                {info.sdt}
              </Descriptions.Item>
            </Descriptions>
            <Descriptions size="small">
              <Descriptions.Item label="Địa chỉ">
                {info.diachi}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Row>
      </Row>
      <Card
        title="Đơn hàng gần nhất"
        extra={<Link to="/account/customerOrder">Xem thêm</Link>}
        style={{ width: "100%", marginTop: 10 }}
      >
        <table className="table table-hover" style={{textAlign:'center'}}>
          <thead style={{textAlign:'center'}}>
            <tr>
              <th>Ngày đặt hàng</th>
              <th>Địa chỉ</th>
              <th>Tình trạng đơn hàng</th>
              <th>Tổng tiền</th>
              <th>Chi tiết</th>
            </tr>
          </thead>
          <tbody>
            {[...hoadon].slice(hoadon.length-1,hoadon.length).map((hd,idx)=> (
                <tr key={idx}>
                  <td>{hd.ngay}</td>
                  <td>{hd.diachi}</td>
                  <td>{hd.tinhtrang}</td>
                  <td>{hd.tonggia}</td>
                  <td style={{textAlign:'center'}}>
                    <a style={{fontSize:15,color:'blue'}}><EyeOutlined/></a>
                  </td>
                </tr>
          ))}
            
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default CustomerInfo;
