import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/auth/operations";
import style from "./RegisterPage.module.css";


const RegistrationPage = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.error);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });


  const handleSubmit = (e) => {
    e.preventDefault();


    if (!formData.name || !formData.email || !formData.password) {
      alert("All fields are required.");
      return;
    }
    if (!formData.email.includes("@")) {
      alert("Invalid email format.");
      return;
    }
    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }


    dispatch(register(formData));
  };


  return (
    <div className={style.registerPageContainer}>
      <h2 className={style.registerPageTitle}>Register</h2>
      <form className={style.registerPageForm} onSubmit={handleSubmit}>
        <label className={style.label}>
          Name:
          <input
            className={style.inputText}
            type="text"
            placeholder="Enter your name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </label>
        <label className={style.label}>
          Email:
          <input
            className={style.inputText}
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </label>
        <label className={style.label}>
          Password:
          <input
            className={style.inputText}
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
        </label>
        <button className={style.btnRegister} type="submit">Register</button>
        {error && <p className={style.error}>{error}</p>}
      </form>
    </div>
  );
};


export default RegistrationPage;
