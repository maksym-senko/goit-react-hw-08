import React from "react";
import style from './HomePage.module.css';
import Layer from "router/lib/layer";


const HomePage = () => {
  return (
    <div className={style.homePageContainer}>
      <h1>Welcome to the Phonebook</h1>
      <p>Manage your contacts efficiently and securely.</p>
    </div>
  );
};


export default HomePage;
