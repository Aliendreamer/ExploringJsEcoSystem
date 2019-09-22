import React, { Component } from 'react';
import{ connect } from 'react-redux'
import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';
//import  * as actionTypes from '../../store/actions';
import {increment, decrement, add, substract, store_result, store_delete} from '../../store/actions';
class Counter extends Component {
   

    // counterChangedHandler = ( action, value ) => {
    //     switch ( action ) {
    //         case 'inc':
    //             this.setState( ( prevState ) => {props.state.ctr } )
    //             break;
    //         case 'dec':
    //             this.setState( ( prevState ) => { return { counter: prevState.counter - 1 } } )
    //             break;
    //         case 'add':
    //             this.setState( ( prevState ) => { return { counter: prevState.counter + value } } )
    //             break;
    //         case 'sub':
    //             this.setState( ( prevState ) => { return { counter: prevState.counter - value } } )
    //             break;
    //     }
    // }

    render () {
        return (
            <div>
                <CounterOutput value={this.props.ctr} />
                <CounterControl label="Increment" clicked={this.props.onDecrementCounter} />
                <CounterControl label="Decrement" clicked={this.props.onDecrementCounter}  />
                <CounterControl label="Add 5" clicked={this.props.onAddCounter(5)}  />
                <CounterControl label="Subtract 5" clicked={this.props.onSubstractCounter(5)}  />
                <hr/>
                <button onClick={()=>this.props.onStoreResult(this.props.ctr)}>store result </button>
                <ul>
                {this.props.storedResults.map(str=>(
                    <li key={str.id} onClick={()=>this.props.onStoreDelete(str.id)}>{str.v}</li>
                ))}
                </ul>
            </div>
        );
    }
}
const mapDispatchToProps=dispatch=>{
    return {
        onIncrementCounter:()=>dispatch(increment()),
        onDecrementCounter:()=>dispatch(decrement()),
        onAddCounter:()=>dispatch(add(5)),
        onSubstractCounter:()=>dispatch(substract(5)) ,
        onStoreResult:(result)=>dispatch(store_result(result)),
        onStoreDelete:(id)=>dispatch(store_delete(id))
    }
}

const mapStateToProps = state =>{
    return {
        ctr:state.ctr.counter,
        storedResults:state.res.results
    };
} 
export default connect(mapStateToProps,mapDispatchToProps)(Counter); 