import React from 'react'
import Dice from './Dice'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'
import Timer from './Timer'

function App() {

  const tenRandomDices = () => {
    let numbers = []
      for(let i = 0; i < 10; i ++){
        numbers.push(
          { 
            id: nanoid(),
            value: Math.floor(Math.random() * 6), 
            isHeld: false
          }
          )
      }
    return numbers
  }

  const [dices, setDices] = React.useState(tenRandomDices())

  
  const rollDice = () => {
    setDices(dice => dice.map(dice => {
      return dice.isHeld === false ? {...dice, value: Math.floor(Math.random()*6)} : dice
    }))
  }

  const holdDice = (id) => {
    setDices(dice => dice.map(item => {
      return item.id === id ? {...item, isHeld: !item.isHeld} : item
    }))
  }

  const newGame = () => {
    setDices(tenRandomDices())
  }

  const diceElements = dices.map(dice => <Dice key={dice.id} toggleDice={() => holdDice(dice.id)} value={dice.value} isHeld={dice.isHeld}/>)

  const [winningStatus, setWinningStatus] = React.useState(false)

  React.useEffect( () => {
    const allHeld = dices.every(item => item.isHeld)
    const allSameValue = dices.every(item => item.value === dices[0].value)
   if(allHeld && allSameValue){
    setWinningStatus(true)
    console.log("You won")
   }
  }, [dices])

  const [gameStatus, setGameStatus] = React.useState(false)

  const startGame = () => {
    setGameStatus(true)
  }


  return (
    <div className='game'>
      <div className='container pb-5 pt-5'>
      {winningStatus && <Confetti />}
      
        <h1 className='text-center'>Tenzies</h1>
        {<h5 className='text-center'>
          {!winningStatus 
            ? 
          "Roll until all dice are the same. Click each die to freeze it at its current value between rolls." 
            : 
          "Congratulations! You won!"
          }
        </h5>}

        {gameStatus ? <div className='dice-and-buttons'>
          <div className='row justify-content-center gap-2 pt-4'>
            {diceElements}
          </div>

          <div className='text-center mt-5'>
            {winningStatus ? 
              <button onClick={newGame} className='btn btn-success w-25'> 
                New Game
              </button> : 
              <button onClick={rollDice} className='btn btn-primary w-25'>
                Roll
              </button>}
          </div>
        </div> : 
        <div className='text-center mt-5'>
          <button onClick={startGame} className='btn btn-primary w-25'>
            Start Game
          </button>
        </div>}


      </div>
    </div>
  )
}

export default App
