import { Component } from 'react';
import { ContactForm } from './ContactForm/ContactForm'
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { Container } from './App.styled'

import { nanoid } from 'nanoid';

export class App extends Component {
  state = {
    contacts: [
    {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
    {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
    {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
    {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
  ],
    filter: '',
  }
  
  componentDidMount() {
    const startContacts = localStorage.getItem('contacts');
    const parsedStartContacts = JSON.parse(startContacts);
    if (parsedStartContacts) {
        this.setState({ contacts: parsedStartContacts });
    }
}

  componentDidUpdate(prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
    }
  }

  handleSubmitForm = ({name, number}) => {
    const findRepeat = this.state.contacts.find(contact =>
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
    this.setState(prevState => ({
      contacts: [...prevState.contacts, contact],
    }))
    }
  }

  changeFilter = (evt) => {
    this.setState({ filter: evt.currentTarget.value });
  } 

  getVisibleContasts = () => {
    const { contacts, filter } = this.state;

    const normalisedFilter = filter.toLowerCase();
    const visebleContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalisedFilter));
    return visebleContacts;
  }

  deleteContacts = (idContact) => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== idContact),
    }))
  }
  
  render() {

    return (
      <Container>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.handleSubmitForm} />
        <h2>Contacts</h2>
        <Filter filterValue={this.state.filter} changeFilter={this.changeFilter} />
        <ContactList listItems={this.getVisibleContasts()} onDelete={this.deleteContacts} />
      </Container>
    )
  }
}

