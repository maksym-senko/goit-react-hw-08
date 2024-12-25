import React from "react";
import Navigation from "../Navigation/Navigation";
import style from "./Header.module.css";


const Header = () => {
  return (
    <header className={style.headerContainer}>
      <Navigation />
    </header>
  );
};


export default Header;
