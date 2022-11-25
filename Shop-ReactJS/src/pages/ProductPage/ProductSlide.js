import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
const ProductSlide = () => {
  const [thuonghieu, setThuonghieu] = useState([]);
  useEffect(() => {
    axios.get(`https://localhost:44315/api/thuonghieux`).then((res) => {
      setThuonghieu(res.data);
    });
  }, []);

  console.log(thuonghieu);
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  return (
    <div className=" myslideproducts" style={{width:'100%'}}>
      <Slider {...settings}>
        {thuonghieu.map((item) => (
          <div  key={item.idth}>
            <img src={item.logo} alt="#" style={{ width: 250, height: 100 }} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductSlide;
