import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/auth/operations";
import { toast } from "react-hot-toast";
import style from './LoginPage.module.css';


const LoginPage = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const error = useSelector((state) => state.auth.error);


  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };


  useEffect(() => {
    if (error) {
      toast.error(error); 
    }
  }, [error]);


  return (
    <div className={style.loginPageContainer}>
      <h2 className={style.loginPageTitle}>Login</h2>
      <form className={style.loginPageForm} onSubmit={handleSubmit}>
        <label className={style.label}>
          Email:
          <input
            className={style.inputText}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label className={style.label}>
          Password:
          <input
            className={style.inputText}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button className={style.btnLogin} type="submit">Login</button>
      </form>
    </div>
  );
};


export default LoginPage;
