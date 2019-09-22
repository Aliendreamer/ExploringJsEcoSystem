import React,{Component} from 'react';
import Aux from '../../hoc/AuxWrapper';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BurgerControls/BurgerControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios/AxiosRequests';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/WithErrorHandler';
import {connect} from 'react-redux';
import * as burgerActions from '../../store/actions';


class BurgerBuilder extends Component{

    state={
        purshasing:false,
    }
    
    componentDidMount(){
       this.props.onInitingridients()
    }

    updatePurchaseButton=(ingredients)=>{

        let sum=Object.keys(ingredients)
        .map(i=>{
            return ingredients[i]
        })
        .reduce((sum,price)=>{
         return sum + price
      },0)
     return sum>0;
  
    }

    purchaseCancelHandler=()=>{
        this.setState({purshasing:false})
    }

    purchaseHandler=()=>{
        this.setState({
            purshasing:true
        })
    }
    purchaseContinueHandler=()=>{
        this.props.onPurchase()
        this.props.history.push('/checkout');
    }
   

    render(){

        let disabled={
            ...this.props.ings
        }

        for (let key in disabled) {
             
            disabled[key] = disabled[key]<=0;            
        }
      
        let orderSummary=null;
        let burger=this.props.errors?<p>ingredients can't be loaded</p> :<Spinner/>
     
    
        if(this.props.ings){
            burger=
            (<Aux>
           <Burger ingredients={this.props.ings}/>
           <BurgerControls
           ingredientAdded={this.props.onIngridientAdded}
           ingredientRemoved={this.props.onIngridientDelete}
           disabled={disabled}
           purchasable={this.updatePurchaseButton(this.props.ings)}
           price={this.props.totalPrice}
           ordered={this.purchaseHandler}/>
           </Aux>)

            orderSummary=<OrderSummary
            price={this.props.totalPrice}
            cancel={this.purchaseCancelHandler}
            continue={this.purchaseContinueHandler}
            ingredients={this.props.ings}/>
        }
 

        return(
            <Aux>
                <Modal 
                show={this.state.purshasing} 
                close={this.purchaseCancelHandler}>
                    {orderSummary}
                 </Modal> 
                    {burger}
            </Aux>
        );
    }
}
const mapStateToProps=state=>{
    return{
        ings:state.burgerReducer.ingredients,
        totalPrice:state.burgerReducer.totalPrice,
        errors:state.burgerReducer.errors
    }
}

const mapDispatchToProps=dispatch=>{
        return {
            onIngridientAdded: (ingName)=>dispatch(burgerActions.addIngredient(ingName)),
            onIngridientDelete: (ingName)=>dispatch(burgerActions.removeIngredient(ingName)),
            onInitingridients:()=>dispatch(burgerActions.initIngredients()),
            onPurchase:()=>dispatch(burgerActions.purchaseInit())

        }
}

export  default connect(mapStateToProps,mapDispatchToProps)( WithErrorHandler(BurgerBuilder,axios));