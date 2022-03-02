import React from "react";
import * as Icon from "react-bootstrap-icons";
import { useHistory } from "react-router-dom";
function Dashboard() {
    const history = useHistory();
    const login_page = async (e) => {
        e.preventDefault();
          history.push("/login");
        };
   return (
    <div className="dashboard_hide">
    <div className="container  col-6 ">
      <div className="w-75 mx-auto shadow p-5 bg-light">
        <h2 className="text-center mb-4">
          <Icon.DashSquareFill size={27} /> Dashboard
        </h2>
            <button className="btn col-12 btn-primary my-3" onClick={login_page}>Admin</button>
            <button className='btn col-12 btn-secondary'> Student</button>
      </div>
    </div>
  </div>
      );
}
export default Dashboard;
