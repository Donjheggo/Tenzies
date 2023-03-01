import React from 'react'

const Dice = (props) => {
  return (
    <div onClick={props.toggleDice} className='dice col-2' style={{backgroundColor: props.isHeld ? '#59E391' : ''}}>
        <h5>{props.value}</h5>
    </div>
  )
}

export default Dice