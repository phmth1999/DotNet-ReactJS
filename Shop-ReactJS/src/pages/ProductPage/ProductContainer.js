import React, { useEffect, useState } from "react";
import { message, Button } from "antd";
import context from "./../../context";
import ProductItem from "./ProductItem";
const ProductContainer = ({ products, search, onViewMore, max }) => {
  // const [search, setSearch] = useState(JSON.parse(localStorage.getItem('SEARCH')))
  // console.log(search)
  const [count, setCount] = useState(
    JSON.parse(localStorage.getItem("COUNT"))
      ? JSON.parse(localStorage.getItem("COUNT"))
      : 0
  );
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("CART"))
      ? JSON.parse(localStorage.getItem("CART"))
      : []
  );
  const onAddToCart = (productItem) => {
    let dataIndex = cart?.findIndex((x) => x.idsp === productItem.idsp);
    if (productItem.sl == 0) {
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
      Object.assign(productItem, { quanlity: 1 });
      setCart([...cart, productItem]);
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
  useEffect(() => {
    localStorage.setItem("CART", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("COUNT", JSON.stringify(count));
  }, [count]);
  //search filter

  // render
  return (
    <div className="main-product">
      <div className="row">
        {/* content */}
        {search == "" ? (
          <>
            {products.map((product) => (
              <div key={product.idsp}>
                <ProductItem product={product} onAddToCart={onAddToCart} />
              </div>
            ))}
            {products.length == max ? (
              <div>
                <Button
                  type="primary"
                  className="view-more"
                  onClick={() => window.location.reload()}
                >
                  Thu gọn
                </Button>
              </div>
            ) : (
              <div>
                <Button
                  type="primary"
                  className="view-more"
                  onClick={onViewMore}
                >
                  Xem thêm
                </Button>
              </div>
            )}
          </>
        ) : (
          <>
            <div
              style={{
                fontSize: 17,
                fontWeight: "bolder",
                marginLeft: 20,
                color: "red",
              }}
            >
              Sản phẩm hiển thị cho từ khóa : {search}
            </div>

            {products.map((product) => (
              <div key={product.idsp}>
                <ProductItem product={product} onAddToCart={onAddToCart} />
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};
export default ProductContainer;
