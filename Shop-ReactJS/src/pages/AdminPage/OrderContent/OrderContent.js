import React, { useState, useEffect } from "react";
import axios from "axios";
import SweetAlert from "sweetalert-react";
import "./../../../../node_modules/sweetalert/dist/sweetalert.css";

import {
  Modal,
  Divider,
  message,
  Input,
  Drawer,
  Descriptions,
  Row,
  DatePicker,
  Radio,
  Form,
  Col,
  Button,
  Select,
} from "antd";
import { DataTable } from "./DataTable";
import { Pagination } from "./Pagination";
import moment from "moment";
import { Adduser } from "./../Addpage/Adduser";
import { sortBy } from "lodash";
const { Search } = Input;
const { Option } = Select;
const ProductContent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [dataUpdate, setdataUpdate] = useState([]);
  const [searchValue, setsearchValue] = useState("");
  const [visible, setVisible] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [confirmLoading, setconfirmLoading] = useState(false);
  const [currentPage, setcurrentPage] = useState([1]);
  const [dataPerPage] = useState([5]);
  const [dataView, setDataView] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [textAlert, setTextAlert] = useState("");
  const [dataInfo, setDataInfo] = useState([]);
  const [listDetail, setListDetail] = useState([]);
  const [content, setContent] = useState("");
  const [currentSort,setCurrentSort] = useState('default')
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`https://localhost:44315/api/hoadons`);
      setData(res.data);
    };
    fetchData();
  }, []);
  // current Data
  const end = currentPage * dataPerPage;
  const begin = end - dataPerPage;

  //change page number
  const paginate = (pageNumber) => setcurrentPage(pageNumber);

  const onEdit = (dataEdit) => {
    setVisible(true);
    setdataUpdate(dataEdit);
  };
  const onDelete = (dataEdit) => {
    setShowAlert(true);
    setTextAlert(`Hóa đơn : ${dataEdit.idhd}`);
    {
      dataEdit.tinhtrang !== "Hủy"
        ? setTitle("Bạn có muốn hủy hóa đơn")
        : setTitle("Kiểm duyệt hóa đơn");
    }

    {
      dataEdit.tinhtrang == "Hủy"
        ? setdataUpdate({ ...dataEdit, tinhtrang: "Đóng gói" })
        : setdataUpdate({ ...dataEdit, tinhtrang: "Hủy" });
    }
  };
  //delete product
  const onConfirm = () => {
    setShowAlert(false);

    const key = "add";
    {
      dataUpdate.tinhtrang == "Hủy"
        ? message.loading({
            content: "Hủy hóa đơn ....",
            key,
            style: {
              marginTop: "14vh",
              fontSize: "15px",
            },
          })
        : message.loading({
            content: "Kiểm duyệt ....",
            key,
            style: {
              marginTop: "14vh",
              fontSize: "15px",
            },
          });
    }

    setTimeout(() => {
      axios
        .put(
          `https://localhost:44315/api/hoadons/${dataUpdate.idhd}`,
          dataUpdate
        )
        .then((res) => {
          message.success({
            content: "Thành công !!!",
            key,
            duration: 2,
            style: {
              marginTop: "15vh",
              fontSize: "15px",
            },
          });
        });
      setVisible(false);
      window.location.reload();
    }, 3000);
  };


  const onView = (itemView) => {
    console.log(itemView);
    setOpenView(true);
    setDataView(itemView);
    setListDetail(itemView.chitiethoadons);
    axios
      .get(`https://localhost:44315/api/taikhoans/${itemView.idkh}`)
      .then((res) => {
        setDataInfo(res.data);
      });
  };
  const onCloseView = () => {
    setOpenView(false);
  };
  const handleEdit = () => {
    setconfirmLoading(true);
    console.log(dataUpdate);
    const key = "add";
    message.loading({
      content: "Cập nhật thông tin ....",
      key,
      style: {
        marginTop: "14vh",
        fontSize: "15px",
      },
    });
    setTimeout(() => {
      axios
        .put(
          `https://localhost:44315/api/hoadons/${dataUpdate.idhd}`,
          dataUpdate
        )
        .then((res) => {
          message.success({
            content: "Thành công !!!",
            key,
            duration: 2,
            style: {
              marginTop: "15vh",
              fontSize: "15px",
            },
          });
        });
      setVisible(false);
      window.location.reload();
    }, 3000);
  };
  const handleCancel = () => {
    setVisible(false);
  };
  const onFinish = (values) => {
    console.log(values);

    const key = "add";
    message.loading({
      content: "Kiểm tra thông tin ....",
      key,
      style: {
        marginTop: "14vh",
        fontSize: "17px",
      },
    });
    setTimeout(() => {
      setdataUpdate({
        ...dataUpdate,
        diachi: values.diachi,
        tinhtrang: values.tinhtrang,
        ngay: values.ngay,
        tonggia: values.tonggia,
      });
      message.success({
        content: "Kiểm tra thành công !!!",
        key,
        duration: 2,
        style: {
          marginTop: "15vh",
          fontSize: "17px",
        },
      });
    }, 1000);
  };
  const onClose = () => {
    setVisible(false);
  };

  console.log(data);

  const requestSort = () => {
		let nextSort;
		if (currentSort === 'down') nextSort = 'up';
		else if (currentSort === 'up') nextSort = 'down';
		else if (currentSort === 'default') nextSort = 'down';

  setCurrentSort(nextSort)
  setData([...data].sort(sortTypes[currentSort].fn))
	};
  const sortTypes = {
    up: {
      class: 'sort-up',
      fn: (a, b) => a.idhd - b.idhd
    },
    down: {
      class: 'sort-down',
      fn: (a, b) => b.idhd - a.idhd
    },
    default: {
      class: 'sort',
      fn: (a, b) => a
    }
  };
  const filterDataSearch = data.filter((filterData) => {
    return (
      filterData.ngay.toLowerCase().includes(searchValue.toLowerCase()),
      filterData.diachi.toLowerCase().includes(searchValue.toLowerCase()),
      filterData.tinhtrang.toLowerCase().includes(searchValue.toLowerCase())
    );
  });
  // [...data].sort(sortTypes[currentSort].fn)
  // render
  return (
    <div>
      <div
        className="content-header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: 10,
        }}
      >
        {/* <Adduser /> */}
        <Search
          placeholder="Search sản phẩm..."
          onSearch={(value) => setsearchValue(value)}
          style={{ width: 300 }}
        />
      </div>
      {searchValue !== "" ? (
        <>
          <DataTable
            data={filterDataSearch.slice(begin, end)}
            onEdit={onEdit}
            onDelete={onDelete}
            onView={onView}
            requestSort={requestSort}
           
          />
          <Pagination
            dataPerPage={dataPerPage}
            totalData={filterDataSearch.length}
            paginate={paginate}
          />
        </>
      ) : (
        <>
          <DataTable
            data={data.slice(begin, end)}
            onEdit={onEdit}
            onDelete={onDelete}
            onView={onView}
            requestSort={requestSort}
           
          />
          <Pagination
            dataPerPage={dataPerPage}
            totalData={data.length}
            paginate={paginate}
          />
        </>
      )}
      {/* alert delete */}
      <SweetAlert
        show={showAlert}
        title={title}
        text={textAlert}
        showCancelButton
        onOutsideClick={() => setShowAlert(false)}
        onEscapeKey={() => setShowAlert(false)}
        onCancel={() => setShowAlert(false)}
        onConfirm={onConfirm}
      />
      {/* Modal edit */}
      <Modal
        title="Sửa thông tin hóa đơn"
        visible={visible}
        onOk={handleEdit}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form
          layout="vertical"
          hideRequiredMark
          onFinish={onFinish}
          initialValues={{
            diachi: dataUpdate.diachi,
            ngay: dataUpdate.ngay,
            tonggia: dataUpdate.tonggia,
            tinhtrang: dataUpdate.tinhtrang,
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="diachi"
                label="Địa chỉ nhận hàng"
                rules={[
                  {
                    required: true,
                    message: "Địa chỉ không được để trống!",
                  },
                ]}
              >
                <Input placeholder="Địa chỉ nhận hàng" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="tinhtrang"
                label="Tình trạng hóa đơn "
                rules={[
                  { required: true, message: "Chọn tình trạng đơn hàng" },
                ]}
              >
                <Select placeholder="Tình trạng đơn hàng">
                  <Option value="Chưa kiểm duyệt">Chưa kiểm duyệt</Option>
                  <Option value="Đóng gói">Đóng gói</Option>
                  <Option value="Vận chuyển">Vận chuyển</Option>
                  <Option value="Đã nhận">Đã nhận</Option>
                  <Option value="Hủy">Đã hủy</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="ngay"
                label="Ngày thanh toán"
                rules={[
                  {
                    required: true,
                    message: "Ngày thanh toán không được để trống!",
                  },
                ]}
              >
                <Input placeholder="Ngày thanh toán : DD-MM-YY" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="tonggia"
                label="Tổng tiền hóa đơn"
                rules={[{ required: true, message: "Không được bỏ trống" }]}
              >
                <Input placeholder="Tổng tiền" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item>
                <Button htmlType="submit">Kiểm tra thông tin</Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
      {/* view  */}
      <Drawer
        width={800}
        title="Basic Drawer"
        placement="right"
        closable={false}
        onClose={onCloseView}
        visible={openView}
      >
        <Descriptions
          title="Thông tin hóa đơn"
          layout="vertical"
          bordered
          size="small"
        >
          <Descriptions.Item label="Khách hàng">
            {dataInfo.hoten}
          </Descriptions.Item>
          <Descriptions.Item label="Địa chỉ nhận hàng">
            {dataView.diachi}
          </Descriptions.Item>
          <Descriptions.Item label="Số điện thoại khách hàng">
            {dataInfo.sdt}
          </Descriptions.Item>
          <Descriptions.Item label="Email khách hàng">
            {dataInfo.email}
          </Descriptions.Item>

          {dataView.tinhtrang == "Hủy" ? (
            <Descriptions.Item label="Tình trạng">
              <p style={{ color: "red" }}> {dataView.tinhtrang} </p>
            </Descriptions.Item>
          ) : (
            <Descriptions.Item label="Tình trạng">
              <p style={{ color: "green" }}> {dataView.tinhtrang} </p>
            </Descriptions.Item>
          )}
        </Descriptions>
        <br />
        <Divider
          style={{
            color: "black",
            fontSize: 15,
            fontWeight: "bold",
          }}
        >
          Chi tiết hóa đơn
        </Divider>
        <table className="table table-hover table-bordered">
          <thead style={{ textAlign: "center" }}>
            <tr>
              <th>Tên sản phẩm</th>
              <th>Hình ảnh</th>
              <th>Giá</th>
              <th>Số lượng</th>
            </tr>
          </thead>
          <tbody>
            {listDetail.map((item, index) => (
              <tr key={index}>
                <td> {item.tensp} </td>
                <td style={{ width: 110, textAlign: "center" }}>
                  {" "}
                  <img
                    src={item.hinhanh}
                    alt=""
                    style={{ width: 100, height: 110 }}
                  />{" "}
                </td>
                <td> {item.gia}</td>
                <td>{item.quanlity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Drawer>
    </div>
  );
};

export default ProductContent;
