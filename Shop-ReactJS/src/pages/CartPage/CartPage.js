import React, { useState, useEffect,useMemo, useCallback } from "react";
import { Icon, Row, Divider, InputNumber, Button } from "antd";
import {Link} from "react-router-dom";
import ProductSlide from "../ProductPage/ProductSlide";
import { DeleteOutlined } from "@ant-design/icons";
import { Toast } from "react-bootstrap";
import { Checkout } from "./Checkout";
const CartPage = (props) => {
  // const { parentCallback } = props;
  const [count, setCount] = useState(JSON.parse(localStorage.getItem("COUNT")) ? JSON.parse(localStorage.getItem("COUNT")) : 0);
  
  const [dataInitial, setDataInitial] = useState([]);
  const sum = JSON.parse(localStorage.getItem("SUM"));
  const [dataAfterUpdate, setDataAfterUpdate] = useState(dataInitial ? dataInitial : []);
  const [total, setTotal] = useState(sum ? sum : 0);
  // const [dataCheckout, setDataCheckout] = useState([]);
  // const [checkout, setCheckout] = useState([]);

  // const formatNumber = (num) => {
  //   return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  // };
  const onChangeQuanlity = (val, id) => {
    let dataAfterUpdate = [];
    let total = 0;
    dataInitial.map((x) => {
      if (x.idsp === id) {
        x.quanlity = val;
      }
      dataAfterUpdate.push(x);
      total += x.quanlity * x.gia;   
      setTotal(total);
      localStorage.setItem("CART", JSON.stringify(dataAfterUpdate));
    });
    localStorage.setItem("SUM", JSON.stringify(total));
  };
  //effect total
  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("CART"))
    let total = 0 
    data && data.map((x) => {
      total += x.quanlity * x.gia;
    });
    setTotal(total)
    setDataInitial(data)
    localStorage.setItem("SUM", JSON.stringify(total));
  }, [])
  //delete 
  const onDelete = (idx) => {
    // console.log(dataEdit)
    // let data = JSON.parse(localStorage.getItem("CART"))
    let dataAfterUpdate = [];
    let total = 0;
    const data = [...dataInitial]
    
    data.splice(idx,1)
    setDataInitial(data)
    if (data.length==0) {
      localStorage.setItem("CART", JSON.stringify(dataAfterUpdate));
    setTotal(total);
    } else {
      data.map((x) => {
        dataAfterUpdate.push(x);
        total += x.quanlity * x.gia;   
        localStorage.setItem("CART", JSON.stringify(dataAfterUpdate));
        setTotal(total);
        });
    }
    
    localStorage.setItem("SUM", JSON.stringify(total));
    
    setCount(count-1);
    window.location.reload()
}
useEffect(() => {
  localStorage.setItem("COUNT", JSON.stringify(count));
}, [count]);


  return (
    <div className="container cartpage">
      <Row className="cart-main">
        <div className="col-lg-8">
          <div className="main-heading">Shopping Cart</div>
          <div className="table-cart">
            <table>
              <thead>
                <tr style={{textAlign:'center'}}>
                  <th>Sản phẩm</th>
                  <th>Hình ảnh</th>
                  <th>Giá</th>
                  <th>Số lượng</th>
                  <th>Thành tiền</th>
                  <th>Xóa</th>
                </tr>
              </thead>
              <tbody>
                {dataInitial && dataInitial.map((item, idx) => 
                    <tr key={idx} style={{textAlign:'center'}}>
                      <td style={{width:170}}>
                        {item.tensp}
                       
                      
                      </td>
                      <td style={{width:70}}> <img src={item.hinhanh} alt={item.tensp} style={{width:60,height:70}}/></td>
                      <td style={{width:140}}>{(item.gia)}</td>
                      <td style={{width:90}}>
                        <InputNumber
                          min="1"
                          defaultValue={item.quanlity}
                          onChange={(val) => onChangeQuanlity(val, item.idsp)}
                        />
                      </td>
                      <td>{(item.quanlity * item.gia)}</td>
                      <td><Button type="button" onClick={() => onDelete(idx)}> Xóa </Button> </td>
                    </tr>
                )}
              </tbody>
            </table>
            {/* <p>{total}</p> */}
          </div>
        </div>
        <div className="col-lg-4">
          <div className="cart-totals">
            <h3>Cart Totals</h3>
            <form action="#" method="get" acceptCharset="utf-8">
              <table>
                <tbody>
                  <tr>
                    <td>Tổng giá</td>
                    <td className="subtotal">{(total)} VND</td>
                  </tr>
                  <tr>
                    <td>Shipping</td>
                    <td className="free-shipping">Free Shipping</td>
                  </tr>
                  <tr className="total-row">
                    <td>Tổng tiền</td>
                    <td className="price-total">{(total)} VND</td>
                  </tr>
                </tbody>
              </table>
              <div className="btn-cart-totals">
                <Link className="update round-black-btn" to='/product'>
                 Tiếp tục mua sắm
                </Link>
                <Checkout/>
              </div>
            </form>
          </div>
        </div>
      </Row>
      <hr />
      {/* <Divider
        style={{
          color: "red",
          fontSize: 22,
          fontWeight: "bold",
          padding: 20,
          background: "lightgray",
        }}
      >
        ROLATED PRODUCTS
      </Divider> */}
    </div>
  );
};

export default CartPage;
