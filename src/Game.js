import Board from "./Board";
import React from "react";

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null)
            }],
            isXNext: true,
            stepNumber: 0
        }
    }

    calculateWinner(curBoard) {
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
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (curBoard[a] !== null && curBoard[a] === curBoard[b] && curBoard[a] === curBoard[c]) {
                return curBoard[a];
            }
        }
        return null;
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (this.calculateWinner(squares) !== null || squares[i] != null) {
            return;
        }
        squares[i] = this.state.isXNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares
            }]),
            isXNext: !this.state.isXNext,
            stepNumber: history.length
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = this.calculateWinner(current.squares);

        const moves = history.map((board, step) => {
            const desc = step !== 0 ?
                'Go to move #' + step :
                'Go to game start';
            return (
                <li key={step}>
                    <button onClick={() => this.jumpTo(step)}>{desc}</button>
                </li>
            );
        });

        let status;
        if (winner !== null) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.isXNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={i => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}