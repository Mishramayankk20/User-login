import React, { useState } from "react";
//import "./login.css";
import axios from "axios";
import * as Icon from "react-bootstrap-icons";
//import cookie from 'react-cookie'
import Cookies from 'js-cookie';
import { useHistory } from "react-router-dom";
const Login = () => {
  const history = useHistory();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

 
 
  const Login1 = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/login", user,{ withCredentials: true })
   .then((res) => {
      //console.log(res.data.message);
      //console.log(res.status);
      if(res.data.message=='wrong password') {
        alert(res.data.message);
      }
      else if(res.data.message =='user not registered') {
        alert(res.data.message);
      }
      else {
        console.log("status 200");
        history.push('/home');
       // console.log(Cookies.get('token'));
       console.log("login")
      } 
    })
    .catch(err => {
      console.error(err);
      alert('Error logging in please try again');
    });
  };

  return (
    <div className="login_hide">
     
        <div className="container  col-6 ">
          <div className="w-75 mx-auto shadow p-5 bg-light">
            <h2 className="text-center mb-4">
              <Icon.DoorOpenFill size={27} /> Login{" "}
            </h2>
            <form onSubmit={Login1}>
              <div className="col-12 mx-5 my-3">
                <div className="form-group">
                  <input
                    type="text"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    placeholder="Enter your Email"
                  />
                </div>
              </div>
              <div className="col-12 mx-5 my-3">
                <div className="form-group">
                  <input
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                    placeholder="Enter your Password"
                  />
                </div>
              </div>
              <hr />
              <button className="btn btn-success col-8 mx-5 my-2" type="submit">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
  );
};
export default Login;
