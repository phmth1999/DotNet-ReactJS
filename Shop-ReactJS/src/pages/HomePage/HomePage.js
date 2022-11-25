import React, { useState, useEffect } from "react";
import Slide from "./Slide";
import { Divider, Button } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import ProductContainer from "../ProductPage/ProductContainer";
import ProductSlide from "../ProductPage/ProductSlide";

const HomePage = ({ search }) => {
  const [products, setProducts] = useState([]); 
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`https://localhost:44315/api/sanphams/top`);
      setProducts(res.data);
    };
    fetchData();
  }, []);
  const filterData = products.filter((filters) => {
    return filters.tensp.toLowerCase().includes(search.toLowerCase());
  });
  return (
    <div className="container homepage">
      {search !== "" ? (
        <>
          <Divider
            style={{
              color: "red",
              fontSize: 22,
              fontWeight: "bold",
              padding: 20,
              background: "lightgray",
            }}
          >
            TOP PRODUCT
          </Divider>
          <ProductContainer search={search} products={filterData} />
        </>
      ) : (
        <>
          <Slide />
          <hr />
          <Divider
            style={{
              color: "red",
              fontSize: 22,
              fontWeight: "bold",
              padding: 20,
              background: "lightgray",
            }}
          >
            Sản phẩm mới
          </Divider>

          <ProductContainer search={search} products={filterData} />

        </>
      )}

      <Divider
        style={{
          color: "red",
          fontSize: 22,
          fontWeight: "bold",
          padding: 20,
          background: "lightgray",
        }}
      >
        THƯƠNG HIỆU
      </Divider>
      <ProductSlide style={{marginBottom:200}}/>
      <hr/>
    </div>
  );
};

export default HomePage;
