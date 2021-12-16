import React, { Component, useState } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default function MenuExampleVerticalSecondary() {
  // state = { activeItem: "home" };
  const pathname = window.location.pathname;
  const path = pathname === "/" ? "home" : pathname.substring(1);
  const [activeItem, setactiveItem] = useState(path);
  const handleItemClick = (e, { name }) => setactiveItem(name);

  // const { activeItem } = state;

  return (
    <Menu pointing secondary vertical color="teal">
      <Menu.Item
        name="home"
        active={activeItem === "home"}
        onClick={handleItemClick}
        as={Link}
        to="/"
      />
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
    </Menu>
  );
}
