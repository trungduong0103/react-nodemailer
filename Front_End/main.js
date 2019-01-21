import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

//foods
import allfoods from './org/_reducers/_AllFoodsReducer.jsx'
import userfoods from './org/_reducers/_RestaurantFoodsReducer.jsx'
import editfood from './org/_reducers/_EditFoodReducer.jsx'

import status from './org/reducers/LoggingReducer.jsx'


var centralState = combineReducers({
    //Foods
    allfoods: allfoods,
    userfoods: userfoods,
    editfood: editfood,

    //Logging
    status: status,

})

var store = createStore(centralState, applyMiddleware(thunk))

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('app'))