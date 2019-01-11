import React, { Component } from 'react';
import axios from 'axios';
const AppContext = React.createContext();

export class Provider extends Component {

    state = {
        userInfo: [],
        isAuthenticated: false
    }

    signIn = (email, password) => {
        const cred = `${email}:${password}`;
        const auth = 'Basic ' + new Buffer(cred).toString('base64');//creates a base64 encoded string to pass with the basic Auth header
        //get request with users credntials, saves 
        axios.get('http://localhost:5000/api/users', { headers: { 'Authorization': auth } })
            .then(res => this.setState({
                userInfo: res.data,
                isAuthenticated: true
            }))
            .catch(err => console.log('Error fetching data!', err));
    }

    signOut = () => {
        this.setState({
            userInfo: [],
            isAuthenticated: false
        })
    }

    lastPage = (history) => {
        history.history.goBack();
    }

    render() {
        return (
            <AppContext.Provider value={{
                user: this.state.userInfo,
                authenticated: this.state.isAuthenticated,
                actions: {
                    signIn: this.signIn,
                    signOut: this.signOut,
                    lastPage: this.lastPage
                }
            }}>
                {this.props.children}
            </AppContext.Provider>
        );
    }
}

export const Consumer = AppContext.Consumer;