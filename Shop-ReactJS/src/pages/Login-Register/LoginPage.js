import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { Button } from "antd";
import {
  FacebookFilled,
  GooglePlusSquareFilled,
  UserOutlined,
  KeyOutlined,
} from "@ant-design/icons";
class LoginPage extends Component {
  state = {
    username: "",
    password: "",
    isLogin: false,
  };
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    axios
      .post("https://localhost:44315/api/taikhoans/login", {
        username: this.state.username,
        pass: this.state.password,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data == '') {alert('sai thông tin đăng nhập!!!!')} else {
axios.post("https://localhost:44315/api/logs", {
          idkh: res.data.user.idkh,
          message: 'Login',
          ip:'1.127.134.1',
          date: Date()
      })
        this.setState({ isLogin: true });
        localStorage.setItem("isLogin", true);
        localStorage.setItem("TOKEN", JSON.stringify(res.data.token));
        localStorage.setItem("ROLE", JSON.stringify(res.data.user.roles));
        localStorage.setItem("NAME", JSON.stringify(res.data.user.hoten));
        localStorage.setItem("IDKH", JSON.stringify(res.data.user.idkh));
        if (res.data.user.roles == '0') {
          localStorage.setItem('isAuthor', JSON.stringify(false))
        }else {
          localStorage.setItem('isAuthor', JSON.stringify(true))
        }
        this.props.history.push("/");
        window.location.reload()
      }
      })
  };
  //
  responseFacebook = (response) => {
    console.log(response);
  };
  render() {
    const { username, password } = this.state;
    return (
      <div
        className="container loginpage"
        style={{ backgroundColor: "lightgray" }}
      >
        <div className="d-flex justify-content-center h-100">
          <div className="card">
            <div className="card-header">
              <h3 style={{ paddingTop: 20 }}>Đăng nhập</h3>
              <div className="d-flex justify-content-end  social_icon">
                <span>
                  <FacebookLogin
                    appId="2548090245468722"
                    autoLoad={false}
                    fields="name,email,picture"
                    callback={this.responseFacebook}
                    render={(renderProps) => (
                      <FacebookFilled onClick={renderProps.onClick} />
                    )}
                  />
                </span>
                <span>
                  <GooglePlusSquareFilled />
                </span>
              </div>
            </div>
            <hr />
            <div className="card-body">
              <form className="formlogin" onSubmit={this.handleSubmit}>
                <div className="input-group form-group">
                  <span className="form-icon">
                   
                    <UserOutlined />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="username"
                    name="username"
                    required
                    ref="username"
                    // lag vcl
                    onChange={this.handleChange}
                    value={username}
                  />
                </div>
                <div className="input-group form-group">
                  <span className="form-icon">
                    <KeyOutlined />
                  </span>

                  <input
                    type="password"
                    className="form-control"
                    placeholder="password"
                    name="password"
                    ref="password"
                    required
                    onChange={this.handleChange}
                    value={password}
                  />
                </div>
                <div className="form-group">
                  <div className="forgot">
                    <Link to='/checkmail'>Quên mật khẩu?</Link>
                  </div>
                  <button
                    type="submit"
                    defaultValue="Login"
                    className="btn float-right login_btn"
                  >
                    LOGIN
                  </button>
                </div>
              </form>
            </div>
            <div className="card-footer">
              <div className="signup links">
                Chưa có tài khoản ?<Link to="/register">Đăng kí</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginPage;
