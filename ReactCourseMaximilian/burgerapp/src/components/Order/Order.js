import React from 'react';
import classes from './Order.module.css';

const order = (props)=>{

    let renderIng=[];

    for(let ing in props.ingredients){

        renderIng.push({name:ing, amount:props.ingredients[ing]})
    }

    const renderIt=renderIng.map(ig=>{
       return <span key={ig.name}>{ig.name}: {ig.amount} </span>
    })
    return(
        <div className={classes.order}>
        <p>ingredients: {renderIt}</p>
        <strong><p>Price: {+props.price.toFixed(2)}</p></strong>
        </div>
    );
}

  
    


export default order;
