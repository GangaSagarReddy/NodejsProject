import "./App.css";
import FooterComponent from "./components/FooterComponent";
import HeaderComponent from "./components/HeaderComponent";
import ListEmployeeComponent from "./components/ListEmployeeComponent";
import { BrowserRouter as Router, Route } from "react-router-dom";
import React from "react";
import CreateEmployeeComponent from "./components/CreateEmployeeComponent";
import UpdateEmployeeComponent from "./components/UpdateEmployeeComponent";
import ViewEmployeeComponent from "./components/ViewEmployeeComponent";
import Home from "./components/Loginpage";
import Register from "./components/Register";
//import { Switch } from "@material-ui/core";
import { Routes } from "react-router-dom";
import { Switch } from "@material-ui/core";
function App() {
  return ( 
    <div>
      <Router>
        {/* <HeaderComponent /> */}
        <div className="contain">
          <Routes>
            {/* <Route exact path="/"  element={<ListEmployeeComponent />}></Route> */}
            <Route path="/" element={< Home/>} />
            <Route path="/register" element={< Register/>} />
            <Route
              path="/employees"
              element={<ListEmployeeComponent />}
            ></Route>
            <Route path="/add-employee" element={<CreateEmployeeComponent />} />
            <Route path ="/update-employee/:id" element={<UpdateEmployeeComponent/>}></Route>
            <Route path ="/view-employee/:id"  element= {<ViewEmployeeComponent/>}></Route>
            {/* <ListEmployeeComponent /> */}
          </Routes>
        </div>
        {/* <FooterComponent /> */}
      </Router>
    </div>
  );
}

export default App;
