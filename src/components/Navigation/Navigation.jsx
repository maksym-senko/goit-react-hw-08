import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import UserMenu from "../UserMenu/UserMenu";
import style from "./Navigation.module.css";
import AuthNav from "../AuthNav/AuthNav";


const Navigation = () => {
    const isLoggedIn = useSelector(selectIsLoggedIn);

    return (
        <nav className={style.navigation}>
        <NavLink className={style.navLink} to="/">Home</NavLink>
        {isLoggedIn && <NavLink className={style.navLink} to="/contacts">Contacts</NavLink>}
        <div>
        {isLoggedIn ? (
            <UserMenu />
        ) : (
            <div>
                <AuthNav />
            </div>
        )}
        </div>
    </nav>
  );
};


export default Navigation;