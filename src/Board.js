import Square from "./Square";
import React from "react";

export default class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            isXNext: true
        }
    }

    handleClick(i) {
        const squares = this.state.squares.slice();
        if (this.calculateWinner() !== null || squares[i] != null) {
            return;
        }
        squares[i] = this.state.isXNext ? 'X' : 'O';
        this.setState({
            squares: squares,
            isXNext: !this.state.isXNext
        });
    }

    renderSquare(i) {
        return (
            <Square 
                value = {this.state.squares[i]}
                onClick = {() => this.handleClick(i)}
            />
        );
    }

    calculateWinner() {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        const curBoard = this.state.squares;
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (curBoard[a] !== null && curBoard[a] === curBoard[b] && curBoard[a] === curBoard[c]) {
                return curBoard[a];
            }
        }
        return null;
      }

    render() {
        const winner = this.calculateWinner()
        let status;
        if (winner !== null) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.isXNext ? 'X' : 'O');
        }
    
        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}