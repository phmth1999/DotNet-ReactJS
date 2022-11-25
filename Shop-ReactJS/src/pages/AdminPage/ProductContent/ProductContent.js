import React, { useState, useEffect } from "react";
import axios from "axios";
import SweetAlert from "sweetalert-react";
import "./../../../../node_modules/sweetalert/dist/sweetalert.css";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import { Modal, Upload, message, Input, Drawer, Descriptions, Row } from "antd";
import { DataTable } from "./DataTable";
import { Pagination } from "./Pagination";
import { Addproduct } from "../Addpage/Addproduct";

const { Search } = Input;
function beforeUpload(file) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
}
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}
const ProductContent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      // this.setState({ loading: true });
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(
        info.file.originFileObj,

        (imageUrl) => setImageUrl(imageUrl),
        // (imageUrl) => setdataUpdate([
        //   ...dataUpdate,
        //   {hinhanh: imageUrl}
        // ]),
        setLoading(false)
      );
    }
  };

  const [currentSort,setCurrentSort] = useState('default')
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
  const [dataDeleteQuanlity, setDataDeleteQuanlity]= useState([])
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`https://localhost:44315/api/sanphams`);
      setData(res.data);
    };
    fetchData();
  }, []);
  // current Data
  const end = currentPage * dataPerPage;
  const begin = end - dataPerPage;

  //change page number
  const paginate = (pageNumber) => setcurrentPage(pageNumber);
  //edit product
  // event Change value input field
  const onChangData = (e) => {
    setdataUpdate({
      ...dataUpdate,
      [e.target.name]: e.target.value,
    });
  };

  const onEdit = (dataEdit) => {
    console.log(dataEdit);
    setVisible(true);
    setdataUpdate(dataEdit);
    setImageUrl(dataEdit.hinhanh);
  };
  //delete product
  const onDeleteProduct = () => {
    console.log(dataDeleteQuanlity.idsp)
    setShowAlert(false);
    const key = "add";
    message.loading({
      content: "Xóa sản phẩm......",
      key,
      style: {
        marginTop: "14vh",
        fontSize: "17px",
      },
    });
    setTimeout(() => {
      let dataIndex = data.findIndex((x) => x.idsp === dataDeleteQuanlity.idsp);
      if (dataIndex !== -1) {
        data[dataIndex].sl = 0;
      }
      message.success({
        content: "Sản phẩm ngừng kinh doanh !",
        key,
        duration: 2,
        style: {
          marginTop: "15vh",
          fontSize: "17px",
        },
      });
      axios.put(`https://localhost:44315/api/sanphams/${dataDeleteQuanlity.idsp}`,dataDeleteQuanlity).then(res => {
        message.success({ content: 'Sản phẩm ngừng kinh doanh !', key, duration: 2, style: {
            marginTop: '15vh', fontSize:"17px"
          }, });
      })
      window.location.reload()
    }, 1000);
  };

  const onDelete = (dataEdit) => {
    setShowAlert(true);
    setTextAlert(dataEdit.tensp)
    setDataDeleteQuanlity({...dataEdit,sl:0})
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="ant-upload-text">Upload</div>
    </div>
  );
  // edit
  const handleEdit = () => {
    setconfirmLoading(true);
    let dataIndex = data.findIndex((x) => x.idsp === dataUpdate.idsp);
    if (dataIndex !== -1) {
      data[dataIndex].tensp = dataUpdate.tensp;
      data[dataIndex].gia = dataUpdate.gia;
      data[dataIndex].sl = dataUpdate.sl;
      data[dataIndex].hinhanh = imageUrl;
    }
    const key = "add";
    message.loading({
      content: "Chỉnh sửa thông tin sản phẩm......",
      key,
      style: {
        marginTop: "14vh",
        fontSize: "15px",
      },
    });
    setTimeout(() => {
      setconfirmLoading(false);
      setVisible(false);
      axios
        .put(
          `https://localhost:44315/api/sanphams/${dataUpdate.idsp}`,
          dataUpdate
        )
        .then((res) => {
          message.success({
            content: "Chỉnh sửa thành công !",
            key,
            duration: 2,
            style: {
              marginTop: "15vh",
              fontSize: "15px",
            },
          });
        });
    }, 2000);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  // search
const requestSort = () => {
		let nextSort;
		if (currentSort === 'down') nextSort = 'up';
		else if (currentSort === 'up') nextSort = 'default';
		else if (currentSort === 'default') nextSort = 'down';

  setCurrentSort(nextSort)
  setData([...data].sort(sortTypes[currentSort].fn))
  };
  const requestSortID = () => {
    let nextSort;
		if (currentSort === 'down') nextSort = 'up';
		else if (currentSort === 'up') nextSort = 'default';
		else if (currentSort === 'default') nextSort = 'down';

  setCurrentSort(nextSort)
  setData([...data].sort(sortTypesID[currentSort].fn))
  }
  const sortTypes = {
    up: {
      class: 'sort-up',
      fn: (a, b) => a.gia - b.gia
    },
    down: {
      class: 'sort-down',
      fn: (a, b) => b.gia - a.gia
    },
    default: {
      class: 'sort',
      fn: (a, b) => a
    }
  };
  const sortTypesID = {
    up: {
      class: 'sort-up',
      fn: (a, b) => a.idsp - b.idsp
    },
    down: {
      class: 'sort-down',
      fn: (a, b) => b.idsp - a.idsp
    },
    default: {
      class: 'sort',
      fn: (a, b) => a
    }
  };

  // console.log(searchValue);
  const filterDataSearch = data.filter((filterData) => {
    return filterData.tensp.toLowerCase().includes(searchValue.toLowerCase()),
    filterData.gia.toString().includes(searchValue)
  });
  const onView = (itemView) => {
    setOpenView(true);
    setDataView(itemView);
  };
  const onCloseView = () => {
    setOpenView(false);
  };
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
        {/* <Button type="primary">
          Add
        </Button> */}
        <Addproduct />
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
            requestSortID={requestSortID}
           
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
            requestSortID={requestSortID}
          
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
        title="Bạn có muốn xóa sản phẩm"
        text={textAlert}
        showCancelButton
        onOutsideClick={() => setShowAlert(false)}
        onEscapeKey={() => setShowAlert(false)}
        onCancel={() => setShowAlert(false)}
        onConfirm={() => onDeleteProduct()}
      />
      {/* Modal edit */}
      <Modal
        title="Sửa sản phẩm"
        visible={visible}
        onOk={handleEdit}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <form>
          <div>
            <Descriptions
              title="Chỉnh sửa thông tin sản phẩm"
              layout="vertical"
              size="middle"
            >
              <Descriptions.Item label="Tên sản phẩm" style={{ width: 400 }}>
                <input
                  style={{ width: 350 }}
                  type="text"
                  className="form-control"
                  name="tensp"
                  onChange={onChangData}
                  value={dataUpdate.tensp}
                />
              </Descriptions.Item>

              <Descriptions.Item label="Hình ảnh">
                <Upload
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  beforeUpload={beforeUpload}
                  onChange={handleChange}
                >
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="avatar"
                      style={{ width: "100%" }}
                    />
                  ) : (
                    uploadButton
                  )}
                </Upload>
              </Descriptions.Item>
              <br />
              <Descriptions.Item label="Giá">
                <input
                  type="text"
                  className="form-control"
                  name="gia"
                  onChange={onChangData}
                  value={dataUpdate.gia}
                />{" "}
                <p
                  style={{ fontWeight: "bold", color: "black", marginLeft: 10 }}
                >
                  {" "}
                  VND{" "}
                </p>
              </Descriptions.Item>
              <Descriptions.Item label="Số lượng">
                <input
                  type="text"
                  className="form-control"
                  name="sl"
                  onChange={onChangData}
                  value={dataUpdate.sl}
                />
              </Descriptions.Item>
            </Descriptions>
          </div>
        </form>
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
          title="Thông tin sản phẩm"
          layout="vertical"
          bordered
          size="small"
        >
          <Descriptions.Item label="Tên sản phẩm">
            {dataView.tensp}
          </Descriptions.Item>
          <Descriptions.Item label="Hình ảnh">
            <img
              src={dataView.hinhanh}
              alt={dataView.tensp}
              style={{ width: 80, height: 100 }}
            />
          </Descriptions.Item>
          <Descriptions.Item label="Giá">{dataView.gia}</Descriptions.Item>
          <Descriptions.Item label="Mô tả">{dataView.mota}</Descriptions.Item>
          <Descriptions.Item label="Màu sắc">
            {dataView.mausac}
          </Descriptions.Item>
          <Descriptions.Item label="Màn hình">
            {dataView.manhinh}
          </Descriptions.Item>
          <Descriptions.Item label="Hệ điều hành">
            {dataView.hedieuhanh}
          </Descriptions.Item>
          <Descriptions.Item label="Camera">
            {dataView.camera}
          </Descriptions.Item>
          <Descriptions.Item label="Cấu hình">
            {dataView.cauhinh}
          </Descriptions.Item>
          <Descriptions.Item label="Pin">{dataView.pin}</Descriptions.Item>

          {dataView.sl == 0 ? (
            <Descriptions.Item label="Trạng thái">
              {" "}
              Ngừng kinh doanh{" "}
            </Descriptions.Item>
          ) : (
            <Descriptions.Item label="Trạng thái">
              {" "}
              Còn hàng: {dataView.sl} sản phẩm{" "}
            </Descriptions.Item>
          )}
        </Descriptions>
      </Drawer>
    </div>
  );
};

export default ProductContent;
