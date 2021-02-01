import React, { Component } from 'react'
import { Link, Redirect } from "react-router-dom"
import ErrorNotice from '../../../misc/ErrorNotice'


import "./register.css"

export default class Register extends Component {
    constructor() {
        super()
        this.state = ({
            email: "",
            password: "",
            passwordCheck: "",
            username: "",

            redirect: false,
            error: false
        })
    }

    submit = () => {
        fetch("/user/register", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                passwordCheck: this.state.passwordCheck,
                username: this.state.username
            })
        })
        .then(res=>res.json())
        .then((data)=>{
            if (data.msg) {
                this.setState({
                    error: data.msg
                })
            }
            else {
                this.setState({
                    redirect: true
                })
            }
        })
    }

    setUser = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    render() {
        if (this.state.error) {
            return ( 
                <ErrorNotice message={this.state.error} clearError={() => this.setState({error: false})} />
            )
        }

        if (this.state.redirect) {
            return ( <Redirect to="/login" /> )
        }

        return (
            <div className="register">
                <div className="register-title">Sign Up</div>
                <div className="register-title-big">Create Account</div>
                <form className="register-form">
                    <input className="register-form-input" type="text" placeholder="Email" id="email" onChange={this.setUser}/>
                    <input className="register-form-input" type="password" placeholder="Password" id="password" onChange={this.setUser}/>
                    <input className="register-form-input" type="password" placeholder="Confirm Password" id="passwordCheck" onChange={this.setUser}/>
                    <input className="register-form-input" type="text" placeholder="Username" id="username" onChange={this.setUser}/>
                </form>
                <div><button className="register-form-submit" onClick={this.submit}>Register</button></div>
                <Link to={"/login"}>
                    <div className="register-msg">
                        Already have an account? Sign In
                    </div>
                </Link>
            </div>
        )
    }
}
