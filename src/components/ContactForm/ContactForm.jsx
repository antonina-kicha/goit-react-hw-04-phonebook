import PropTypes from 'prop-types';
import { Formik, Field, Form } from 'formik';
import styled from 'styled-components';

import {FormWrapper, Button} from './ContactForm.styled'
import { useState } from 'react';

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

export const ContactForm = ({onSubmit}) => {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    
    const handleInputChange = evt => {
        console.log(evt.currentTarget.name);
        switch (evt.currentTarget.name) {
            case "name":
                setName(evt.currentTarget.value);
                break;
            case "number":
                setNumber(evt.currentTarget.value);
                break;
            default:
                return;
        }
    }

    const handleSubmit = evt => {
        // evt.preventDefault();
        onSubmit({name, number});
        resetForm();
    }

    const resetForm = () => {
        setName('');
        setNumber('');
    }

    return (
      <FormWrapper>
        <Formik
        initialValues={{name: '', number: ''}}
      onSubmit={handleSubmit}
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
                    value={name} onChange={handleInputChange} />

            <label htmlFor="number">
                Contacts
            </label>
                <Input
                    id="number"
                    name="number"
                    type="tel"
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    value={number} onChange={handleInputChange} />

        <Button type="submit" >Add contact</Button>
      </FormWithStyle>
            </Formik>
            </FormWrapper>
    )
}

    ContactForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}
