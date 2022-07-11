import classes from './contact-form.module.css';
import { useState,useEffect } from 'react';
import Notification from '../ui/notification';


async function sendContactData(contactDetails) {
    const response = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(contactDetails),
        headers: {
            'Content-Type': 'application/json',
        }
    })

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'something went wrong')
    }
}

function ContactForm() {


    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredName, setEnteredName] = useState('');
    const [enteredMessage, setEnteredMessage] = useState('');
    const [requestStatus, setRequestStatus] = useState();// pending success and error
    const [requestError, setRequestError] = useState();


    // to remove notification after 3 seconds
    useEffect(()=>{
        if(requestStatus==='success'|| requestStatus==='error'){
            const timer = setTimeout(() => {
                setRequestStatus(null);
                setRequestError(null);
            }, 3000);

            return ()=>clearTimeout(timer);
        }


    },[requestStatus]);


    //sending data from client to API route
    async function sendMessageHandler(event) {
        event.preventDefault();

        //optional : add client side validation

        setRequestStatus('pending');

        try {

            await sendContactData({
                email: enteredEmail,
                name: enteredName,
                message: enteredMessage,
            });

            setRequestStatus('success');
            // to clear form after data was successfully added to the database

            setEnteredEmail('');
            setEnteredName('');
            setEnteredMessage('');

        } catch (error) {
            setRequestError(error.message);
            setRequestStatus('error');
        }

    }

    let notification;

    if (requestStatus === 'pending') {
        notification = {
            status: 'pending',
            title: 'sending message...',
            message: 'Your message is on its way,'
        }
    }
    if (requestStatus === 'success') {
        notification = {
            status: 'success',
            title: 'Success!',
            message: 'Your message has been sent successfully!'
        }
    }
    if (requestStatus === 'error') {
        notification = {
            status: 'error',
            title: 'Error!',
            message: requestError,
        }
    }



    return <section className={classes.contact}>
        <h1>how can i help you ?</h1>
        <form className={classes.form} onSubmit={sendMessageHandler}>
            <div className={classes.controls}>
                <div className={classes.control}>
                    <label htmlFor='email'>Your Email</label>
                    <input type='email' id='email' required value={enteredEmail}
                        onChange={event => setEnteredEmail(event.target.value)}></input>
                </div>
                <div className={classes.control}>
                    <label htmlFor='name'>Name</label>
                    <input type='text' id='name' required value={enteredName}
                        onChange={event => setEnteredName(event.target.value)}></input>
                </div>
            </div>
            <div className={classes.control}>
                <label htmlFor='message'>Message</label>
                <textarea id='message' rows='5' required value={enteredMessage}
                    onChange={event => setEnteredMessage(event.target.value)}></textarea>
            </div>

            <div className={classes.actions}>
                <button> Send Message</button>
            </div>
        </form>
        {notification && <Notification
            status={notification.status}
            title={notification.title}
            message={notification.message} />}
    </section>
} export default ContactForm;