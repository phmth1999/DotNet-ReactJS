import React, { useState, useEffect } from "react";
import { Descriptions, Divider, Card,Empty ,Drawer, Button,message} from "antd";
import { EyeOutlined } from "@ant-design/icons";
import axios from "axios";
import { Link } from "react-router-dom";
import SweetAlert from "sweetalert-react";
import "./../../../node_modules/sweetalert/dist/sweetalert.css";
const CustomerOrder = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [idkh, setIdkh] = useState(
    JSON.parse(localStorage.getItem("IDKH"))
      ? JSON.parse(localStorage.getItem("IDKH"))
      : 0
  );
  console.log(idkh);
  const [info, setInfo] = useState([]);
  const [hoadon, setHoadon] = useState([]);
  const [hoadonUpdate, setHoadonUpdate] = useState([]);
  const [hoadonView, setHoadonView] = useState([]);
  const [chitiethoadon, setChitiethoadon] = useState([]);
  const [visible, setVisible] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [textAlert, setTextAlert] = useState("");
  const [title, setTitle] = useState("");
  const [tinhtrangtmp,setTinhtrangtmp] = useState("")

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
const viewDetail = (itemView)=> {
    setOpenView(true)
    setHoadonView(itemView)
    
    console.log(itemView.idhd)
    axios.get( `https://localhost:44315/api/hoadons/${itemView.idhd}`).then((res)=> {
        setChitiethoadon(res.data.chitiethoadons)
        setTinhtrangtmp(res.data.tinhtrang)
    })
}

const onCloseView = () => {
    setOpenView(false);
  };
  const onHuy = () => {

      setShowAlert(true)
    //   setHoadonUpdate(hoadonView)
      if (tinhtrangtmp !== 'Hủy') {
          if (tinhtrangtmp =='Đã nhận') {
            message.error({
                content: "Hóa đơn đã nhận không thể hủy !!!",
                style: {
                  marginTop: "15vh",
                  fontSize: "15px",
                },
              })
              setShowAlert(false)
          }else {
            setTitle("Bạn có muốn hủy hóa đơn")
            }
          }else {
            setTitle("Bạn có hoàn tác hóa đơn")
          }
       
          
      
      {
        hoadonView.tinhtrang == "Hủy"
          ? setHoadonUpdate({ ...hoadonView, tinhtrang: 'Chưa kiểm duyệt' })
          : setHoadonUpdate({ ...hoadonView, tinhtrang: "Hủy" });
      }
  }
  
  const onConfirm = () => {
    setShowAlert(false);
    const key = "add";
    {
      hoadonUpdate.tinhtrang == "Hủy"
        ? message.loading({
            content: "Hủy hóa đơn ....",
            key,
            style: {
              marginTop: "14vh",
              fontSize: "15px",
            },
          })
        : message.loading({
            content: "Hoàn tác ....",
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
          `https://localhost:44315/api/hoadons/${hoadonView.idhd}`,
          hoadonUpdate
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
    //   setVisible(false);
      window.location.reload();
    }, 3000);
  }
console.log(chitiethoadon)
  return (
    <div className="process-content">
         <Card
        title="Đơn hàng gần nhất"
        extra={<Link to=''>Xem thêm</Link>}
        style={{ width: "100%" }}
      >
        <table className="table table-hover" style={{textAlign:'center'}}>
          <thead style={{textAlign:'center'}}>
            <tr>
              <th style={{width:200}}>Ngày đặt hàng</th>
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
                    <a style={{fontSize:15,color:'blue'}} onClick={()=>viewDetail(hd)}><EyeOutlined/></a>
                  </td>
                </tr>
          ))}
            
          </tbody>
        </table>
      </Card>
      <Card
        title="Hóa đơn đã nhận"
        //   extra={<Link to="">Chỉnh sửa</Link>}
        style={{ width: "100%", marginTop: 10}}
      >
       
          {hoadon.filter(hoadonfilter => hoadonfilter.tinhtrang.includes('Đã nhận')).length == 0
           ? 
           <Empty />
           :
                <>
                 <table className="table table-hover" style={{ textAlign: "center" }}>
          <thead style={{ textAlign: "center" }}>
            <tr>
              <th style={{width:200}}>Ngày đặt hàng</th>
              <th>Địa chỉ</th>
              <th>Tình trạng đơn hàng</th>
              <th>Tổng tiền</th>
              <th>Chi tiết</th>
            </tr>
          </thead>
          <tbody>
            {hoadon.filter(hoadonfilter => hoadonfilter.tinhtrang.includes('Đã nhận')).map((hd, idx) => (
              <tr key={idx}>
                <td>{hd.ngay}</td>
                <td>{hd.diachi}</td>
                <td>{hd.tinhtrang}</td>
                <td>{hd.tonggia}</td>
                <td style={{ textAlign: "center" }}>
                  <a style={{ fontSize: 15, color: "blue" }} onClick={()=>viewDetail(hd)}>
                    <EyeOutlined />
                  </a>
                </td>
              </tr>
            ))}
            
       
          </tbody>
        </table> 
        </>
        }
      </Card>
      <Card
        title="Tất cả hóa đơn"
        //   extra={<Link to="">Chỉnh sửa</Link>}
        style={{ width: "100%", minHeight: 500 , marginTop: 10}}
      >
        <table className="table table-hover" style={{ textAlign: "center" }}>
          <thead style={{ textAlign: "center" }}>
            <tr>
              <th style={{width:200}}>Ngày đặt hàng</th>
              <th>Địa chỉ</th>
              <th>Tình trạng đơn hàng</th>
              <th>Tổng tiền</th>
              <th>Chi tiết</th>
            </tr>
          </thead>
          <tbody>
            {hoadon.map((hd, idx) => (
              <tr key={idx}>
                <td>{hd.ngay}</td>
                <td>{hd.diachi}</td>
                <td>{hd.tinhtrang}</td>
                <td>{hd.tonggia}</td>
                <td style={{ textAlign: "center" }}>
                  <a style={{ fontSize: 15, color: "blue" }} onClick={()=>viewDetail(hd)}>
                    <EyeOutlined />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

{/* view */}
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
<Drawer
        width={700}
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
        //   extra={<Button onClick={onHuy}>Hủy</Button>}
        >
          <Descriptions.Item label="Ngày đặt hàng">
            {hoadonView.ngay}
          </Descriptions.Item>
          <Descriptions.Item label="Địa chỉ nhận hàng">
            {hoadonView.diachi}
          </Descriptions.Item>
          <Descriptions.Item label="Số lượng sản phẩm">
            {chitiethoadon.length}
          </Descriptions.Item>
          {hoadonView.tinhtrang == "Hủy" ? (
            <Descriptions.Item label="Tình trạng">
              <p style={{ color: "red" }}> Đã hủy </p>
              <Button onClick={onHuy} style={{marginLeft:30}}>Hoàn tác</Button>
            </Descriptions.Item>
          ) : (
            <Descriptions.Item label="Tình trạng">
              <p style={{ color: "green" }}> {hoadonView.tinhtrang} </p>
              <Button onClick={onHuy}>Hủy</Button>
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
            {chitiethoadon.map((item, index) => (
              <tr key={index} style={{ textAlign: "center" }}>
                <td> {item.tensp} </td>
                <td style={{ width: 110, textAlign: "center" }}>
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

export default CustomerOrder;
