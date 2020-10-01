import * as ActionTypes from './ActionTypes'

export const dishes = (
    state = {
        isLoading: true,
        dishes: [],
        errMess: null,
    },
    action
) => {
    switch(action.type) {
        case ActionTypes.DISHES_LOADING:
            return {
                ...state,
                isLoading: true,
                dishes: [],
                errMess: null
            }
        case ActionTypes.ADD_DISHES:
            return {
                ...state,
                isLoading: false,
                dishes: action.payload,
                errMess: null
            }
        case ActionTypes.DISHES_FAILED:
            return {
                ...state,
                isLoading: false,
                dishes: [],
                errMess: action.payload 
            }
        default:
            return state;
    }
}