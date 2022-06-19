import React, { useState } from "react";
import logo from "../assets/images/food.svg";
import { Popup } from "../components/Popup";
import { Link, Outlet } from "react-router-dom";

const Sidebar = () => {
  const [popupActive, setPopupActive] = useState(false);
  return (
    <div>
      <nav className="sidebar">
        <div className="sidebar__container">
          <div className="sidebar__logo">
            <img src={logo}></img>
          </div>
          <Link className="sidebar__navItem" to="/overview">
            My recipes
          </Link>
          <Link className="sidebar__navItem" to="/shopping-list">
            Shopping list
          </Link>
        </div>
        <button className="sidebar__addButton" onClick={() => setPopupActive(true)}>
          Add recipe
        </button>
      </nav>
      <Outlet />
      <Popup trigger={popupActive} setTrigger={setPopupActive}></Popup>
    </div>
  );
};

export default Sidebar;
