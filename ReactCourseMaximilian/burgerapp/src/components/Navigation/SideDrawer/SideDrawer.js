import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import BackDrop from '../../UI/Backdrop/Backdrop';
import classes from './SideDrawer.module.css';
import Aux from '../../../hoc/AuxWrapper';
const sideDrawer=(props)=>{

    let attachedClasses=[classes.SideDrawer,classes.Close];
    if(props.open){
        attachedClasses=[classes.SideDrawer,classes.Open];
    }
    return(
        <Aux>
        <BackDrop show={props.open} close={props.closed}/>
        <div className={attachedClasses.join(' ')}>       
        <Logo height="11%"/>
        <nav>
        <NavigationItems/>
        </nav>
        </div>
        </Aux>
    );
};

export default sideDrawer;