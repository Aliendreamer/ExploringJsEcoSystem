import * as actionTypes from '../actions/actionTypes';

const INGRIDIENT_CONSTANTS={
    salad:0.5,
    meat: 1.3,
    bacon:0.7,
    cheese:0.4,
}
const initialState={
    ingredients:null,
    totalPrice:4,
    error:false,
}

const reducer=(state=initialState,action)=>{

    switch(action.type){

            case actionTypes.ADD_INGREDIENT:
                return {
                    ...state,
                    ingredients:{
                        ...state.ingredients,
                        [action.ingName]:state.ingredients[action.ingName]+1
                    },
                    totalPrice:state.totalPrice+INGRIDIENT_CONSTANTS[action.ingName]
                }

            case actionTypes.REMOVE_INGREDIENT:
                    return {
                        ...state,
                    ingredients:{
                        ...state.ingredients,
                        [action.ingName]:state.ingredients[action.ingName]-1
                    },
                    totalPrice:state.totalPrice-INGRIDIENT_CONSTANTS[action.ingName]
                }
            case actionTypes.SET_INGREDIENTS:
                    return{
                        ...state,
                        ingredients:action.ingredients,
                        error:false,
                        totalPrice:4
                    }

            case actionTypes.SET_INGREDIENTS_FAILED:
                return{
                    ...state,
                    error:true
                }
                default:
                    return state;
        }
}

export default reducer;