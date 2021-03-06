import React, { Component, useContext, useState } from "react";
import { Menu, Input } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth";

export default function MenuExampleVerticalSecondary() {
  const { user, logout } = useContext(AuthContext);
  const pathname = window.location.pathname;

  const path = pathname === "/" ? "home" : pathname.substr(1);
  const [activeItem, setActiveItem] = useState(path);

  const handleItemClick = (e, { name }) => setActiveItem(name);

  const menuBar = user ? (
    <Menu pointing secondary size="massive" color="teal">
      <Menu.Item name={user.username} active as={Link} to="/" />

      <Menu.Menu position="right">
        <Menu.Item name="logout" onClick={logout} />
      </Menu.Menu>
    </Menu>
  ) : (
    <Menu secondary size="massive" color="teal">
      <Menu.Item
        name="home"
        active={activeItem === "home"}
        onClick={handleItemClick}
        as={Link}
        to="/"
      />

      <Menu.Menu position="right">
        <Menu.Item>
          <Input icon="search" placeholder="Search..." />
        </Menu.Item>
        <Menu.Item
          name="login"
          active={activeItem === "login"}
          onClick={handleItemClick}
          as={Link}
          to="/login"
        />
        <Menu.Item
          name="register"
          active={activeItem === "register"}
          onClick={handleItemClick}
          as={Link}
          to="/register"
        />

        {/* <Menu.Item
          name="logout"
          active={activeItem === "logout"}
          onClick={handleItemClick}
        /> */}
      </Menu.Menu>
    </Menu>
  );

  // const { activeItem } = state;

  return menuBar;
}
