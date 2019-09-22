import * as actionTypes from './actionTypes';
import axios from 'axios';
export const authStart=()=>{
    return {
        type:actionTypes.AUTH_START
    }
}

export const authSuccess=(authData)=>{
    return {
        type:actionTypes.AUTH_SUCCESS,
        authData:authData
    }
}

export const authFail=(error)=>{
    return {
        type:actionTypes.AUTH_FAILED,
        authError:error
    }
}

export const auth=(email,password)=>{
    return dispatch =>{
        dispatch(authStart());
        const authData={
            email:email,
            password:password,
            returnSecureToken:true
        }
        const options={
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
        }
        debugger;
        axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyA00wRdK-3FP2vRL4h_vu0G92pdw2sbtMk',authData,options)
        .then(response=>{
            console.log(response)
            debugger;
            dispatch(authSuccess(response.data))
        }).catch(err=>{
            debugger;
            dispatch(authFail(err))
        })

    }
}

