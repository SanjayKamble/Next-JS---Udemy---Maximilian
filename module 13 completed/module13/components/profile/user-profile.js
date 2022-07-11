// import { getSession } from 'next-auth/react';
// import { useState } from 'react';
// import { useEffect } from 'react';
import ProfileForm from './profile-form';
import classes from './user-profile.module.css';

function UserProfile() {
  // // Redirect away if NOT auth

  // const [isLoading,setIsLoading]= useState(true);

  // useEffect(() => {
  //   //will get the current session
  //   getSession().then((session)=>{
  //     if(!session){
  //       window.location.href = '/auth';
  //     }else {
  //       setIsLoading(false);
  //     }
  //   });
  
   
  // }, []);// if empty array is used, the effect will run only once immediately the component is rendered before any update or refresh
  // // and not thereafter on its own

  // if(isLoading){
  //   return <p className={classes.profile}>Loading...</p>
  // }
  



  //passwordData is the data passed by the onChangePassword() from ProfileForm component
async function changePasswordHandler(passwordData){

const response = await fetch('/api/user/change-password',{
  method : 'PATCH',
  body : JSON.stringify(passwordData),
  headers :{
    'Content-Type' : 'application/json'
  }
});

const data = await response.json();

console.log(data);
}

  return (
      <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm onChangePassword= {changePasswordHandler}/>
     
    </section>
  );
}

export default UserProfile;
