import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addContact } from '../../redux/contacts/operations';
import style from './ContactForm.module.css';


const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState(''); 
  const dispatch = useDispatch();


  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(addContact({ name, number }));
    setName('');  
    setNumber('');
  };


  return (
    <form onSubmit={handleSubmit} className={style.formContainer}>
      <input
        className={style.inputText}
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />
      <input
        className={style.inputText}
        type="tel"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        placeholder="Number"
        required
      />
      <button type="submit" className={style.btnAddContact}>Add Contact</button>
    </form>
  );
};


export default ContactForm;
