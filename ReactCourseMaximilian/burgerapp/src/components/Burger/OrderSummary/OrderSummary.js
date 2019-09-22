import React from 'react';
import AuxWrapper from '../../../hoc/AuxWrapper';
import Btn from '../../UI/Button/Button';

const orderSummary=(props)=>{

    const ingredientSummary=Object.keys(props.ingredients)
    .map(i=>{
        return <li key={i}><span style={{textTransform:"capitalize"}}>
            {i}
            </span>:{props.ingredients[i]}</li>
    })
    console.log(ingredientSummary)

 return (     
     <AuxWrapper>
        <h3>your order</h3>
        <p>your chosen ingredients</p>
        <ul>
            {ingredientSummary}
        </ul>
        <strong><p>Total price: {props.price.toFixed(2)}</p></strong>
        <Btn btnType='Danger' clicked={props.cancel}>Cancel</Btn>
        <Btn btnType='Success' clicked={props.continue}>Continue</Btn>
     </AuxWrapper>
 )
}
export default orderSummary;