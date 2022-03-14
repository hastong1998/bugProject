import React from "react";
import { NavLink } from "react-router-dom";

export default function MenuCyberbugs() {
  return (
    <div className="menu">
      <div className="account">
        <div className="avatar">
          <img src={require("../../assets/img/download.jfif")} alt />
        </div>
        <div className="account-info">
          <p>CyberLearn.vn</p>
          <p>Report bugs</p>
        </div>
      </div>
      <div className="control">
        <div>
          <NavLink
            to="/cyberbugs"
            style={{ color: "black" }}
            activeStyle={{ color: "blue", fontWeight: "bold" }}
            activeClassName="active"
          >
            <i className="fa fa-credit-card mr-3" />
            <span>Cyber Board</span>
          </NavLink>
        </div>
        <div>
          <NavLink
            activeStyle={{ color: "blue", fontWeight: "bold" }}
            style={{ color: "black" }}
            to="/createproject"
            activeClassName="active"
          >
            <i className="fa fa-cog  mr-3" />
            <span>Create project</span>
          </NavLink>
        </div>
        <div>
          <NavLink
            activeStyle={{ color: "blue", fontWeight: "bold" }}
            style={{ color: "black" }}
            to="/projectManagement"
            activeClassName="active"
          >
            <i className="fa fa-truck mr-3 " />
            <span>Project Management</span>
          </NavLink>
        </div>
        <div>
          <NavLink
            activeStyle={{ color: "blue", fontWeight: "bold" }}
            style={{ color: "black" }}
            to="/usermanagerment"
            activeClassName="active"
          >
            <i className="fa fa-users mr-3" />
            <span>User Management</span>
          </NavLink>
        </div>
      </div>
      <div className="feature">
        <div>
          <i className="fa fa-equals  mr-3" />
          <span>Issues and filters</span>
        </div>
        <div>
          <i className="fa fa-paste mr-3" />
          <span>Pages</span>
        </div>
        <div>
          <i className="fa fa-location-arrow mr-3" />
          <span>Reports</span>
        </div>
        <div>
          <i className="fa fa-box mr-3" />
          <span>Components</span>
        </div>
      </div>
    </div>
  );
}
