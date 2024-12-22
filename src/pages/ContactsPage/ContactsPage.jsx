import React from "react";
import { Toaster } from "react-hot-toast";
import ContactList from '../../components/ContactList/ContactList';
import ContactForm from '../../components/ContactForm/ContactForm';
import SearchBox from '../../components/SearchBox/SearchBox';
import style from './ContactsPage.module.css';


const ContactsPage = () => {
  return (
    <div className={style.contactsPageContainer}>
      <h1>Contacts</h1>
      <ContactForm />
      <SearchBox />
      <ContactList />
    </div>
  );
};


export default ContactsPage;
