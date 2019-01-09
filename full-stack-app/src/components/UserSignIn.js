import React, {Component} from 'react';
import axios from 'axios';

class UserSignIn extends Component {


    signIn = (event) => {
        event.preventDefault();
        const cred = `${this.email.value}:${this.password.value}`;
        const auth = 'Basic ' + new Buffer(cred).toString('base64');

        axios.get('http://localhost:5000/api/users', {headers:{'Authorization': auth}})
        .then(res => this.props.setUser(res))
        .then(this.changePath())
        .catch(err => console.log('Error fetching data!', err));

    }

    handleCancelButton = (event) => {
        event.preventDefault();
        this.changePath();
    }

    changePath = () => {
        let path = `/`;
        this.props.history.history.push(path);
    }



    render() {
        return(
        <div>
            <div className="bounds">
                <div className="grid-33 centered signin">
                <h1>Sign In</h1>
                <div>
                    <form onSubmit={this.signIn}>
                    <div><input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address"  ref={(input) => this.email = input}></input></div>
                    <div><input id="password" name="password" type="password" className="" placeholder="Password"  ref={(input) => this.password = input}></input></div>
                    <div className="grid-100 pad-bottom">
                        <button className="button" type="submit">Sign In</button>
                        <button className="button button-secondary" onClick={this.handleCancelButton}>Cancel</button>
                    </div>
                    </form>
                </div>
                <p>&nbsp;</p>
                <p>Don't have a user account? <a href="sign-up.html">Click here</a> to sign up!</p>
                </div>
            </div>
        </div>
        )
    }

}

export default UserSignIn;