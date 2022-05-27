import {AUTH} from '../constants/actionTypes';
import * as api from '../api';

export const signin = (formData, navigate) => async (dispatch) => {

try {
    //log in the user
    const {data}  = await api.signIn(formData);
    dispatch({type: AUTH, data});
    navigate("/");
} catch (error) {
    console.log(error);
}

}

export const signup = (formData, navigate) => async (dispatch) => {
    try {
        //sign up the user

        const {data} = await api.signUp(formData);
        console.log("Vad är Data: ",data);
        dispatch({type: AUTH, data});
        navigate("/");
    } catch (error) {
        console.log(error);
    }
    
    }