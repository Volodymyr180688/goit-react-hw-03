import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import style from './ContactForm.module.css';

const ContactForm = ({ onSubmit }) => {
  const initialValues = {
    name: '',
    number: '',
  };

  const [formattedNumber, setFormattedNumber] = useState('');

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Required').min(3, 'Too Short!').max(50, 'Too Long!'),
    number: Yup.string()
      .required('Required')
      .min(3, 'Too Short!')
      .max(50, 'Too Long!')
      .matches(/^\d{0,3}-?\d{0,2}-?\d{0,2}$/, 'Invalid phone number format'),
  });

  const formatPhoneNumber = (value) => {
    const phoneNumber = value.replace(/[^\d]/g, '');
    const match = phoneNumber.match(/^(\d{0,3})(\d{0,2})(\d{0,2})$/);
    if (match) {
      const formatted = match.slice(1).filter(Boolean).join('-');
      setFormattedNumber(formatted);
    } else {
      setFormattedNumber('');
    }
  };

  const handleSubmit = (values, { resetForm }) => {
    onSubmit(values);
    resetForm();
    setFormattedNumber('');
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {(formikProps) => (
        <Form className={style.container}>
          <label htmlFor="name">Name</label>
          <Field type="text" name="name" />
          <ErrorMessage className={style.error} name="name" component="span" />
          <label htmlFor="number">Number</label>
          <Field
            type="text"
            name="number"
            value={formattedNumber}
            onChange={(e) => {
              formatPhoneNumber(e.target.value);
              formikProps.handleChange(e); // Додано оновлення значення у Formik
            }}
          />
          <ErrorMessage className={style.error} name="number" component="span" />
          <button className={style.button} type="submit">
            Add Contact
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ContactForm;