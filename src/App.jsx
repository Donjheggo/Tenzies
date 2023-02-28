import React from 'react'
import Dice from './Dice'
import { nanoid } from 'nanoid'

const App = () => {

  const tenRandomNumber = () => {
    const arr = []
    for(let i = 0; i < 10; i++){
      arr.push(
          {
            id: nanoid(),
            value: Math.floor(Math.random() * 6), 
            isHeld: false
          }
        )
    }
    return arr
  }

  const [allDices, setAllDices] = React.useState(tenRandomNumber())


  const holdDice = (id) => {
    const updatedDice = allDices.map(dice => {
      return dice.id === id ? {...dice, isHeld: !dice.isHeld} : dice
    })
    setAllDices(updatedDice)
  }


  const roll = () => {
    const unHoldDice = allDices.map(dice => {
      return !dice.isHeld ? {...dice, id: nanoid(), value: Math.floor(Math.random()*6), isHeld: false} : dice
    }) 
    setAllDices(unHoldDice)
  }

  
  const elements = allDices.map(dice => <Dice key={dice.id} holdDice={() => holdDice(dice.id)} value={dice.value} isHeld={dice.isHeld}/>)




  return (
    <div className='main--div'>
      <div className='main--box container pb-5'>
        <h1 className='title'>Tenzies</h1>
        <p className='instruction'> 
          Roll until all 
          dice are the same. Click each die to freeze 
          it at its current value between rolls.
        </p>
          <div className='d-flex justify-content-center'>
            <div className='row gap-3'>
                {elements}
            </div>
          </div>
          
          <div className='text-center mt-5'>
            <button onClick={roll} className='btn btn-primary w-25'>
              Roll
            </button>
          </div>


        </div>
      </div>
  )
}

export default App