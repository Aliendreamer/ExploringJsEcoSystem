import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BurgerControls.module.css';


const controls=
[
    {label:"Salad",type:'salad'},
    {label:"Bacon",type:'bacon'},
    {label:"Meat",type:'meat'},
    {label:"Cheese",type:'cheese'}
]

const burgerControls=(props)=>(
    <div className={classes.BurgerControls}>
       <p><strong>Current Price: {props.price.toFixed(2)}</strong></p> 
      {controls.map(ctrl=>(
          <BuildControl 
          key={ctrl.label}
          label={ctrl.label}
          add={()=>props.ingredientAdded(ctrl.type)}
          remove={()=>props.ingredientRemoved(ctrl.type)}
          disabled={props.disabled[ctrl.type]}/>
      ))}
      <button 
      className={classes.OrderButton}
      disabled={!props.purchasable}
      onClick={props.ordered}
      >Order Now</button>
    </div>
);


export default burgerControls;