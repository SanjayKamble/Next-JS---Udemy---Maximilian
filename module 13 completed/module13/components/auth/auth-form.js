import { useState,useRef } from 'react';
import classes from './auth-form.module.css';
import { signIn } from "next-auth/react";
import { useRouter } from 'next/router';


//function to create new user
async function createUser(email,password){
 
  // configuring the request
  const response =await fetch('/api/auth/signup',{
    method:'POST',
    body:JSON.stringify({email,password}),
    headers:{
      'Content-Type':'application/json'
    }
  });

  //getting data from request

  const data = await response.json();

  if(!response.ok){
    throw new Error(data.message || 'something went wrong');
  }
  
  return data;
}

function AuthForm() {

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  async function submitHandler(event){
    event.preventDefault();
    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;

    if(isLogin){
     
      //we dont need to send our own http request , i.e. we dont need to configure by ourself
      // signIn() function will invoke authorize() function from [..nextauth].js
      // because authorize() function is called automatically when it receives any incoming login request 
      //first argument to signIn function is the provider 
      //second argument is the parameter to authorize() function of that provider
     

      const result = await signIn('credentials',{
        redirect : false,// because by default if any error occurs we will be redirected to another page
        email:email,
        password:password,
      });

      

      if(!result.error){
       // if the user has logged in successfully, then login form should dissapear and redirect to profile page
       //replace function will replace the current url with the new one.
       //page will  be redirected to new page if user logged in successfully
       router.replace('/profile');
        
      }
    }else{
      //create new user
      try {
        const result = await createUser(email,password);
        
      } catch (error) {
        console.log('error while creating new user '+error);
      }
    }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' autoComplete="true" ref={passwordInputRef}/>
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
