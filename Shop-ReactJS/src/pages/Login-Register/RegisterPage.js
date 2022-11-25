// import React, { useState, useEffect } from "react";
// import { Link, Redirect } from "react-router-dom";
// import { useHistory } from "react-router-dom";
// import {
//   FacebookFilled,
//   GooglePlusSquareFilled,
//   UserOutlined,
//   KeyOutlined,
// } from "@ant-design/icons";
// import { DatePicker, Radio, Button } from "antd";
// import axios from "axios";
// import { data } from "jquery";
// import { set } from "lodash";
// const RegisterPage = () => {
//   const history = useHistory();
//   const [formValue, setFormValue] = useState([]);
//   const [passwordConfirm, setPasswordConfirm] = useState("");

//   const handleChange = (e) => {
//     setFormValue({
//       ...formValue,
//       [e.target.name]: e.target.value,
//     });
//   };
//   useEffect(() => {
//     setFormValue({
//       ...formValue,
//       roles: "0",
//       status: "1",
//     });
//   }, []);
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // if (passwordConfirm != formValue.pass) {
//     //   alert("Passwork không cùng với PassConfirm!!!");
//     // }
//     console.log(formValue);
//     // axios
//     //   .post("https://localhost:44315/api/taikhoans/register", formValue)
//     //   .then((res) => {
//     //     console.log(res.data);
//     //     if (res.data == false) {
//     //       alert("Username tồn tại");
//     //     } else {
//     //       alert("đăng kí thành công");
//     //       history.push("/login");
//     //     }
//     //   });
//   };
//   return (
//     <div className="container loginpage">
//       <div className="d-flex justify-content-center h-100">
//         <div className="card-register">
//           <div className="card-header">
//             <h3 style={{ paddingTop: 20 }}>Sign Up</h3>
//             <div className="d-flex justify-content-end  social_icon">
//               <span>
//                 <FacebookFilled />
//               </span>
//               <span>
//                 <GooglePlusSquareFilled />
//               </span>
//             </div>
//           </div>
//           <hr />
//           <div className="card-body">
//             <form className="formlogin" onSubmit={handleSubmit}>
//               <div className="input-group form-group">
//                 <span className="form-icon">
//                   <UserOutlined />
//                 </span>
//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="full name"
//                   name="hoten"
//                   required
//                   ref="hoten"
//                   onChange={handleChange}
//                   value={formValue.hoten}
//                 />
//               </div>

//               <div className="input-group form-group">
//                 <span className="form-icon">
//                   <UserOutlined />
//                 </span>
//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="username"
//                   name="username"
//                   required
//                   ref="username"
//                   onChange={handleChange}
//                   value={formValue.username}
//                 />
//               </div>

//               <div className="input-group form-group">
//                 <span className="form-icon">
//                   <KeyOutlined />
//                 </span>

//                 <input
//                   type="password"
//                   className="form-control"
//                   placeholder="password"
//                   name="pass"
//                   required
//                   ref="pass"
//                   onChange={handleChange}
//                   value={formValue.pass}
//                 />
//               </div>
//               {/* <div className="input-group form-group">
//                 <span className="form-icon">
//                   <KeyOutlined />
//                 </span>

//                 <input
//                   type="password"
//                   className="form-control"
//                   placeholder="Confirm password"
//                   name="passwordConfirm"
//                   required
//                   onChange={(e) => setPasswordConfirm(e.target.value)}
//                   value={passwordConfirm}
//                 />
//               </div> */}
//               <div className="form-group">
//                 <Button
//                   type="submit"
//                   defaultValue="Login"
//                   // onClick={handleSubmit}
//                   className="btn float-right login_btn"
//                 >
//                   REGISTER
//                 </Button>
//               </div>
//             </form>
//           </div>
//           <div className="card-footer">
//             <div className="signup links">
//               Are you have an account?<Link to="/login">Sign In</Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RegisterPage;
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
class RegisterPage extends Component {
  state = {
    username: "",
    hoten:"",
    password: "",
    passwordconfirm:""
    
  };
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.password !== this.state.passwordconfirm) {
      alert('Mật khẩu không trùng nhau')
    }
    else {
      axios
      .post("https://localhost:44315/api/taikhoans/register", {
        hoten: this.state.hoten,
        username:this.state.username,
        pass:this.state.password,
        status: '1',
        roles:'0'

      })
      .then((res) => {
        console.log(res.data);
        if (res.data == false) {
          alert("Username tồn tại");
        } else {
          alert("đăng kí thành công");
          axios.post("https://localhost:44315/api/logs", {
          idkh: '',
          message: 'Register',
          ip:'1.127.134.2',
          date: Date()
      })
          this.props.history.push("/login");
        }
      });
    }
    console.log(this.state)
   
  };
  //

  render() {
    const { username, password,hoten,passwordconfirm } = this.state;
    return (
      <div
        className="container loginpage"
        style={{ backgroundColor: "lightgray" }}
      >
        <div className="d-flex justify-content-center h-100">
          <div className="card-register">
            <div className="card-header">
              <h3 style={{ paddingTop: 20 }}>Đăng kí</h3>
             
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
                    placeholder="Nhập họ tên"
                    name="hoten"
                    required
                    ref="hoten"
                  
                    onChange={this.handleChange}
                    value={hoten}
                  />
                </div>
                <div className="input-group form-group">
                  <span className="form-icon">
                   
                    <UserOutlined />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nhập tên đăng nhập"
                    name="username"
                    required
                    ref="username"
                  
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
                    placeholder="Nhập mật khẩu"
                    name="password"
                    ref="password"
                    required
                    onChange={this.handleChange}
                    value={password}
                  />
                </div>
                <div className="input-group form-group">
                  <span className="form-icon">
                    <KeyOutlined />
                  </span>

                  <input
                    type="password"
                    className="form-control"
                    placeholder="Nhập lại mật khẩu"
                    name="passwordconfirm"
                    ref="passwordconfirm"
                    required
                    onChange={this.handleChange}
                    value={passwordconfirm}
                  />
                </div>
                <div className="form-group">
                  
                  <button
                    type="submit"
                    defaultValue="Login"
                    className="btn float-right login_btn"
                  >
                    REGISTER
                  </button>
                </div>
              </form>
            </div>
            <div className="card-footer">
            <div className="signup links">
              Bạn đã có tài khoản<Link to="/login">Sign In</Link>
            </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RegisterPage;

