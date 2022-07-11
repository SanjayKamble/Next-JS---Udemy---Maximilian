import { useRef, useState } from "react";

function HomePage() {

  const [feedbackItems, setFeedbackItems] = useState([]);
  const emailInputRef = useRef();
  const feedbackInputRef = useRef();

  //handler function for form submission
  function submitFormHandler(event) {
    // we get this event object automatically
    // because we are binding this function to onsubmit prop on the form.
    //it will be triggered when built in submit event  is triggered(when that is fired) and we get access to that object

    event.preventDefault(); // to prevent default behaviour of the browser,where the page is reloaded
    // because the browser sends a request automatically

    const enteredEmail = emailInputRef.current.value;
    const enteredFeedback = feedbackInputRef.current.value; // In .current a pointer is saved
    // which points to the element object in which ref id is defined.
    //this object has a value property which holds current  values of that object
    //it holds value entered by the user

    const reqBody = {
      email: enteredEmail,
      text: enteredFeedback,
    };
    console.log(JSON.stringify(reqBody));
    fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify(reqBody),

      headers: {
        // specifying that the data is in the json format
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
    // when form submit button is clicked, we want to send http request with above javascript.
    // we do this by fetch() or by third party library like AXIOS



  }
  function loadFeedbackHandler() {
    fetch('/api/feedback').
      then((response) => response.json()).
      then((data) => {
        setFeedbackItems(data.feedback)
      })
  }
  return (
    <div>
      <h1>The Home Page</h1>
      <form onSubmit={submitFormHandler}>
        <div>
          <label htmlFor="email">Your email address</label>
          <input type="email" id="email" ref={emailInputRef} />
        </div>
        <div>
          <label htmlFor="feedback">Your feedback</label>
          <textarea id="feedback" rows="5" ref={feedbackInputRef}></textarea>
        </div>
        <button>send feedback</button>
      </form>

      <hr />
      <button onClick={loadFeedbackHandler}> load feedback</button>
      <ul>

        {feedbackItems.map((item) => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
