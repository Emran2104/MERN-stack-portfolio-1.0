import React, { Component } from 'react'
import { Link, Redirect } from "react-router-dom"
import ErrorNotice from '../../../misc/ErrorNotice'

import "./login.css"

export default class Login extends Component {
    constructor(){
        super()
        this.state = ({
            email: "",
            password: "",
            user: [],
            redirect: false,
            error: false
        })
    }

    submit = async () => {
        fetch("/user/login/", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                email: this.state.email, 
                password: this.state.password
            })
        })
        .then(res=>res.json())
        .then((data) => {
            if (data.msg) {
                this.setState({
                    error: data.msg
                })
            }
            else {
                localStorage.setItem("auth-token", data.token)
                this.setState({
                    user: data.user,
                    redirect: true
                })
                window.location.reload(false)
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
            return ( <Redirect to="/" /> )
        }

        return (
            <div className="login">
                <div className="login-title">Login</div>
                <div className="login-title-big">Account</div>
                <form className="login-form">
                    <input className="login-form-input" type="text" placeholder="Email" id="email" onChange={(e) => this.setUser(e)} />
                    <input className="login-form-input" type="password" placeholder="Password" id="password" onChange={(e) => this.setUser(e)} />
                </form>
                <div><button className="login-form-submit" onClick={this.submit}>Login</button></div>
                <Link to={"/register"}>
                    <div className="login-msg">
                        Don't have an account yet? Sign Up
                    </div>
                </Link>
            </div>
        )
    }
}
