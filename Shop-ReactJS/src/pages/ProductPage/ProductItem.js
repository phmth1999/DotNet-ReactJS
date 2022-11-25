import React from 'react';
import { Link } from "react-router-dom";
 const ProductItem = ({product,onAddToCart}) => {
    
    return (
         <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
         <div className="product-item">
          <div className="pi-img-wrapper">
            <img src={product.hinhanh} className="img-responsive" alt="#" />
           
          </div>
          <div style={{height:45}}>
          <Link to={"/productdetail/" + product.idsp}>
            <h3 style={{ marginTop: 10 }}>
              <p>{product.tensp}</p>
            </h3>
          </Link>
          </div>
          <div className="pi-price">{product.gia}</div>
          <p className="btn add2cart" onClick={()=>onAddToCart(product)}>
            Add to cart
          </p>
        </div>
      </div>
    )
}
export default ProductItem;