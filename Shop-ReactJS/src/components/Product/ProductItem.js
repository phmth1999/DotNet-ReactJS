import React, { Component } from 'react';

class ProductItem extends Component {
  
    render() {
      // var { product} = this.props;
      /// e chỉnh sửa code file này
        return (
         
          <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
            <div className="product-item">
            <div className="pi-img-wrapper">
              <img src="./../img/spdemo.png" className="img-responsive" alt="#" />
              <div>
              </div>
            </div>
              <h3 style={{marginTop:10}}><a href="shop-item.html" >IPHONE</a></h3>
            <div className="pi-price">1000</div>
            <a className="btn add2cart">Add to cart</a>
            <div className="sticker sticker-new" />
          </div>
          </div>
       
        );
    }
}

export default ProductItem;