import { useState } from "react"
import confetti from "canvas-confetti"
import {Square} from "./components/Square"
import {TURNS} from "./components/constants"
import { checkWinner } from "./logic/board"
import { Winner } from "./components/Winner"

function App() {

  const [board, setBoard] = useState( () => {
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  })

  const [turn, setTurn] = useState( () => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  })

  const [winner, setWinner] = useState(() => {
    const winnerFromStorage = window.localStorage.getItem('winner')
    if (winnerFromStorage === 'null') return null
    return winnerFromStorage
  })

  const winnerSetter = ({index, newBoard, turn}) => {
    const newWinner = checkWinner(index, newBoard) ? turn : null

    if (newWinner) {
      confetti()
      setWinner(newWinner)
      return newWinner
    } else if (!newWinner && newBoard.every( (e) => e !== null)) {
      setWinner(false)
      return false
    }
    return null
  }

  const updateBoard = (index) => {
    if (board[index] || winner) return
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newWinner = winnerSetter({index,newBoard,turn})

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', newTurn)
    window.localStorage.setItem('winner', newWinner)
  
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
    window.localStorage.removeItem('winner')
  }

  return (
    <main className = 'board'>
      <h1>Tic tac toe</h1>
      <button onClick={resetGame}>Reset</button>
      <section className="game">
      {
        board.map((_, index) => {
          return (
            <Square
              key = {index}
              index = {index}
              updateBoard = {updateBoard}>
                {board[index]}
            </Square>
          )
        })
      }
      </section>

      <section className="turn">
        <Square isSelected = {turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected = {turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>

      <Winner resetGame = {resetGame} winner = {winner}/>

    </main>
  )
}

export default App
