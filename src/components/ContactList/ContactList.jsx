import Contact from '../Contact/Contact';
import style from './ContactList.module.css';

const ContactList = ({ contacts, onDelete }) => {
  return (
    <ul className={style.container}>
      {contacts.map(contact => (
        <li key={contact.id}>
          <Contact key={contact.id} contact={contact} onDelete={onDelete} />
        </li>
      ))}
    </ul>
  );
}

export default ContactList;