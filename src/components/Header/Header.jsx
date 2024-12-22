import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/auth/operations";
import { selectIsLoggedIn, selectUser } from "../../redux/auth/selectors";
import style from './Header.module.css';


const Header = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  const handleLogout = () => {
    console.log("Logout button clicked");
    dispatch(logout())
      .unwrap()
      .then(() => {
        console.log("Logout successful");
      })
      .catch((error) => {
        console.error("Logout failed:", error.message);
        alert("Logout failed. Please try again.");
      });
  };


  return (
    <header>
      <nav className={style.navigation}>
        <NavLink to="/">Home</NavLink>
        {isLoggedIn && <NavLink to="/contacts">Contacts</NavLink>}
        <div>
        {isLoggedIn ? (
          <div>
            <span className={style.userInfo}>Welcome, {user.name}</span>
            <button className={style.btnLogout} onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div className={style.btnContainer}>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </div>
        )}
      </div>
      </nav>
    </header>
  );
};


export default Header;
