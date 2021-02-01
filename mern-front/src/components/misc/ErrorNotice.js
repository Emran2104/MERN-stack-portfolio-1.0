import React, { Component } from 'react'

import "./errornotice.css"


export default class ErrorNotice extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            message: this.props.message,
            clearError: this.props.clearError
        })
    }

    render() {
        return (
            <div className="error-notice">
                <div> {this.state.message} </div>
                <button onClick={this.state.clearError}>X</button>
            </div>
        )
    }
}
