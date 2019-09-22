import React from 'react';
import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css';

const navigationItems=()=>(
    <ul className={classes.NavigationItems}>
    <NavigationItem  link={"/"}>Burger builder</NavigationItem>
    <NavigationItem  link={"/orders"}>Orders </NavigationItem>
    <NavigationItem  link={"/auth"}>Authenticate </NavigationItem>
    </ul>
);

export default navigationItems;