import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngridient/BurgerIngridient';
import {withRouter} from 'react-router-dom';

const burger=(props)=>{
   
    let givenIngredientes=Object.keys(props.ingredients)
    .map(igKey=>{
        return [...Array(props.ingredients[igKey])].map((_,i)=>{
           return <BurgerIngredient key={igKey+i} type={igKey}/>
        })
    }).reduce((arr,el)=>{
        return arr.concat(el)
    },[]);
    if(givenIngredientes.length===0){
        givenIngredientes=<p>start adding ingredients</p>
    }
    return(
        <div className={classes.Burger}>
                <BurgerIngredient type="bread-top"/>
                {givenIngredientes}
                <BurgerIngredient type="bread-bottom"/>
        </div>
    );
};

export default withRouter(burger);