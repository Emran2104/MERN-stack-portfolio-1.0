import React, { Component } from 'react'

import ErrorNotice from "../../../misc/ErrorNotice"

import "./covid.css"

export default class Covid extends Component {
    constructor() {
        super()
        this.state = ({
            error: false,

            confirmed: 0,
            recovered: 0,
            critical: 0,
            deaths: 0,
            lastUpdate: 0,

            landCode: "",
            country: "",
            landConfirmed: 0,
            landRecovered: 0,
            landCritical: 0,
            landDeaths: 0
        })
    }

    componentDidMount() {
        fetch("/covid/latestTotal", {
        method: "GET",
        headers: {"Content-Type": "application/json"},
        })
        .then(res=>res.json())
        .then((data)=>{
            if (data.error) {
                this.setState({
                    error: data.error
                }) }
            else {
                this.setState({
                    confirmed: data.confirmed,
                    recovered: data.recovered,
                    critical: data.critical,
                    deaths: data.deaths,
                    lastUpdate: data.lastUpdate
                })
            }
        })

    }

    setLandCode = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    getInfo = () => {
        let url = "/covid/country/" + this.state.landCode
        fetch(url, {
            method: "GET",
            headers: {"Content-Type": "application/json"},
        })
        .then(res=>res.json())
        .then((data)=>{
            if (data.error) {
                this.setState({
                    error: data.error
                }) }
            else {
                this.setState({
                    country: data.country,
                    landConfirmed: data.confirmed,
                    landRecovered: data.recovered,
                    landCritical: data.critical,
                    landDeaths: data.deaths
                })
            }
        })
    }

    render() {
        if (this.state.error) {
            return (<ErrorNotice message={this.state.error} clearError={() => this.setState({error: false})} />)
        }
        return (
            <div className="covid">
                <div className="covid-content"> 
                    <h3 className="covid-title">Covid</h3>
                    <div className="covid-content_total"> 
                    <label>Confirmed Cases: </label><p>{this.state.confirmed}</p>
                    </div>
                    <div className="covid-content_total"> 
                    <label>Recovered: </label><p>{this.state.recovered}</p>
                    </div>
                    <div className="covid-content_total">
                    <label>Critical: </label><p>{this.state.critical}</p>
                    </div>
                    <div className="covid-content_total"> 
                    <label>Deaths: </label><p>{this.state.deaths}</p>
                    </div>
                    <div className="covid-content_total"> 
                    <label>Updated: </label><p>{this.state.lastUpdate}</p>
                    </div>
                </div>
                <div className="covid-content-land">
                    <h3 className="covid-title">Covid {this.state.country}</h3>
                    <div className="covid-content_total"> 
                    <label>Confirmed Cases: </label><p>{this.state.landConfirmed}</p>
                    </div>
                    <div className="covid-content_total"> 
                    <label>Recovered: </label><p>{this.state.landRecovered}</p>
                    </div>
                    <div className="covid-content_total">
                    <label>Critical: </label><p>{this.state.landCritical}</p>
                    </div>
                    <div className="covid-content_total"> 
                    <label>Deaths: </label><p>{this.state.landDeaths}</p>
                    </div>


                    <input id="landCode" type="text" className="landCode" placeholder="Land Code no=Norway" onChange={this.setLandCode}/>
                    <button onClick={this.getInfo}>Get info</button>
                </div>
            </div>
        )
    }
}