import React from 'react';
import { Redirect } from 'react-router-dom';


const UserSignOut = ({ signOut }) => {

  //signs out user then redirects to the home page
  signOut();
  return (
    <Redirect to='/' />
  )
}


export default UserSignOut;