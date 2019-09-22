import React,{Component} from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios/AxiosRequests';
import withErrorHandler from '../../hoc/WithErrorHandler';
import *as actionTypes from "../../store/actions";
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
class Orders extends Component{

    componentDidMount(){
        this.props.onFetchOrders()
    }

  render(){
      let ordersInfo=<Spinner/>
      if(!this.props.loading){
        ordersInfo=<div>
        {this.props.orders.map(o=>
         (
         <Order
         ingredients={o.ingredients}
         price={o.price}
          key={o.id}
           />))}
     </div>
      }
    return ordersInfo;
  }
}

const mapStateToProps=state=>{
   return {
     orders:state.orderReducer.orders,
     loading:state.orderReducer.loading
    }
}

const mapDispatchedToProps=dispatch=>{
  return{
    onFetchOrders:()=>dispatch(actionTypes.fetchOrders())
  }
}

export default  connect(mapStateToProps,mapDispatchedToProps)(withErrorHandler (Orders,axios));