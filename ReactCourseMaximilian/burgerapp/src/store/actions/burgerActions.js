import * as actionTypes from './actionTypes';
import axios from '../../axios/AxiosRequests';
export const addIngredient=(name)=>{
        return{
            type:actionTypes.ADD_INGREDIENT,
            ingName:name
        }
}

export const removeIngredient=(name)=>{
    return{
        type:actionTypes.REMOVE_INGREDIENT,
        ingName:name
    }
}

export const setIngridients=(ingredients)=>{
    return {
        type:actionTypes.SET_INGREDIENTS,
        ingredients:ingredients
    }
}

export const fetchIngredientsFailed=()=>{
    return {
        type:actionTypes.SET_INGREDIENTS_FAILED
        
    }
}

export const initIngredients=()=>{
    return dispatch=>{
        axios.get( 'https://burgerapp-d7689.firebaseio.com/ingredients.json')
        .then(res=>{
           dispatch(setIngridients(res.data))
        })
        .catch(e=>{
            dispatch(fetchIngredientsFailed())
        })
    }
}