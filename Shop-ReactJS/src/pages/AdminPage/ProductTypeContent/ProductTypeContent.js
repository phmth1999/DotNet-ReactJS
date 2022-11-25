import React, { useState, useEffect } from "react";
import axios from "axios";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import { Modal, Upload, message, Input, Drawer, Descriptions, Row, Divider } from "antd";
import { DataTable } from "./DataTable";

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
const ProductTypeContent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [dataUpdate, setdataUpdate] = useState([]);
  const [searchValue, setsearchValue] = useState("");
  const [visible, setVisible] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [confirmLoading, setconfirmLoading] = useState(false);
  const [dataView, setDataView] = useState([]);
  const [listDatasp,setListDatasp] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`https://localhost:44315/api/thuonghieux`);
      setData(res.data);
    //   console.log(res.data)
    
    };
    fetchData();
  }, []);
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
        
        setLoading(false)
      );
    }
  };
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
    setImageUrl(dataEdit.logo);
  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="ant-upload-text">Upload</div>
    </div>
  );
  const handleEdit = () => {
    setconfirmLoading(true);
    let dataIndex = data.findIndex((x) => x.idth === dataUpdate.idth);
    if (dataIndex !== -1) {
      data[dataIndex].tenth = dataUpdate.tenth;
      data[dataIndex].mota = dataUpdate.mota;
      data[dataIndex].logo = imageUrl;
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
          `https://localhost:44315/api/thuonghieux/${dataUpdate.idth}`,
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
  const filterDataSearch = data.filter((filterData) => {
    return filterData.tenth.toLowerCase().includes(searchValue.toLowerCase());
  });
  const onView = (itemView) => {
    setOpenView(true);
    setDataView(itemView);
    
    setListDatasp(itemView.sanphams)
  };
  const onCloseView = () => {
    setOpenView(false);
  };
  
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
        <Search
          placeholder="Search sản phẩm..."
          onSearch={(value) => setsearchValue(value)}
          style={{ width: 300 }}
        />
      </div>

      {searchValue !== "" ? (
        <DataTable data={filterDataSearch} onEdit={onEdit} onView={onView} />
      ) : (
        <DataTable data={data} onEdit={onEdit} onView={onView} />
      )}
      <Modal
        title="Sửa thương hiệu"
        visible={visible}
        onOk={handleEdit}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <form>
          <div>
            <Descriptions
              title="Chỉnh sửa thông tin thương hiệu"
              layout="vertical"
              size="middle"
            >
              <Descriptions.Item label="Tên thương hiệu" style={{ width: 400 }}>
                <input
                  style={{ width: 350 }}
                  type="text"
                  className="form-control"
                  name="tenth"
                  onChange={onChangData}
                  value={dataUpdate.tenth}
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
              <Descriptions.Item label="Mô tả">
                <textarea
                style={{width:500,height:160}}
                  type="text"
                  className="form-control"
                  name="mota"
                  onChange={onChangData}
                  value={dataUpdate.mota}
                />
              </Descriptions.Item>
            </Descriptions>
          </div>
        </form>
      </Modal>
      {/* view  */}
      <Drawer
        width={800}
        height={500}
        title="Basic Drawer"
        placement="right"
        closable={false}
        onClose={onCloseView}
        visible={openView}
      >
        <Descriptions
          title="Thông tin chi tiết"
          layout="vertical"
          bordered
          size="small"
        >
          <Descriptions.Item label="Tên thương hiệu">
            {dataView.tenth}
          </Descriptions.Item>
          <Descriptions.Item label="Logo thương thiệu">
            <img
              src={dataView.logo}
              alt={dataView.tenth}
              style={{ width: 80, height: 100 }}
            />
          </Descriptions.Item>
          <Descriptions.Item label="Mô tả">{dataView.mota}</Descriptions.Item>
          </Descriptions>
          <br/>
         <Divider
            style={{
              color: "black",
              fontSize: 15,
              fontWeight: "bold",
            }}
          >
            Danh sách sản phẩm
          </Divider>
          <table className="table table-hover table-bordered" >
              <thead style={{textAlign:'center'}}>
                    <tr >
                        <th>Tên sản phẩm</th>
                        <th>Hình ảnh</th> 
                        <th>Giá</th> 
                        <th>Môtả</th> 
                    </tr>
                    </thead>
                <tbody>
                    {listDatasp.map((item,index)=>(
                        <tr key={index}>
                            <td> {item.tensp} </td>
                            <td style={{width:110,textAlign:'center'}}> <img src={item.hinhanh} alt="" style={{width:100,height:110}}/> </td>
                            <td> {item.gia}</td>
                            <td> 
                                <span style={{display:"block"}}> - Màu: {item.mausac}</span>
                                <span style={{display:"block"}}> - Màn hình: {item.manhinh}</span>
                                <span style={{display:"block"}}> - Hệ điều hành: {item.hedieuhanh}</span>
                            </td>
                        </tr>
                    )
                    )}
                </tbody>
            </table>

         
        
      </Drawer>
    </div>
  );
};
export default ProductTypeContent;
