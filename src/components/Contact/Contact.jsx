import React from "react";
import { useDispatch } from "react-redux";
import { deleteContact } from '../../redux/contacts/slice';
import style from './Contact.module.css';


const Contact = ({ contact }) => {
  const dispatch = useDispatch();

  return (
    <div className={style.contactContainer}>
      <p>{contact.name}: {contact.number}</p>
      <button className={style.btnDeleteContact} onClick={() => dispatch(deleteContact(contact.id))}>
        Delete
      </button>
    </div>
  );
};


export default Contact;