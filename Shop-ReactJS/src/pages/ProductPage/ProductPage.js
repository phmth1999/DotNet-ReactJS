import React, { useState, useEffect } from "react";
import { Breadcrumb, Row } from "antd";
import { Divider, Button, message, Select, Tag } from "antd";

import ProductContainer from "./ProductContainer";
import { Link } from "react-router-dom";
import axios from "axios";
import { Pagination } from "./Pagination";
import { set } from 'lodash';
import { ListType } from './ListType';
import { Callbacks } from "jquery";
function tagRender(props) {
  const { label, value, closable, onClose } = props;
  return (
    <Tag
      color="blue"
      closable={closable}
      onClose={onClose}
      style={{ marginRight: 5 }}
    >
      {label}
    </Tag>
  );
}
const ProductPage = ({ search }) => {
  const [products, setProducts] = useState([]);
  const [currentPage, setcurrentPage] = useState([1]);
  const [dataPerPage, setDataPerPage] = useState([18]);
  const end = currentPage * dataPerPage;
  const begin = end - dataPerPage;
  const [thuonghieu,setThuonghieu]=useState([])
  const tagRender=(props) => {
    const { label, value, closable, onClose } = props;
    return (
      <Tag
        color="blue"
        closable={closable}
        onClose={onClose}
        style={{ marginRight: 5 }}
      >
        {label}
      </Tag>
    );
  }
  const onViewMore = () => {
    const key = "add";
    message.loading({
      content: "Loadding....!",
      key,
      style: {
        marginTop: "17vh",
        fontSize: "15px",
      },
    });
    setTimeout(() => {
      setDataPerPage(dataPerPage * 2);
      message.success({
        content: "Loadded ^^",
        key,
        duration: 2,
        style: {
          marginTop: "17vh",
          fontSize: "15px",
        },
      });
    }, 1000);
  };
  //change page number
  const paginate = (pageNumber) => setcurrentPage(pageNumber);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`https://localhost:44315/api/sanphams`);
      setProducts(res.data);
    };
    fetchData();

  }, []);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`https://localhost:44315/api/thuonghieux`);
      setThuonghieu(res.data);
    };
    fetchData();

  }, []);
  
  const filterData = products.filter((filters) => {
    return filters.tensp.toLowerCase().includes(search.toLowerCase());
  });
  // console.log(options)
const GetProductByType = (idth) => {
  console.log(idth)
  const fetchData = async () => {
    const res = await axios.get(`https://localhost:44315/api/sanphams/th/${idth}`);
    setProducts(res.data);
  };
  fetchData();
}
  return (
    <div className="container product-page ">
      {search !== "" ? (
        <section>
          <Row className="my-breadcrump" style={{height:50}}>
            <Breadcrumb className="padleft">
              <Breadcrumb.Item>
                <Link to="/">HOME</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item onClick={()=> window.location.reload()}>Sản phẩm</Breadcrumb.Item>
              <Breadcrumb.Item>Danh sách sản phẩm</Breadcrumb.Item>
            </Breadcrumb>
           
         
            <ListType thuonghieu={thuonghieu}/>
            
         
          </Row>

          <ProductContainer
            products={filterData.slice(begin, end)}
            search={search}
            onViewMore={onViewMore}
            max={products.length}
          />
          <Pagination
              dataPerPage={dataPerPage}
              totalData={filterData.length}
              paginate={paginate}
              style={{ marginRight: 30, float: "right" }}
            />
        </section>
      ) : (
        <section>
          <Row className="my-breadcrump" style={{height:50}}>
          <Breadcrumb className="padleft">
              <Breadcrumb.Item>
                <Link to="/">HOME</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item ><Link to="/product" onClick={()=> window.location.reload()}>Sản phẩm</Link></Breadcrumb.Item>
              <Breadcrumb.Item>Danh sách sản phẩm</Breadcrumb.Item>
            </Breadcrumb>
            
         
              <ListType thuonghieu={thuonghieu} GetProductByType={GetProductByType}/>
             
         
            
          </Row>
          <ProductContainer
            products={products.slice(begin, end)}
            search={search}
            onViewMore={onViewMore}
            max={products.length}
          />
           <Pagination
              dataPerPage={dataPerPage}
              totalData={filterData.length}
              paginate={paginate}
              style={{ marginRight: 30, float: "right" }}
            />
        </section>
      )}
      <hr />
    </div>
  );
};

export default ProductPage;
