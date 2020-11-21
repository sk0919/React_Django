import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

class Login extends Component {

    constructor(props) {
        super(props)
         let loggedIn = false;

         const token = localStorage.getItem("token")
         if (token) loggedIn = true;
        //perform logic here and set loggedIn = true
        this.state = {
             email:'',
             password:'',
             loggedIn:loggedIn
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }


    //handle input field
    onChange(e){
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    //handle submit form
    async onSubmit(e){
        e.preventDefault();
        const headers = {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*"
        };
        
        console.log("on submit method called")
        const {email , password} = this.state;

        if(email==null || email=='' || email.trim()==''){
            return false;
        }else if (password==null || password.trim()=='' ){
            return false;
        }
        
        try{
            console.log("try method started ")
            const token = axios.post("http://127.0.0.1:8000/auth/login/", {email, password}, {headers}).then(resp => {
                if(resp.status == 200){
                    localStorage.setItem("token",resp.data.tokens);
                    this.setState({
                        loggedIn : true
                    });
                }else{
                    localStorage.removeItem("token")
                    this.setState({
                        loggedIn : false
                    });
                }          
            })
        }catch(err){
            this.setState({
                error: err.message
            })
        }
    }
    
    render() {
        if(this.state.loggedIn === true) {
            return <Redirect to="/home" />
        }
        return (
            <div>
                <h1>login Component</h1>
                
                <form onSubmit={this.onSubmit}>
                    <input type="text" placeholder="email" name="email"  value={this.state.email} onChange={this.onChange}/><br/>
                    <input type="password" placeholder="password" name="password" value={this.state.password} onChange={this.onChange} /><br/>
                    <input type="submit" />
                </form>
            </div>
        )
    }
}

export default Login;