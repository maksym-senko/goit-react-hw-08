import { NavLink } from "react-router-dom";
import style from "./authNav.module.css";


const AuthNav = () => {
  return (
    <div className={style.authContainer}>
      <NavLink className={style.authLink} to="/register">Register</NavLink>
      <NavLink className={style.authLink} to="/login">Login</NavLink>
    </div>
  );
};


export default AuthNav;