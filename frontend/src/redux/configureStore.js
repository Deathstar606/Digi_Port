import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
import { Cases } from './caseStudies';
import { People } from './people';
import { Auth } from './auth';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const ConfigStore = () => {            //used in app.js
    const store = createStore(                //buit in function of redux
        combineReducers({
            people: People,
            cases: Cases,
            auth: Auth
        }),
        applyMiddleware(thunk, logger)        //check explanation
    );

    return store;
}