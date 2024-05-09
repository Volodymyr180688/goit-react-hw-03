import {useId} from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import style from './ContactForm.module.css'

const ContactForm = ({ onSubmit }) => {
  const initialValues = {
    name: '',
    number: '',
    };
    const fieldId = useId();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Required').min(3, 'Too Short!').max(50, 'Too Long!'),
    number: Yup.string()
      .required('Required')
      .min(3, 'Too Short!')
      .max(50,  'Too Long!'),
  });

  const formatPhoneNumber = (value) => {
    if (!value) return value;
    const phoneNumber = value.replace(/[^\d]/g, '');
    const match = phoneNumber.match(/^(\d{3})(\d{0,2})(\d{0,2})$/);
    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`;
    }
    return value;
  };

  const handleSubmit = (values, { resetForm }) => {
    onSubmit({ ...values, number: formatPhoneNumber(values.number) });
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
          <Form className={style.container}>
              <label htmlFor="name" id={`${fieldId}-name`}>Name</label>
        <Field type="text" name="name" id={`${fieldId}-name`} />
              <ErrorMessage className={style.error} name="name" component="span" />
              <label htmlFor="number" id={`${fieldId}-number`}>Number</label>
        <Field type="text" name="number" id={`${fieldId}-number`} />
        <ErrorMessage className={style.error} name="number" component="span" />
        <button className={style.button} type="submit">Add Contact</button>
      </Form>
    </Formik>
  );
}

export default ContactForm;