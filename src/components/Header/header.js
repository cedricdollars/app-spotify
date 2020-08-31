import React from "react";
import "./header.css";
import icon from "./icon.svg";

const Header = () => {
  return (
    <header>
      <img src={icon} alt="icon player music" width="44" height="44" />
      <h1>Music Player </h1>
    </header>
  );
};
export default Header;
