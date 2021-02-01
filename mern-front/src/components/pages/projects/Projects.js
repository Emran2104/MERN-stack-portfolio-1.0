import React, { Component } from 'react'
import CardGroup from 'react-bootstrap/CardGroup'

import ProjectsCard from "./ProjectsCard"

// css
import "./projects.css"

// images
import covid19 from "./projectsImg/covid19.webp"
import weather from "./projectsImg/weather.jpg"


export default class Projects extends Component {
    constructor() {
        super()
        this.state = ({
            linkTo: [
                "/covid",
                "/weather",
                "/game",
            ],
            imgSrc: [
                covid19,
                weather,
                covid19,
            ],
            projectTitle: [
                "Covid-19",
                "Weather",
                "Coming soon",
            ],
            projectInfo: [
                "Here you can see constantly updated information about Covid-19. Search options as continents, countries and more.",
                "Weather API search for any city in the world. Constantly updated",                
                "Coming Soon",                
            
            ],
            projectUpdated: [
                "Covid-19 API from www.rapidapi.com",
                "Weather API from www.weatherapi.com",
                "Coming soon",
            ]
        })
    }



    render() {
       return (
        <div className="projects-site">
            <div className="projects-title">Projects</div>
            <CardGroup className="projects">
                

                <ProjectsCard linkTo={this.state.linkTo[0]} 
                            imgSrc={this.state.imgSrc[0]} 
                            projectTitle={this.state.projectTitle[0]} 
                            projectInfo={this.state.projectInfo[0]} 
                            projectUpdated={this.state.projectUpdated[0]} />

                <ProjectsCard linkTo={this.state.linkTo[1]} 
                            imgSrc={this.state.imgSrc[1]} 
                            projectTitle={this.state.projectTitle[1]} 
                            projectInfo={this.state.projectInfo[1]} 
                            projectUpdated={this.state.projectUpdated[1]} />
                
                <ProjectsCard linkTo={this.state.linkTo[2]} 
                            imgSrc={this.state.imgSrc[2]} 
                            projectTitle={this.state.projectTitle[2]} 
                            projectInfo={this.state.projectInfo[2]} 
                            projectUpdated={this.state.projectUpdated[2]} />
                
            </CardGroup>
        </div>
       )
    }
}
