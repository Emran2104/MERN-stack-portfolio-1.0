import React, { Component } from 'react'
import ErrorNotice from '../../../misc/ErrorNotice'


import "./weather.css"


export default class Weather extends Component {
    constructor(props) {
        super(props)
        this.state = {
             data: {
                 location: {
                     country: "",
                     region: ""
                 },
                 current: {
                     last_updated: "",
                     temp: 0,
                     condition: {
                         text: "",
                         icon: ""
                     },
                     wind_speed: 0,
                    wind_dir: "",
                    precip: 0,
                    humidity: 0,
                    cloud: 0,
                    feelslike: 0
                 }
             },
             sent: false,
             city: "",

             error: false,
        }
    }

    submit = () => {
        fetch("/weather/current", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({city: this.state.city})
        })
        .then(res=>res.json())
        .then((data) => {
            if (data.error) {
                this.setState({
                    error: data.error
                })
            }
            else {
                this.setState({
                    data: {
                        location: {
                            country: data.location.country,
                            region: data.location.region,
                        },
                        current: {
                            last_updated: data.current.last_updated,
                            temp: data.current.temp,
                            condition: {
                                text: data.current.condition.text,
                                icon: data.current.condition.icon
                            },
                            wind_speed: data.current.wind_speed,
                           wind_dir: data.current.wind_dir,
                           precip: data.current.precip,
                           humidity: data.current.humidity,
                           cloud: data.current.cloud,
                           feelslike: data.current.feelslike
                        }
                    },
                    sent: true
                })
            }
        })

    }

    setCity = (e) => {
        this.setState({
            city: e.target.value
        })
    }



    render() {
        if (this.state.error) {
            return (<ErrorNotice message={this.state.error} clearError={() => this.setState({error: false})} />)
        }

        return (
            <div className="weather">
                <div className="weather-title">Weather</div>

                <div className="weather-search">
                    <div>
                        <h3 className="weather-search-title">Search city</h3>
                    </div>
                    <div className="weather-search-form">
                        <input className="weather-search-input" id="city" type="text" onChange={(e) => this.setCity(e)}/>
                        <button className="weather-search-btn" onClick={this.submit}>Search</button>
                    </div>
                </div>

                <div className="weather-search-title">
                    Now
                </div>

                <div className="weather-info"
                style={ this.state.sent ? {display:"grid"} : {display:"none"}}
                >
                    <div className="weather-info-each">
                        <div className="weather-info-country">
                            {this.state.data.location.country}
                        </div>
                        <div className="weather-info-region">
                            {this.state.data.location.region}
                        </div>
                        <div className="weather-info-icon">
                            <img className="weather-info-icon-img" src={this.state.data.current.condition.icon} alt="icon" />
                        </div>
                    </div>

                    <div className="weather-info-each">
                        <div className="weather-info-temp"
                        style={this.state.data.current.temp>=0 ? {color:"#c60000"} : {color:"#1d6edb"} }
                        >
                            {this.state.data.current.temp}°
                        </div>
                        <div className="weather-info--condition-text">
                            {this.state.data.current.condition.text}
                        </div>
                        <div className="weather-info-feelslike-div">
                            <div className="weather-info-feelslike">Feels like</div>
                            <div className="weather-info-number"
                            style={this.state.data.current.feelslike>=0 ? {color:"#c60000"} : {color:"#1d6edb"} }
                            >
                                {this.state.data.current.feelslike}°
                            </div>
                        </div>
                    </div>

                    <div className="weather-info-each">
                        <div className="weather-info-others">
                            <div className="weather-info-text">
                                Precipitation
                            </div>
                            <div className="weather-info-number"
                            style={{color:"#1d6edb"}}
                            >
                                {this.state.data.current.precip}mm
                            </div>
                        </div>
                        <div className="weather-info-others">
                            <div className="weather-info-text">
                                Humidity
                            </div>
                            <div className="weather-info-number">
                                {this.state.data.current.humidity}%
                            </div>
                        </div>
                        <div className="weather-info-others">
                            <div className="weather-info-text">
                                Cloud
                            </div>
                            <div className="weather-info-number">
                                {this.state.data.current.cloud}%
                            </div>
                        </div>
                    </div>

                    <div className="weather-info-each-third">
                        <div className="weather-info-others">
                            <div className="weather-info-text">
                                Wind direction
                            </div>
                            <div className="weather-info-number">
                                {this.state.data.current.wind_dir}
                            </div>
                        </div>
                        <div className="weather-info-others">
                            <div className="weather-info-text">
                                Wind speed (km/h)
                            </div>
                            <div className="weather-info-number">
                                {this.state.data.current.wind_speed}
                            </div>
                        </div>
                    </div>
                    
                    

                    

                    <div className="weather-info-each-last">
                        <div className="weather-info-each-last-text">
                            Last Updated {this.state.data.current.last_updated}   
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
