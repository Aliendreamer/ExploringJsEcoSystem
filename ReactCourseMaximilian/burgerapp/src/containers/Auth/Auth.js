import React,{Component} from 'react';
import Input from "../../components/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
class Auth extends Component{

    state={
        controls:{
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'mail'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail:true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength:7
                },
                valid: false,
                touched: false
            }
        }
    }
    inputChangedHandler = (event, inputIdentifier) => {
        const updatedControls = {
            ...this.state.controls,
            [inputIdentifier]:{
                ...this.state.controls[inputIdentifier],
                value:event.target.value,
                valid:this.checkValidity(event.target.value,this.state.controls[inputIdentifier].validation),
                touched:true
            }
        };
        this.setState({controls:updatedControls})

    }
    
    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }
    
    submitHandler=(event)=>{
            event.preventDefault();
            const email=this.state.controls.email;
            const password=this.state.controls.password;
            this.props.onAuth(email,password);
    }
    render (){
        const formElementsArray = [];
        for (let key in this.state.controls ) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }
        const form=formElementsArray.map(e=>(
            <Input
            key={e.id}
            elementType={e.config.elementType}
            elementConfig={e.config.elementConfig}
            value={e.config.value}
            invalid={!e.config.valid}
            shouldValidate={e.config.validation}
            touched={e.config.touched}
            changed={(event) => this.inputChangedHandler(event, e.id)} />
            
        ))
     
        return(
            <div className={classes.Auth}>
                <form onSubmit={this.submitHandler}>
                    {form}
                <Button btnType="Success">Submit</Button>
                </form>
            </div>
        );
    }
}

const mapDispatchToProps=dispatch =>{
    return{
        onAuth:(email,password)=>dispatch(actions.auth(email,password))
    }
}

export default connect(null,mapDispatchToProps)(Auth);