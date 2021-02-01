import React, { Component } from 'react'
import { Redirect } from "react-router-dom"
import ErrorNotice from '../../misc/ErrorNotice'

import "./profile.css"
import profileImg from "./profile.svg"

export default class Profile extends Component {
    constructor() {
        super()
        this.state = ({
            edit: false,
            token: localStorage.getItem("auth-token"),
            error: false,

            email: "",
            username: "",
            firstname: "",
            lastname: "",
            birthday: "",

            emailPost: "",        
            firstnamePost: "",
            lastnamePost: "",
            birthdayPost: "",

            deleted: false
        })
    }

    componentDidMount() {
        fetch("/user/", {
            method: "GET",
            headers: { "auth-token": this.state.token, "Content-Type": "application/json"}
        })
        .then(res => res.json())
        .then( (data) => {
            if (data.msg || data.error) {
                this.setState({
                    error: data.msg
                })
            }
            else {
                this.setState({
                    email: data.email,
                    username: data.username,
                    firstname: data.firstname,
                    lastname: data.lastname,
                    birthday: data.birthday
                })
            }
        })
    }

    onEdit = () => {
        this.setState({
            edit: !this.state.edit
        })
    }

    onSave = () => {
        fetch("/user/update", {
            method: "POST",
            headers: { "auth-token": this.state.token, "Content-Type": "application/json"},
            body: JSON.stringify({
                email: this.state.emailPost,
                firstname: this.state.firstnamePost,
                lastname: this.state.lastnamePost,
                birthday: this.state.birthdayPost,
                
            })
        })
        .then(res => res.json())
        .then((data) => {
            if (data.msg || data.error) {
                this.setState({
                    error: data.msg
                })
            }
            else {
                this.componentDidMount()
            }
        })
        this.setState({
            edit: !this.state.edit
        })
    }

    onDelete = () => {
        fetch("/user/delete", {
            method: "DELETE",
            headers: { "auth-token": this.state.token, "Content-Type": "application/json"},
        })
        .then(res=>res.json())
        .then((data) => {
            if (data.msg || data.error)  {
                this.setState({
                    error: data.msg
                })
            }
            else {
                this.setState({
                    deleted: true
                })
            }
            localStorage.setItem("auth-token", "")
            window.location.reload(false)
        })
    }

    setValue = (e) => {
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

        if (this.state.deleted) {
            return ( <Redirect to="/" /> )
        }

        return ( 
            <div className="profile">
                <div className="profile-title">Profile</div>
                <div className="profile-info">
                    <div className="profile-img">
                        <img className="profile-img-own"src={profileImg} alt="profile"/>
                    </div>
                    <div className="profile-username">
                        <h3>{this.state.username}</h3>
                    </div>
                    <div className="profile-info-each">
                        <span className="profile-info-each-title">Email:</span>
                        { this.state.edit ?  
                            <input className="profile-info-each-info-input" type="text" value={this.state.emailPost} id="emailPost" onChange={this.setValue}/>
                            :
                        <span className="profile-info-each-info">{this.state.email}</span>
                        }
                    </div>
                    <div className="profile-info-each">
                        <span className="profile-info-each-title">Firsname:</span>
                        { this.state.edit ?  
                            <input className="profile-info-each-info-input" type="text" value={this.state.firstnamePost} id="firstnamePost" onChange={this.setValue}/>
                            :
                        <span className="profile-info-each-info">{this.state.firstname}</span>
                        }
                    </div>
                    <div className="profile-info-each">
                        <span className="profile-info-each-title">Lastname:</span>
                        { this.state.edit ?  
                            <input className="profile-info-each-info-input" type="text" value={this.state.lastnamePost} id="lastnamePost" onChange={this.setValue}/>
                            :
                        <span className="profile-info-each-info">{this.state.lastname}</span>
                        }
                    </div>
                    <div className="profile-info-each">
                        <span className="profile-info-each-title">Date of birth:</span>
                        { this.state.edit ?  
                            <input className="profile-info-each-info-input" type="date" value={this.state.birthdayPost} id="birthdayPost" onChange={this.setValue}/>
                            :
                        <span className="profile-info-each-info">{this.state.birthday}</span>
                        }
                    </div>
                    <div className="profile-button">
                        { this.state.edit ? 
                        <div>
                            <div>
                                <button onClick={this.onSave}>Save</button>
                            </div>
                            <div>
                                <button onClick={this.onDelete}>Delete account</button>
                            </div>
                            <div>
                                <h3 className="profile-button-delete-text">Deleting account is permanant, and can not get the account back in any way. </h3>
                            </div>
                        </div>
                        :
                        <button onClick={this.onEdit}>Edit</button>
                        }
                    </div>
                </div>
            </div>
        )
    }
}
