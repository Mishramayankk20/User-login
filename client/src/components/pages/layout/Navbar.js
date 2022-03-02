import axios from "axios";
import React  from "react";
import { NavLink } from "react-router-dom";
import Cookies from 'js-cookie';
import { useHistory } from "react-router-dom";

const Navbar = () => {
  const history = useHistory();

  const logout = async (e) =>{
    e.preventDefault();
    await axios.get("http://localhost:5000/logout")
   
    .then((res) => {
     // console.log(res.data.token);
      if(res.status===200) {
        history.push('/');
        Cookies.remove('token');
       console.log("logout")
      } 
      else {
        const error = new Error(res.error);
        throw error;
      }
    })
    .catch(err => {
      console.error(err);
      alert('logout failed');
    });
  
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <NavLink className="navbar-brand" to="/home">
          User-management
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item ">
              <NavLink className="nav-link" exact to="/home">
                HOME
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" exact to="/home/about">
                ABOUT
              </NavLink>
            </li>
          </ul>
        </div>
        <button className="btn-secondary " onClick={logout}>
        Logout
      </button>
      </nav>
    </>
  );
};

export default Navbar;
