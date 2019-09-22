import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../../../components/Navigation/NavigationItems/NavigationItems';
import Button from '../../../components/UI/Button/Button';
import Aux from '../.../../../../hoc/AuxWrapper';
const toolbar=(props)=>(
   <Aux>
   <header className={classes.Toolbar}>
   <Button clicked={props.toggleSideDrawer}>Menu</Button>  
    <Logo height="80%"/>
    <nav>
    <NavigationItems/>

    </nav>
    </header>
    </Aux>

);

export default toolbar;