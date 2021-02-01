import React, { Component } from 'react'
import { Link } from "react-router-dom"


export default class AuthOptions extends Component {
    constructor() {
        super()
        this.state = ({
            token: localStorage.getItem("auth-token"),
            email: "",
            username: "",
            error: false
        })
    }

    componentDidMount() {
        fetch("/user/", {
            method: "GET",
            headers: {
                "auth-token": this.state.token, "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then((data) => {
            this.setState({
                email: data.email,
                username: data.username
            })
        },
        (err) => {
            this.setState({
                error: err
            })
        }
        )
    }

    logOut = () => {
        localStorage.setItem("auth-token", "")
        window.location.replace("/")
    }

    render() {
        return (
            <div className="header-nav-authoptions">
                { this.state.token ? (
                    <>
                        <Link to={"/profile"}><button className="header-nav-authoptions-btn"> {this.state.username} </button></Link>
                        <Link><button className="header-nav-authoptions-btn" onClick={this.logOut}>Logout</button></Link>
                        { this.state.error ? <div> {this.state.error} </div> : ""}
                    </>
                ): (
                    <>
                        <Link to={"/login"}><button className="header-nav-authoptions-btn">Login</button></Link>
                        <Link to={"/register"}><button className="header-nav-authoptions-btn">Register</button></Link> 
                    </>
                )}
                
            </div>
        )
    }
}
