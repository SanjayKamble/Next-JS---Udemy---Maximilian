import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useState } from 'react';
import AuthForm from '../components/auth/auth-form';

function AuthPage() {


  // redirect to homepage if already logged in 
const [isLoading, setIsLoading]=useState(true);
  const router = useRouter();

  useEffect(() => {
    getSession().then(session => {
        if(session){
          router.replace('/')
        }else{
          setIsLoading(false);
        }
    })
  }, [router]);

  if(isLoading){
    return <h2>Loading...</h2>
  }


  return <AuthForm />;
}

export default AuthPage;
