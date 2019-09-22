import React,{Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route,Redirect} from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import {connect} from 'react-redux';

class Checkout extends Component{


    checkoutCancelledHandler=()=>{
     
        this.props.history.goBack();
    }

    checkoutOrderHandler=()=>{
           
        this.props.history.replace("/checkout/contact-data");
    }
    render(){
        let summary=<Redirect to="/"/>
      
        if(this.props.ings){
            const redirect=this.props.purchased?<Redirect to="/"/>:null;
            summary=  <div>
                {redirect}
            <CheckoutSummary 
            ingredients={this.props.ings}
            checkoutCancelled={this.checkoutCancelledHandler}
            checkoutOrder={this.checkoutOrderHandler}/>
            <Route
             path={this.props.match.path + '/contact-data'}
             component={ContactData}
             />
        </div>
        }
        return(
         <div>{summary}</div> 
        );
    }
}

const mapStateToProps=state=>{
    return{
        ings:state.burgerReducer.ingredients,
        price:state.burgerReducer.totalPrice,
        purchased:state.orderReducer.purchased
    }
}


export default connect(mapStateToProps,null)(Checkout);