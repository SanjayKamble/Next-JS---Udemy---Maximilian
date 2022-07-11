import { useRef, useContext } from 'react';
import classes from './newsletter-registration.module.css';
import NotificationContext from '../../store/notification-context';

function NewsletterRegistration() {
  const emailInputRef = useRef();
  const notificationCtx = useContext(NotificationContext);

  function registrationHandler(event) {

    event.preventDefault();
    
    const enteredEmail = emailInputRef.current.value;

    // just before  sending request , we want to show pending notification

    notificationCtx.showNotification({
      title: "signing up...",
      message: " registering for newsletter",
      status: "pending",
    });


    // fetch user input (state or refs)
    // optional: validate input
    // send valid data to API

    fetch('/api/newsletter', {
      method: 'POST',
      body: JSON.stringify({ email: enteredEmail }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      if(response.ok){
        return response.json();
      }

      response.json().then(data =>{
        throw new Error(data.message || "something went wrong")
      })
    })
      .then(data => {
        notificationCtx.showNotification({
          title: "Success",
          message: data.message || " Successfully registered for newsletter",
          status: "success",
        });
      }
      )
      .catch(error=>{
        notificationCtx.showNotification({
          title : "Error !!",
          message : error.message || " oops ! something went wrong",
          status : "error",
        });
      })
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type='email'
            id='email'
            placeholder='Your email'
            aria-label='Your email'
            ref={emailInputRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
