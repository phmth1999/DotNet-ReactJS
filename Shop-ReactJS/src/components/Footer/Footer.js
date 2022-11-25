import React, { Component } from 'react';
import {
    FacebookFilled,TwitterCircleFilled,GooglePlusCircleFilled,YoutubeFilled
  } from "@ant-design/icons";
const Footer = () => {
   
        return (
            <footer id="lib-footer" className="bg-light" style={{marginTop:20,backgroundColor:''}}>
  <div className="container ">
    <div className="rowfooter  col-wrap">
      <div className="footercol">
        <h3 >PHONESHOP.NET</h3>
        <img src="./../logo.png" alt="" style={{height:90,width:150}}/>
        <p />
        <ul className="iconsocial horizontal">
          <li><YoutubeFilled style={{color:'red',fontSize:30,padding:4}}/></li>
          <li><FacebookFilled style={{color:'blue',fontSize:30,padding:4}}/></li>
          <li><TwitterCircleFilled style={{color:'green',fontSize:30,padding:4}}/></li> 
          <li><GooglePlusCircleFilled  style={{color:'orange',fontSize:30,padding:4}}/></li>
        </ul>
      </div>
      <div className="footercol">
        <h4>Quan tâm</h4>
        <p>
        </p><ul className="text-footer">
          <li><a href="#">Liên lạc</a></li>
          <li><a href="#">Đổi/Trả</a></li>
          <li><a href="#">Phiếu quà tặng</a></li>
          <li><a href="#">Mong muốn</a></li>
          <li><a href="#">Dịch vụ khách hàng</a></li>
          <li><a href="#">Bản đồ</a></li>
        </ul>
        <p />
      </div>
      <div className="footercol">
        <h4>Thông Tin</h4>
        <p>
        </p><ul className="text-footer">
          <li><a href="#">Chuỗi cửa hàng</a></li>
          <li><a href="#">Thông tin giao hàng</a></li>
          <li><a href="#">Chính sách bảo mật</a></li>
          <li><a href="#">Hỗ trợ</a></li>
          <li><a href="#">Theo dõi đơn hàng</a></li>
        </ul>
        <p />
      </div>
      <div className="footercol">
        <h4>Liên hệ</h4>
        <ul className="text-footer">
          <li>Khu phố 6,Phường Linh Trung<br />Quận Thủ Đức,Tp Hồ Chí Minh</li>
          <li><a href="tel://1234567920">+ 0377 775 777</a></li>
          <li><a href="mailto:tnlshoes@gmail.com">phoneshop@gmail.com</a></li>
          <li><a href="#">phoneshop.com</a></li>
        </ul>
      </div>
      <div className="footercol">
        <div>
          <h4 className="footer-heading mb-4">Hộp thư góp ý</h4>
          <p />
          <form action="#" className="d-flex">
            <input type="text" className="form-control mr-3" placeholder="Email" />
            <input type="submit" defaultValue="Gửi" className="btn btn-primary" />
          </form>
        </div>
      </div>
    </div>
  </div>
  <hr />
  <div className="copy">
    <div className="col-sm-12 text-center">
      <p>
        <span>
          Mẫu này được thiết kế bởi Nhóm 27 
        </span> 
      </p>
    </div>
  </div>
</footer>

        );
    }


export default Footer;