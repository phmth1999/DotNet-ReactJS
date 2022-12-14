import React, { useState, useEffect } from "react";
import axios from "axios";
import SweetAlert from "sweetalert-react";
import "./../../../../node_modules/sweetalert/dist/sweetalert.css";
// import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import { Modal, Upload, message, Input, Drawer, Descriptions, Row,DatePicker,Radio,Divider,Rate } from "antd";
import { DataTable } from "./DataTable";
import { Pagination } from "./Pagination";
import { Addproduct } from "../Addpage/Addproduct";
import moment from 'moment';
import { Adduser } from './../Addpage/Adduser';
const { Search } = Input;
const ProductContent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');

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
  const [listFeedback, setListFeedback]= useState([])
  const [content,setContent]= useState('')
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`https://localhost:44315/api/taikhoans`);
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
      console.log(dataEdit)
    setShowAlert(true);
    setTextAlert(dataEdit.hoten)
    {dataEdit.roles == '1' ? setdataUpdate({...dataEdit, roles : '0'}) : setdataUpdate({...dataEdit, roles : '1'}) }
    
    {dataEdit.roles == '0' ? 
     setTitle('Th??ng ?????c quy???n l??n th??nh ADMIN !') 
    :  
    setTitle('X??a ?????c quy???n ADMIN !')
 }
  };
  const onDelete = (dataEdit) => {
    setShowAlert(true);
    {dataEdit.status == '1' ? setTitle('B???n c?? mu???n v?? hi???u h??a t??i kho???n') : setTitle('B???n c?? mu???n k??ch ho???t t??i kho???n')}
    
    {dataEdit.status == '1' ? setdataUpdate({...dataEdit,status:'0' })  : setdataUpdate({...dataEdit,status:'1' }) }
  };
  //delete product
  const onConfirm = () => {
    setShowAlert(false)
    // console.log(dataUpdate)
    const key = "add";
    message.loading({
      content: 'C???p nh???t th??ng tin ....',
      key,
      style: {
        marginTop: "14vh",
        fontSize: "17px",
      },
    });
    setTimeout(() => {

        message.success({
            content: "Th??nh c??ng !!!",
            key,
            duration: 2,
            style: {
              marginTop: "15vh",
              fontSize: "17px",
            },
          });
          axios.put(`https://localhost:44315/api/taikhoans/${dataUpdate.idkh}`,dataUpdate).then(res => {
            message.success({ content: 'Th??nh c??ng !!!', key, duration: 2, style: {
                marginTop: '15vh', fontSize:"17px"
              }, });
          })
          window.location.reload()
    },1000)
  };



  const filterDataSearch = data.filter((filterData) => {
    return filterData.hoten.toLowerCase().includes(searchValue.toLowerCase())
   
  });
  const onView = (itemView) => {
    console.log(itemView)
    setOpenView(true);
    setDataView(itemView);
    axios.get(`https://localhost:44315/api/taikhoans/${itemView.idkh}`).then((res)=> {
      setListFeedback(res.data.feedbacks)
    })
  };
  const onCloseView = () => {
    setOpenView(false);
  };

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
      fn: (a, b) => a.idkh - b.idkh
    },
    down: {
      class: 'sort-down',
      fn: (a, b) => b.idkh - a.idkh
    },
    default: {
      class: 'sort',
      fn: (a, b) => a
    }
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
        <Adduser />
        <Search
          placeholder="Search s???n ph???m..."
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
      {/* <Modal
        title="S???a th??ng tin"
        visible={visible}
        onOk={handleEdit}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <form>
          <div>
            <Descriptions
              title="Ch???nh s???a th??ng tin t??i kho???n"
              layout="vertical"
              size="middle"
              bordered
            >
              <Descriptions.Item label="H??? v?? t??n" 
            //   style={{ width: 400 }}
            >
                <input
                //   style={{ width: 350 }}
                  type="text"
                  className="form-control"
                  name="tensp"
                  onChange={onChangData}
                  value={dataUpdate.hoten}
                />
              </Descriptions.Item>
              <Descriptions.Item label="Ng??y sinh">
               
                
                <DatePicker defaultValue={moment('14-02-1998', dateFormat)} onChange={onChangeDate}  style={{width:170,height:40}} format={dateFormat}/>
              </Descriptions.Item>
              <Descriptions.Item label="Gi???i t??nh">
                
                <Radio.Group style={{marginTop:5}} onChange={onChangData}>
                <Radio value="Nam"><a style={{color:'white'}}>Nam</a></Radio>
                <Radio value="N???"><a style={{color:'white'}}>N???</a></Radio>
                </Radio.Group>
              </Descriptions.Item>
            </Descriptions>
          </div>
        </form>
      </Modal> */}
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
          title="Th??ng tin t??i kho???n"
          layout="vertical"
          bordered
          size="small"
        >
          <Descriptions.Item label="H??? v?? t??n">
            {dataView.hoten}
          </Descriptions.Item>
          <Descriptions.Item label="Ng??y sinh" >
         {dataView.ngaysinh}
              
          </Descriptions.Item>
          <Descriptions.Item label="Gi???i t??nh">{dataView.gioitinh}</Descriptions.Item>
          <Descriptions.Item label="S??? ??i???n tho???i">{dataView.sdt}</Descriptions.Item>
          <Descriptions.Item label="CMND">
            {dataView.cmnd}
          </Descriptions.Item>
          <Descriptions.Item label="Email">
            {dataView.email}
          </Descriptions.Item>
          
          {dataView.roles == '1' ? (
           <Descriptions.Item label="?????c quy???n">
           Qu???n tr??? vi??n
         </Descriptions.Item>
          ) : (
            <Descriptions.Item label="?????c quy???n">
            Kh??ch h??ng
          </Descriptions.Item>
          )}
          {dataView.status == '0' ? (
            <Descriptions.Item label="Tr???ng th??i">
             
              Ng???ng ho???t ?????ng
            </Descriptions.Item>
          ) : (
            <Descriptions.Item label="Tr???ng th??i">
              Ho???t ?????ng
            </Descriptions.Item>
          )}
        </Descriptions>
        <br/>
         <Divider
            style={{
              color: "black",
              fontSize: 15,
              fontWeight: "bold",
            }}
          >
            Danh s??ch Feedback
          </Divider>
          <table className="table table-hover table-bordered" >
              <thead style={{textAlign:'center'}}>
                    <tr >
                        <th>IDSP</th>
                        <th>Ng??y</th> 
                        <th>N???i dung</th> 
                        <th>Rating</th> 
                    </tr>
                    </thead>
                <tbody>
                    {listFeedback.map((item,index)=>(
                        <tr key={index} style={{textAlign:'center'}}>
                            <td> {item.idsp} </td>
                            <td > {item.date} </td>
                            <td> {item.message}</td>
                            <td> 
                              <Rate value=
                                {item.rating} />
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

export default ProductContent;
