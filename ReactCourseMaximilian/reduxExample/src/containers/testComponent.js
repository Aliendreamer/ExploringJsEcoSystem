import React, { Component } from 'react';
import{ connect } from 'react-redux'

class TestComponent extends Component {
  

    render () {
        return (
            <div>
              <h2>testing reduceer</h2>
               <span style={{backgroundColor: 'red'}}>currentStateNum: {this.props.num}</span>
            </div>
        );
    }
}


const mapStateToProps = state =>{
    return {
        num:state.test.num,
    };
} 
export default connect(mapStateToProps,null)(TestComponent); 