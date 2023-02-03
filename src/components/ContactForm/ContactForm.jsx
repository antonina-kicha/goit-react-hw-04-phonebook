import PropTypes from 'prop-types';
import { Formik, Field, Form } from 'formik';
import { Component } from 'react';
import styled from 'styled-components';

import {FormWrapper, Button} from './ContactForm.styled'

const Input = styled(Field)`
    width: 250px;
    height: 20px;
    `
    
const FormWithStyle = styled(Form)`
display: flex;
flex-wrap: wrap;
gap: 20px;
justify-content: space-between;
`;

export class ContactForm extends Component {
    static propTypes = {
    onSubmit: PropTypes.func.isRequired,
}

    state = {
            name: '',
            number: ''
    }
    
    handleInputChange = evt => {
        this.setState({[evt.currentTarget.name]: evt.currentTarget.value})
    }

    handleSubmit = evt => {
        // evt.preventDefault();
        this.props.onSubmit(this.state);
        this.resetForm();
    }

    resetForm = () => {
        this.setState({ name: '', number: '' });
    }

    render() {
    return (
      <FormWrapper>
        <Formik
        initialValues={{name: '', number: ''}}
      onSubmit={this.handleSubmit}
    >
      <FormWithStyle autoComplete = "off">
            <label htmlFor="name">
                Name
            </label>
                <Input
                    id="name"
                    name="name"
                    type="text"
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    value={this.state.name} onChange={this.handleInputChange} />

            <label htmlFor="number">
                Contacts
            </label>
                <Input
                    id="number"
                    name="number"
                    type="tel"
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    value={this.state.number} onChange={this.handleInputChange} />

        <Button type="submit" >Add contact</Button>
      </FormWithStyle>
            </Formik>
            </FormWrapper>
    )
  }

}
