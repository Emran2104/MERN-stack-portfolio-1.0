import React, { Component } from 'react'

import "./game.css"

export default class Game extends Component {
    render() {
        return (
            <div className="game">
                <div className="game-title">Benz Game</div>
                <div className="game-lobby">
                    <div>
                        <button>Join</button>
                    </div>
                    <div>
                        <button>Ready</button>
                    </div>
                </div>

                <div className="game-ingame">
                </div>
            </div>
        )
    }
}
