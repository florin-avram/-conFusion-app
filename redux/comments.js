import * as ActionTypes from './ActionTypes'

export const comments = (
    state = {
        comments: [],
        errMess: null,
    },
    action
) => {
    switch(action.type) {
        case ActionTypes.ADD_COMMENTS:
            return {
                ...state,
                comments: action.payload,
                errMess: null
            }
        case ActionTypes.COMMENTS_FAILED:
            return {
                ...state,
                comments: [],
                errMess: action.payload 
            }
        default:
            return state;
    }
}