import React, { Component } from 'react'
import { Link } from "react-router-dom"
import Card from "react-bootstrap/Card"

export default class ProjectsCard extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            linkTo: props.linkTo,
            imgSrc: props.imgSrc,
            projectTitle: props.projectTitle,
            projectInfo: props.projectInfo,
            projectUpdated: props.projectUpdated
        })
    }
    

    render() {
        return (
            <Link to={this.state.linkTo}>
            <Card className="projects-project">
                <Card.Img variant="top" src={this.state.imgSrc} className="projects-project-img-own" alt={this.state.projectTitle}/>
                <Card.Body className="projects-project-body">
                    <Card.Title className="projects-project-title">{this.state.projectTitle}</Card.Title>
                    <Card.Text className="projects-project-text">
                        {this.state.projectInfo}
                    </Card.Text>
                </Card.Body>
                <Card.Footer className="projects-project-footer">
                    <small className="projects-project-footer-text">{this.state.projectUpdated}</small>
                </Card.Footer>
            </Card>
            </Link>
        )
    }
}
