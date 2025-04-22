import { useState } from 'react'
import { GameBoard } from "./components/GameBoard"
import { Player } from "./components/Player"
import { Log } from './components/Log';
import { WINNING_COMBINATIONS } from './winning-combinations';
import GameOver from './components/GameOver';


const PLAYERS = {
  'X': 'Player 1',
  'O': 'Player 2'
}

const INITIAL_GAMEBOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]
function deriveActivePlayer(gameTurns) {

  let currentPlayer = 'X';
  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }
  return currentPlayer
}
function deriveGameBoard(gameTurns) { 
  let gameBoard = [...INITIAL_GAMEBOARD.map(array => [...array])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }
  return gameBoard

}
function deriveWinner(gameBoard, players) {  
  let winner = null
  for (const combination of WINNING_COMBINATIONS) {
    const [a, b, c] = combination;
    const firstSquareSymbol = gameBoard[a.row][a.column];
    const secondSquareSymbol = gameBoard[b.row][b.column];
    const thirdSquareSymbol = gameBoard[c.row][c.column];

    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      // alert(`Player ${firstSquareSymbol} wins!`);
      winner = players[firstSquareSymbol];
    }
  }

  return winner;
}

function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;


  function handleSelectSquare (rowIndex, colIndex) {
    // setActivePlayer((currActivePlayer) => (currActivePlayer === 'X' ? 'O' : 'X'));
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);
      const newTurns = [
        {square: {row: rowIndex, col: colIndex}, player: currentPlayer},
        ...prevTurns
      ];
      return newTurns;
    });
  }

  function restartGame() {
    setGameTurns([]);
  }
  
  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName
      }
    })
  
  }

  return (
    <main> 
      <div id="game-container">
        <ol id='players' className='highlight-player'>
          <Player initialName={PLAYERS.X} symbol="X" isActive={activePlayer === 'X'} onChangeName={handlePlayerNameChange}/>
          <Player initialName={PLAYERS.O}  symbol="O" isActive={activePlayer === 'O'} onChangeName={handlePlayerNameChange} />
        </ol>

        { winner  && <h2>Player {winner} wins!</h2>}
        { (winner || hasDraw) && <GameOver winner={winner}  onPlayAgain={restartGame}/> } 
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard }/>
      </div>

      <Log turns={gameTurns}/>
    </main>
  )
}

export default App
