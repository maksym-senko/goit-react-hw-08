import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addContact } from '../../redux/contacts/operations';
import style from './ContactForm.module.css';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState(''); // Змінив 'phone' на 'number'
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Диспатчимо додавання контакту з правильними властивостями
    dispatch(addContact({ name, number }));
    setName('');  // Очищаємо поле після відправки
    setNumber(''); // Очищаємо поле після відправки
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
        value={number} // Змінив 'phone' на 'number'
        onChange={(e) => setNumber(e.target.value)}
        placeholder="Number"
        required
      />
      <button type="submit" className={style.btnAddContact}>Add Contact</button>
    </form>
  );
};

export default ContactForm;
