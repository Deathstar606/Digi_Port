import * as ActionTypes from "./ActionTypes"

export const People = (state = { 
    isLoading: true,
    errMess: null,
    people:[]
    }, action) => {
    switch (action.type) {
        case ActionTypes.ADD_PEOPLE:
            return {...state, isLoading: false, errMess: null, people: action.payload};

        case ActionTypes.PEOPLE_LOADING:
            return {...state, isLoading: true, errMess: null, people: []}

        case ActionTypes.PEOPLE_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
    }
};