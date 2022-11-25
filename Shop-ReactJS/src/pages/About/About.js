import React from "react";

export const About = () => {
  return (
    <div>
      <div>
        <div className="home-header" style={{backgroundImage:'url(./../background.jpg)'}}>
          <div className="banner-text">
            <h2>
              <b>Xin giới thiệu</b>
            </h2>
            <h4>Chúng tôi là</h4>
            <h1>
              <b>P H O N E  S H O P</b>
            </h1>
            <h2>Chất lượng hàng đầu - Đẳng cấp mãi mãi</h2>
          </div>
        </div>
        <br />
        {/*-------------------*/}
        <section id="lib-section" className="bg-light">
          <div className="container">
            <div className="row">
              <div className="col-sm-6">
                <iframe
                  width={560}
                  height={315}
                  src="https://www.youtube.com/embed/VehW_Wo1sgI?rel=0&autoplay=1"
                  frameBorder={0}
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="col-sm-6 center">
                <h4>Giới thiệu cửa hàng</h4>
                <p>
                  PhoneShop là nhà bán lẻ số 1 Việt Nam về doanh thu và lợi
                  nhuận, với mạng lưới hơn 3.400 cửa hàng trên toàn quốc.
                  PhoneShop vận hành các chuỗi bán lẻ phoneshop.com, Điện Máy
                  Xanh, Bách Hoá Xanh. Ngoài ra, PhoneShop đã mở rộng ra thị
                  trường nước ngoài với chuỗi bán lẻ điện thoại tại Campuchia.
                  <br />
                  Với hơn 10 năm kinh nghiệm phục vụ, chúng tôi tự tin sẽ mang
                  đến những trải nghiệm thật tốt cho quý khách hàng với đội ngũ
                  chuyên nghiệp được đào tạo kĩ lưỡng nhằm tạo ra những giây
                  phút thoải mái khi quý khách hàng sử dụng dịch vụ của chúng
                  tôi.
                </p>
              </div>
            </div>
          </div>
        </section>
        <hr/>
        <section id="lib-section" className='container' style={{marginTop:40}}>
          <h3 style={{marginLeft:40,marginBottom:20}} >Thương thiệu hợp tác</h3>
          <div className="row">
            <div className="col-sm-3">
              <img src="https://www.freepnglogos.com/uploads/classic-samsung-logo-png-0.png" className="colcenter" style={{height:117}} />
            </div>
            <div className="col-sm-3">
              <img src="https://www.vesttech.com/wp-content/uploads/2019/10/apple-iphone-logo-png-1.png" className="colcenter" style={{height:117}} />
            </div>
            <div className="col-sm-3">
              <img src="https://upload.wikimedia.org/wikipedia/commons/1/13/OPPO_Logo_wiki.png" className="colcenter" style={{height:117}}/>
            </div>
            <div className="col-sm-3">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Xiaomi_logo.svg/1200px-Xiaomi_logo.svg.png" className="colcenter" style={{height:117}} />
            </div>
          </div>
        </section>
        <section id="lib-section" className="bg-light container" style={{marginTop:40}}>
          <div className="container">
            <h3 style={{marginLeft:40,marginBottom:20}} >Những con số ấn tượng</h3>
            <div className="row">
              <div className="col-sm-6">
                <img src="https://ss-images.catscdn.vn/wp700/2020/03/21/7203451/smartphone.jpg" className="imghd" style={{height:410, marginTop:10}}/>
              </div>
              <div className="col-sm-6">
                <ul>
                  <li>
                    <a>
                      <i className="fas fa-arrow-alt-circle-right" /> Hơn 10 năm
                      hoạt động
                    </a>
                  </li>
                  <hr />
                  <li>
                    <a>
                      <i className="fas fa-arrow-alt-circle-right" /> Nằm trong
                      top 50 công ty kinh doanh hiệu quả nhất Việt Nam năm 2019
                    </a>
                  </li>
                  <hr />
                  <li>
                    <a>
                      <i className="fas fa-arrow-alt-circle-right" /> Có hơn 30
                      chi nhánh lớn nhở trải khắp các tỉnh thành
                    </a>
                  </li>
                  <hr />
                  <li>
                    <a>
                      <i className="fas fa-arrow-alt-circle-right" /> Doanh thu
                      thuần 2019: 102.174 tỷ đồng
                    </a>
                  </li>
                  <hr />
                  <li>
                    <a>
                      <i className="fas fa-arrow-alt-circle-right" /> Lợi nhuận
                      sau thuế 2019: 3.836 tỷ đồng
                    </a>
                  </li>
                  <hr />
                  <li>
                    <a>
                      <i className="fas fa-arrow-alt-circle-right" /> Kế hoạch
                      doanh thu 2020: 110.000 tỷ đồng
                    </a>
                  </li>
                  <hr />
                  <li>
                    <a>
                      <i className="fas fa-arrow-alt-circle-right" /> Kế hoạch
                      LNST 2020: 3.450 tỷ đồng
                    </a>
                  </li>
                  <hr />
                </ul>
              </div>
            </div>
          </div>
        </section>
    <hr/>
      </div>
    </div>
  );
};
