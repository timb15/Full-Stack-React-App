import React from 'react';
import {Redirect} from 'react-router-dom';

const UserSignOut = ({signOut}) => {

    signOut();

    return (
        <Redirect push to='/' />
    )
}

export default UserSignOut;