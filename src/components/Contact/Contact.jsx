import { HiUser } from "react-icons/hi";
import { HiPhone } from "react-icons/hi";
import style from './Contact.module.css';

const Contact = ({ contact, onDelete }) => {
    const { name, number } = contact;

    const handleDelete = () => {
        onDelete(contact.id);
    };

    return (
        <div className={style.container}>
            <div>
                <div className={style.info}><HiUser className={style.icon} />{name}</div>
                <div className={style.info}><HiPhone className={style.icon} />{number}</div> 
            </div>
            <button className={style.button} onClick={handleDelete}>Delete</button>
        </div>
    );
}

export default Contact;