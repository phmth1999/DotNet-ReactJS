import React, { Component } from "react";
class Slide extends Component {
  render() {
    return (
      <div id="carousel-id" className="carousel slide" data-ride="carousel">
        <ol className="carousel-indicators">
          <li data-target="#carousel-id" data-slide-to="0" className=""></li>
          <li data-target="#carousel-id" data-slide-to="1" className=""></li>
          <li
            data-target="#carousel-id"
            data-slide-to="2"
            className="active"
          ></li>
        </ol>
        <div className="carousel-inner">
          <div className="item">
            <img src="img/slide/1.png" alt="First slide" />
          </div>
          <div className="item">
            <img src="img/slide/1.png" alt="First slide" />
          </div>
          <div className="item active">
            <img src="img/slide/1.png" alt="First slide" />
          </div>
        </div>
        <a
          className="left carousel-control"
          href="#carousel-id"
          data-slide="prev"
        >
          <span className="glyphicon glyphicon-chevron-left"></span>
        </a>
        <a
          className="right carousel-control"
          href="#carousel-id"
          data-slide="next"
        >
          <span className="glyphicon glyphicon-chevron-right"></span>
        </a>
      </div>
    );
  }
}

export default Slide;
