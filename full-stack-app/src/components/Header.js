import React from 'react';
import {NavLink} from 'react-router-dom';

const Header = ({user, authentication}) => {

    return (
        (authentication)
        ?
        <div className="header">
            <div className="bounds">
                <h1 className="header--logo">Courses</h1>
                <nav>
                    <span>Welcome {user.firstName} {user.lastName}</span>
                    <NavLink className="signout" to="/sign-out">Sign Out</NavLink>
                </nav>
            </div>
        </div>
        :
        <div className="header">
            <div className="bounds">
                <h1 className="header--logo">Courses</h1>
                <nav>
                    <NavLink className="signup" to="/sign-up">Sign Up</NavLink>
                    <NavLink className="signin" to="/sign-in">Sign In</NavLink>
                </nav>
            </div>
        </div>
    )
}

export default Header;