import { ContactForm } from './ContactForm/ContactForm'
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { Container } from './App.styled'

import { nanoid } from 'nanoid';
import { useState } from 'react';
import { useEffect } from 'react';

const getInitialContactsState = () => {
  const initiailContacts = [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ];

  const startContacts = localStorage.getItem('contacts');
    const parsedStartContacts = JSON.parse(startContacts);
    if (parsedStartContacts) {
       return parsedStartContacts;
    } else {
      return initiailContacts;
    };
};

export const App = () => {
  const [contacts, setContacts] = useState(getInitialContactsState);
  const [filter, setFilter] = useState('');
  
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts])

 
  const handleSubmitForm = ({name, number}) => {
    const findRepeat = contacts.find(contact =>
      contact.name.toLowerCase() === name.toLowerCase());
    if (findRepeat) {
      alert(`${name} is already in contacts`);
    }
    else {
      const contact = {
      id: nanoid(),
      name,
      number,
      }
      
    setContacts(prevState => [...prevState, contact])
    }
  }

  const changeFilter = (evt) => {
    setFilter(evt.currentTarget.value);
  } 

  const getVisibleContasts = () => {
    const normalisedFilter = filter.toLowerCase();
    const visebleContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalisedFilter));
    return visebleContacts;
  }

  const deleteContacts = (idContact) => {
    setContacts(contacts => (contacts.filter(contact => contact.id !== idContact)))
  }
  
  return (
      <Container>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={handleSubmitForm} />
        <h2>Contacts</h2>
        <Filter filterValue={filter} changeFilter={changeFilter} />
        <ContactList listItems={getVisibleContasts()} onDelete={deleteContacts} />
      </Container>
    )
}

