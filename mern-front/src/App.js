import React, { Component } from 'react'
import { BrowserRouter, Switch, Route} from "react-router-dom"


import Header from './components/layout/header/Header'
import Login from './components/pages/auth/login/Login'
import Register from './components/pages/auth/register/Register'
import Contact from './components/pages/contact/Contact'
import Home from './components/pages/home/Home'
import Profile from './components/pages/profile/Profile'
import Projects from './components/pages/projects/Projects'
import Covid from "./components/pages/projects/covid/Covid"
import Weather from './components/pages/projects/weather/Weather'
import Game from './components/pages/game/Game'


export default class App extends Component {
    render() {
        return (
            <div className="App">
            <BrowserRouter>
                <Header />
                
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/contact" component={Contact} />
                    <Route exact path="/projects" component={Projects} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/profile" component={Profile} />
                    <Route exact path="/covid" component={Covid} />
                    <Route exact path="/weather" component={Weather} />
                    <Route exact path="/game" component={Game} />
                </Switch>
            </BrowserRouter>
            </div>
        )
    }
}
