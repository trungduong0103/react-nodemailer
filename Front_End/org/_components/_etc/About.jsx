import React, { Component } from 'react'
import Navigation from './_Navigation.jsx'

export default class About extends Component {
    render() {
        return (
            <div className="about" >
                <Navigation />
                <div className="col-sm-12" align="center">
                    <h1 className="about-h1">Welcome to l'amour!</h1>
                    <br/>
                    <br/>
                    <h5>This Website is a food-ordering website that allows you to order your favorite food! You can browse from our food listing and choose your favorite food to order.</h5><br />
                    <h5>Before ordering a dish, you must Sign In through the Sign In page or press the Sign In button at the top right corner of your screen.</h5> <br />
                    <h5>If you don't have an account, you must Register with your username, password, and email. Make sure you enter your email correctly because the orders are sent to your email.</h5> <br />
                    <h5>Other than ordering a dish, you can also leave a feedback or a review of the dish.</h5>
                </div>
            </div>
        )
    }
}
