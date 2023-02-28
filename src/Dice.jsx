import React from 'react'

const Dice = (props) => {
  return (
    <div onClick={props.holdDice} className='col-2 box' style={{backgroundColor: props.isHeld ? "#59E391" : ""}}>
        <h5>{props.value}</h5>
    </div>
  )
}

export default Dice