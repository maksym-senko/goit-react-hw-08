import React, { useState, useEffect } from "react"; // Додано useEffect
import { useSelector, useDispatch } from "react-redux";
import { fetchContacts, deleteContact } from "../../redux/contacts/operations";
import {
  selectContacts,
  selectIsLoading,
  selectError,
} from "../../redux/contacts/selectors";
import { selectSearchQuery } from "../../redux/filters/selectors";
import style from "./ContactList.module.css";


const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const searchQuery = useSelector(selectSearchQuery);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  
  const [showModal, setShowModal] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

 
  const filteredContacts = contacts?.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.number.includes(searchQuery)
  );

  if (isLoading) {
    return <div className={style.loading}>Loading...</div>;
  }

  if (error) {
    return <div className={style.error}>Error: {error}</div>;
  }

  if (!Array.isArray(contacts) || filteredContacts.length === 0) {
    return <div className={style.error}>No contacts found.</div>;
  }

  const handleDeleteClick = (id) => {
    setContactToDelete(id);
    setShowModal(true);
  };

  
  const handleConfirmDelete = () => {
    if (contactToDelete) {
      dispatch(deleteContact(contactToDelete)).then(() => {
        dispatch(fetchContacts());
        setShowModal(false);
      });
    }
  };


  const handleCancelDelete = () => {
    setShowModal(false);
  };


  return (
    <div>
      <ul className={style.contactList}>
        {filteredContacts.map(({ id, name, number }) => (
          <li className={style.contactItem} key={id}>
            {name}: <br /> {number}
            <button
              className={style.btnDelete}
              onClick={() => handleDeleteClick(id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>


      {showModal && (
        <div className={style.modal}>
          <div className={style.modalContent}>
            <p>Are you sure you want to delete this contact?</p>
            <button onClick={handleConfirmDelete}>Yes</button>
            <button onClick={handleCancelDelete}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};


export default ContactList;
