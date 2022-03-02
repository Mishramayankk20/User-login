import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";
//import { useHistory } from "react-router-dom";
import Cookies from 'js-cookie';
import * as Icon from "react-bootstrap-icons";
const Home = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    loadUsers();
  }, []);
  const token = Cookies.get('token');
  const loadUsers = async () => {
    await axios.get("http://localhost:5000/",{ headers: {"Authorization" : `${token}`}}).then(res=>{
      console.log(res.data);
      setUsers(res.data); 
     
    })
  }

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:5000/${id}`, users);
    loadUsers();
    //history.push("/");
  };
 
  return (
    <div className="container">
    <div style={{ display: "flex" }}>
    <NavLink className="btn nav-link float-right" exact to="/home/adduser">
      <button className="btn  btn-light py-2">
        <Icon.PersonPlusFill size={30} />
      </button>
    </NavLink>
  </div>
  <div className="py-2">
    <table className="table table-light table-hover table-bordered ">
      <caption>users</caption>
      <thead className="table-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">First_Name</th>
          <th scope="col">Last_Name</th>
          <th scope="col">Email</th>
          <th scope="col">phone</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr>
            <td>{user.id}</td>
            <td>{user.first_name}</td>
            <td>{user.last_name}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
            <td>
              <Link to={`/home/viewuser/${user.id}`} className="btn btn-primary mx-2">
                <Icon.EyeFill />
              </Link>
              <Link to={`/home/edituser/${user.id}`} className="btn btn-success mx-2">
                <Icon.PenFill />
              </Link>
              <Link to={`/home/`} className="btn btn-danger" onClick={() => deleteUser(user.id)}>
                <Icon.TrashFill />
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
      
  );
};
export default Home;
