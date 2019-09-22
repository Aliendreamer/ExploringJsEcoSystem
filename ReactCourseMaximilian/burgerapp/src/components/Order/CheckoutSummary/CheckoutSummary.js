import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css';

const checkoutSummary =(props)=>{

    console.log(props)
    debugger;
    return(
        <div className={classes.CheckoutSummary}>
            <h1>here is your burger </h1>
                <div style={{width:'300px',margin:'auto'}}>
                <Burger 
                ingredients={props.ingredients}>
                </Burger>
                </div>
                <Button
                 btnType="Success" 
                 clicked={props.checkoutOrder}>
                     Confirm
                </Button>
                <Button
                 btnType="Danger"
                 clicked={props.checkoutCancelled}>
                     Cancel
                </Button>
        </div>
    );
}

export default checkoutSummary;