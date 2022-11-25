import React, { useState, useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import axios from "axios";
export const FormInfo = () => {
  const [info, setInfo] = useState([]);
  const [data, setData] = useState([]);
  const [dataTmp,setdataTmp]= useState(JSON.parse(localStorage.getItem("CART"))?JSON.parse(localStorage.getItem("CART")):[])
  const [datacheckout, setDatacheckout] = useState([]);
  useEffect(() => {
    // let dataCart = JSON.parse(localStorage.getItem("CART"))
    let tonggiaCart = JSON.parse(localStorage.getItem("SUM"))
    setDatacheckout(dataTmp)
    setData({
        ...data,
        tonggia: tonggiaCart
    })
    
  }, [dataTmp]);

  const idkh = JSON.parse(localStorage.getItem("IDKH"));

  const layout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 14,
    },
  };
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `https://localhost:44315/api/taikhoans/${idkh}`
      );
      setInfo(res.data);
     
    };
    fetchData();
  }, []);

  const onSubmit = () => {
    const key = "add";
    message.loading({
      content: "Kiểm tra thông tin ....",
      key,
      style: {
        marginTop: "14vh",
        fontSize: "17px",
      },
    });
    var today = new Date();
    setData({
        ...data, 
        idkh: info.idkh,
        tinhtrang: 'Chưa kiểm duyệt',
        // ngay: today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear() 
        ngay:Date()
        })
        setTimeout(() => {
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



  useEffect(() => {
    Object.assign(data,{chitiethoadons:datacheckout});
    localStorage.setItem('HOADON',JSON.stringify(data))
  }, [data]);



    const onDefault = () => {
        setData({
            ...data, 
            diachi: info.diachi
        })
    }
    console.log(data)
    const onChange = (e) => {
        setData({
            ...data, 
            diachi: e.target.value
        })
    }

  return (
    <div>
      <Form
        name="basic"
        {...layout}
      >
      
       
        <Form.Item label="Họ và tên">{info.hoten}</Form.Item>
        <Form.Item label="Địa chỉ mặc định">{info.diachi}</Form.Item>
        <Form.Item label="Số điện thoại">{info.sdt}</Form.Item>
        <Form.Item label="Email">{info.email}</Form.Item>
        <a style={{ marginLeft: 165, fontWeight: "bolder" }} onClick={onDefault}>
         Dùng địa chỉ mặc định ?
       </a>
       <Form.Item label="Địa chỉ nhận hàng ">
         <Input placeholder='Địa chỉ nhận hàng' onChange={onChange} name="diachi" value={data.diachi}/>
         </Form.Item>
        {/* <MyMapComponent/> */}
        <Form.Item >
          <Button type="primary" onClick={onSubmit} style={{marginLeft:30}}>
            Kiểm tra thông tin
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
