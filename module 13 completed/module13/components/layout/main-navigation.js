import Link from 'next/link';

import classes from './main-navigation.module.css';
import { useSession,signOut } from 'next-auth/react';

function MainNavigation() {
  //data- object that has details about current session
  //status- loading/authenticated that tells whether we are currently logged in or not
  const { data, status } = useSession();

  // console.log('data :' + data);// will give unexpected output
  // console.log(data);
  // console.log('status :' + status);
  function logoutHandler(){
    //though it return promise, we wont use it
    //because the useSession state will update the component as soon as the signOut() is invoked and cookies will be cleared
      signOut();
  }
  
  return (
    <header className={classes.header}>
      <Link href='/'>
        <a>
          <div className={classes.logo}>Next Auth</div>
        </a>
      </Link>
      <nav>
        <ul>
          {(!data && (status === 'loading' || 'unauthenticated')) && (<li>
            <Link href='/auth'>Login</Link>
          </li>)}

          {data && (<li>
            <Link href='/profile'>Profile</Link>
          </li>)}

            {data && (
              <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
            )}
          
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
