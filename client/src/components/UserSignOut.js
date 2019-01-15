import React from 'react';
import { Redirect } from 'react-router-dom';

const UserSignOut = ({ signOut }) => {
  signOut();
  return (
    <Redirect to='/' />
  )

}

export default UserSignOut;