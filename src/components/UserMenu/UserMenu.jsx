import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors";
import { logout } from "../../redux/auth/operations";
import style from "./UserMenu.module.css";


const UserMenu = () => {
    const dispatch = useDispatch();
    const { name } = useSelector(selectUser);
  
    return (
      <div className={style.userMenuContainer}>
        <p className={style.userMenuText}>Welcome, {name}</p>
        <button className={style.btnLogout} onClick={() => dispatch(logout())}>Logout</button>
      </div>
    );
  };


export default UserMenu;