import * as actionTypes from './actionTypes';
import axios from '../../axios/AxiosRequests';

export const purchaseBurgerSuccess=(id,orderData)=>{
    return{
        type:actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId:id,
        orderData:orderData,
        loading:true
    }
}

export const purchaseBurgerFail=(error)=>{
    return{
        type:actionTypes.PURCHASE_BURGER_FAIL,
        error:error
    }
}

export const purchaseBurgerStart=()=>{
    return{
        type:actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseInit=()=>{
    return{
        type:actionTypes.PURCHASE_INIT
    }
}

export const purshaseBurger=(orderData)=>{
    return dispatch=>{
        dispatch(purchaseBurgerStart())
        axios.post( '/orders.json', orderData )
        .then( response => {
            dispatch(purchaseBurgerSuccess(response.data.name,orderData))
        } )
        .catch( error => {
           dispatch(purchaseBurgerFail(error))
        } );
    }
}

export const fetchOrderSuccess=(orders)=>{
     return {
         type: actionTypes.FETCH_ORDERS_SUCCESS,
         orders:orders
     }
}

export const fetchOrderFail=(error)=>{
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error:error
    }
}

export const fetchOrdersStart=()=>{
    return {
        type:actionTypes.FETCH_ORDERS,
    }
}

export const fetchOrders=()=>{
    return dispatch=>{
        dispatch(fetchOrdersStart())
        axios.get('/orders.json')
        .then(res=>{
           const fetchedOrders=[];
           for(let o in res.data){
               fetchedOrders.push({...res.data[o],id:o})
           }
           dispatch(fetchOrderSuccess(fetchedOrders ))
        })
        .catch(err=>{
            dispatch(fetchOrderFail(err))
        })
    }
}