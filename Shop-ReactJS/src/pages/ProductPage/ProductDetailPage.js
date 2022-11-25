import React, { useState, useEffect } from "react";
import { Breadcrumb, Row, Tabs, Divider, Rate, Descriptions,Image  } from "antd";
import { message, Button } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";

import ProductSlide from "./ProductSlide";
import Review from "../../components/Product/Review";

const { TabPane } = Tabs;
const ProductDetailPage = (props) => {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("CART"))
      ? JSON.parse(localStorage.getItem("CART"))
      : []
  );
  const [count, setCount] = useState(
    JSON.parse(localStorage.getItem("COUNT"))
      ? JSON.parse(localStorage.getItem("COUNT"))
      : 0
  );
  const [feedback, setFeedback] = useState([]);
  const [data, setData] = useState([]);
  useEffect(() => {
    localStorage.setItem("COUNT", JSON.stringify(count));
  }, [count]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `https://localhost:44315/api/sanphams/${props.match.params.id}`
      );
      setData(res.data)
      // console.log(res);
      // console.log(res.data.feedbacks);
      setFeedback(res.data.feedbacks)
    };
    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem("CART", JSON.stringify(cart));
  }, [cart]);

  const onAddToCart = () => {
    console.log(data);
    let dataIndex = cart?.findIndex((x) => x.idsp === data.idsp);
    if (data.sl == 0) {
      message.warning({
        content: "Sản phẩm đã ngừng kinh doanh",
        style: {
          marginTop: "25vh",
          fontSize: "15px",
          float: "right",
          marginRight: 10,
        },
      });
    } else if (dataIndex !== -1) {
      message.warning({
        content: "Sản phẩm đã có trong giỏ hàng",
        style: {
          marginTop: "25vh",
          fontSize: "17px",
          float: "right",
          marginRight: 10,
        },
      });
    } else {
      Object.assign(data, { quanlity: 1 });
      setCart([...cart, data]);
      setCount(count + 1);
      message.success({
        content: "Thêm vào giỏ thành công !",
        style: {
          marginTop: "25vh",
          float: "right",
          fontSize: "17px",
        },
      });
      setTimeout(() => {
        window.location.reload();
      }, 200);
    }
  };
  // const handleSubmit = (values) => {
  //   console.log(values)
  //   axios.post( `https://localhost:44315/api/feedbacks`, {
  //     idkh:idkh,
  //     idsp: idsp,
  //     message: values.message,
  //     rating: values.rating,
  //     date: Date()
  //  } ).then((res)=> {console.log(res.data)
  //   window.location.reload()
  // })
  
  // };
  return (
    <div className="container product-detailpage">
      <Row className="all-breadcrump">
        <Breadcrumb className="padleft">
          <Breadcrumb.Item>
            <Link to="/">HOME</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/product">Sản phẩm</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Chi tiết sản phẩm</Breadcrumb.Item>
        </Breadcrumb>
      </Row>
      <div className="main-details">
        <div className="row content-details">
          <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
            <div className="imageDetails">
              <img src={data.hinhanh} alt="/" />
            </div>
          </div>
          <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
            <div className="infoDetails">
              <Row>
                <h1>{data.tensp}</h1>
              </Row>
              <hr />

              <Row>
                <h4>{data.mota}</h4>
              </Row>

              <h5>
                Đánh giá : <Rate allowHalf defaultValue={3.5} />
              </h5>
          
              <Row>
                <Descriptions>
                  <Descriptions.Item>{data.cauhinh}</Descriptions.Item>
                  
                </Descriptions>
                <Descriptions>
                <Descriptions.Item>{data.camera}</Descriptions.Item>
                </Descriptions>
                <Descriptions>
                <Descriptions.Item>Pin: {data.pin}</Descriptions.Item>
                </Descriptions>
              </Row>
              <h4 className="gia">Giá bán: {data.gia} VND</h4>

              <p className="btn addcart" onClick={() => onAddToCart(data)}>
                Mua hàng
              </p>
            </div>
          </div>
        </div>
        <hr />
        <div className="info-review">
          <Tabs defaultActiveKey="1" type="card" size="large">
            <TabPane tab="THÔNG TIN CHI TIẾT" key="1" className="tabs">
                <Descriptions bordered title={data.tensp}>
                  <Descriptions.Item label="Cấu hình"  style={{width: 150}}>{data.cauhinh}</Descriptions.Item>
                  
                </Descriptions>
                <Descriptions bordered>
                <Descriptions.Item label="Hệ điều hành" style={{width: 150}}>{data.hedieuhanh}</Descriptions.Item>
                </Descriptions>
                <Descriptions bordered>
                <Descriptions.Item label="Màn hình" style={{width: 150}}> {data.manhinh}</Descriptions.Item>
                </Descriptions>
                <Descriptions bordered>
                <Descriptions.Item label="Camera" style={{width: 150}}>{data.camera}</Descriptions.Item>
                </Descriptions>
                
               
                <Descriptions bordered>
                <Descriptions.Item label="Pin" style={{width: 150}}>{data.pin}</Descriptions.Item>
                </Descriptions>
            </TabPane>
            <TabPane tab="ĐÁNH GIÁ" key="2" className="tabs">
              <Review idsp={data.idsp} feedback={feedback}/>
            </TabPane>
          </Tabs>
        </div>
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
        </Divider>
            <ProductSlide/> */}
      </div>
    </div>
  );
};

export default ProductDetailPage;
