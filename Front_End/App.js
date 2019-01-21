import React from 'react';
import { connect } from 'react-redux';

import { browserHistory } from 'react-router-dom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { fetchUserFoods, addFood, deleteFood, getFood, updateFood, sendConfirmation } from './org/_actions/_FoodActions.jsx'
import { fetchAllFoods } from './org/_actions/_GlobalAction.jsx'
import { sendOrder } from './org/_actions/_OrderAction.jsx'
import {sendFeedback} from './org/_actions/_FeedbackAction.jsx'
import FoodManagement from './org/_components/_management/_FoodManagement.jsx'
import HomePage from './org/_components/_home/_HomePage.jsx'

//LoggingPages && LoggingActions
import SignIn from './org/components/logging/SignIn.jsx';
import Register from './org/components/logging/Register.jsx';
import { logIn, register } from './org/actions/LoggingAction.jsx';

//PageNotFound Handling
import PageNotFound from './org/components/etc/PageNotFound.jsx';
import About from './org/_components/_etc/About.jsx';

//css
import './index.css'

class App extends React.Component {
    constructor(props) {
        super(props)
    }



    render() {
        return (
            <Router history={browserHistory} >
                <div>
                    <Switch>
                        
                        <Route path="/" exact render={
                            () =>
                                <HomePage
                                    fetchAllFoods={this.props.fetchAllFoods}
                                    allfoods={this.props.allfoods}
                                    getFood={(_id) => this.props.getFood(_id)}
                                    editfood={this.props.editfood}
                                    sendOrder={(order) => this.props.sendOrder(order)}

                                />
                        } />

                        <Route path="/home" exact render={
                            () =>
                                <HomePage
                                    fetchAllFoods={this.props.fetchAllFoods}
                                    allfoods={this.props.allfoods}
                                    getFood={(_id) => this.props.getFood(_id)}
                                    editfood={this.props.editfood}
                                    sendOrder={(order) => this.props.sendOrder(order)}
                                    sendFeedback={(feedback) => this.props.sendFeedback(feedback)}
                                />
                        } />
                        
                        <Route path="/signin" exact render={
                            () =>
                                <SignIn
                                    status={this.props.status}
                                    logIn={(cred) => this.props.logIn(cred)} />
                        } />

                        <Route path="/register" exact render={
                            () =>
                                <Register
                                    status={this.props.status}
                                    register={(cred) => this.props.register(cred)}
                                />
                        } />

                        <Route path="/restaurant" exact render={
                            () =>
                                <FoodManagement />
                        } />

                        <Route path="/about" exact component={About} />

                        <Route component={PageNotFound} />

                    </Switch>

                </div>

            </Router>
        )
    }

}

const mapStateToProps = (centralState) => {
    return {
        allfoods: centralState.allfoods,
        userfoods: centralState.userfoods,
        editfood: centralState.editfood,
        status: centralState.status,

    }
}

const mapDispatchToProps = dispatch => ({
    //Foods 
    fetchAllFoods: () => dispatch(fetchAllFoods()),
    fetchUserFoods: (restaurant) => dispatch(fetchUserFoods(restaurant)),
    addFood: (food) => dispatch(addFood(food)),
    deleteFood: (_id) => dispatch(deleteFood(_id)),
    getFood: (_id) => dispatch(getFood(_id)),
    updateFood: (food) => dispatch(updateFood(food)),
    sendOrder: (order) => dispatch(sendOrder(order)),
    sendFeedback:(feedback) => dispatch(sendFeedback(feedback)),

    //Logging
    logIn: (cred) => dispatch(logIn(cred)),
    register: (cred) => dispatch(register(cred)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)