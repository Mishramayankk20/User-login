import React  from "react";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import Home from "./components/pages/Home";
import Contact from "./components/pages/Contact";
import About from "./components/pages/About";
import Navbar from "./components/pages/layout/Navbar";
import NotFound from "./components/pages/NotFound";

import { Route, Switch } from "react-router-dom";
import AddUser from "./components/users/AddUser";
import EditUser from "./components/users/EditUser";
import User from "./components/users/User";
import Login from "./components/pages/Login";
import WithAuth from "./WithAuth";
//import withAuth from "../../server/middleware";
//import Dashboard from "./components/pages/Dashboard";
function App() {
    return (
   
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Login/>
          </Route>
          <Route exact path="/home"  component= {Home }></Route>
        
        <Route exact path="/home/about">
          <About />
        </Route>
        <Route exact path="/home/contact">
          <Contact />
        </Route>
        <Route exact path="/home/adduser">
          <AddUser />
        </Route>
        <Route exact path="/home/edituser/:id">
          <EditUser />
        </Route>
        <Route exact path="/home/viewuser/:id">
          <User />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
        </Switch>
      </div>
    );
  }

export default App;
