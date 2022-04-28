import React, { useState } from 'react';
import Board from './board';

function calculateWinner(squares) {
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
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
}

function Game() {
    const [history, setHistory] = useState([{squares:Array(9).fill(null)}]);
    const [isNext,setIsNext] = useState(true);
    const [stepNumber,setStepNumber] = useState(0);
    const current = history[stepNumber];
    const winner = calculateWinner(current.squares);
    const nextSquares = current.squares.slice();
    let status;
    function handleClick(i) {
        const newHistory = history.slice(0, stepNumber + 1);
        if (calculateWinner(nextSquares) || nextSquares[i]) {
            return;
        }
        nextSquares[i] = isNext ? 'X' : 'O';
        setHistory(newHistory.concat([{squares:nextSquares}]));
        setStepNumber(newHistory.length);
        setIsNext(!isNext);
      }

    function jumpTo(step) {
        setStepNumber(step);
        setIsNext((step % 2) === 0);
    }

    const moves = history.map((step, move) => {
        const desc = move ?
            'Go to move #' + move :
            'Go to game start';
        return (
            <li key={move}>
            <button onClick={() => jumpTo(move)}>{desc}</button>
            </li>
            );
    });

    if (winner) {
        status = 'Winner: ' + winner;
    } else {
        status = 'Next player: ' + (isNext ? 'X' : 'O');
    }
    
    return(
        <div className="game">
            <div className="game-board">
                <Board 
                squares={current.squares}
                onClick={(i) => handleClick(i)}/>
            </div>
            <div className="game-info">
                <div>{status}</div>
                <ol>{moves}</ol>
          </div>
        </div>
    )
}

export default Game;
  