import React, { Component } from 'react'
import { Link } from "react-router-dom"
import AuthOptions from '../../pages/auth/AuthOptions'
import "./header.css"

export default class Header extends Component {
    constructor() {
        super()
        this.state = ({
            navbarActive: false
        })
    }

    navbarClick = () => {
        this.setState({
            navbarActive: !this.state.navbarActive
        })
    }

    render() {
        return (
            <div className="header">
                <Link to={"/"}><div className="header-logo">MERN</div></Link>
                <div className="media-header-nav-links">
                    <button className="media-header-nav-links-btn" onClick={this.navbarClick}>Menu</button>
                </div>
                <div className="header-nav-links">
                    <Link to={"/"}><div className="nav-link">Home &#8962;</div></Link>
                    <Link to={"/projects"}><div className="nav-link">Projects</div></Link>
                    <Link to={"/contact"}><div className="nav-link">Contact</div></Link>
                    
                </div>
                <AuthOptions />
            </div>
        )
    }
}
