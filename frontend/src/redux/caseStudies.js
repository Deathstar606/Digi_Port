import * as ActionTypes from "./ActionTypes"

export const Cases = (state = { 
    isLoading: true,
    errMess: null,
    case:[]
    }, action) => {
    switch (action.type) {
        case ActionTypes.ADD_CASE:
            return {...state, isLoading: false, errMess: null, case: action.payload};

        case ActionTypes.CASE_LOADING:
            return {...state, isLoading: true, errMess: null, case: []}

        case ActionTypes.CASE_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
    }
};