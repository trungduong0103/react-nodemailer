import React, { Component } from 'react'
import GridView from './_GridView.jsx'
import Navigation from '../_etc/_Navigation.jsx'

export default class HomePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentfoods: this.props.allfoods,
            keyword: ''
        }
    }

    componentWillMount() {
        this.props.fetchAllFoods()
    }

    componentWillReceiveProps(nextprops) {
        this.setState({ currentfoods: nextprops.allfoods })
    }

    clearKey() {
        this.setState({ currentfoods: this.props.allfoods, keyword: '' })
    }

    handleChange(e) {

    }

    filterByPrice(filter) {
        if (filter === 'LOW_TO_HIGH') {
            let lth = this.props.allfoods.sort(function (a, b) {
                return parseFloat(a.price) - parseFloat(b.price)
            });
            this.setState({ currentfoods: lth })
        }

        else if (filter === 'HIGH_TO_LOW') {
            let htl = this.props.allfoods.sort(function (a, b) {
                return parseFloat(b.price) - parseFloat(a.price)
            })
            this.setState({ currentfoods: htl })
        }
    }

    onFind(e) {
        var target = e.target
        var name = target.name
        var value = target.value
        this.setState({ [name]: value })

        var key = this.state.keyword.toLowerCase()
        if (this.state.keyword === undefined || this.state.keyword === null) {
            this.setState({ currentfoods: this.props.allfoods })
        }
        this.setState({
            currentfoods: this.props.allfoods.filter(food => food.itemName.toLowerCase().indexOf(key) !== -1)
        })
    }

    filterByCategory(filter) {
        this.setState({
            currentfoods: this.props.allfoods.filter(food=> food.restaurant == filter)
        })
    }

    render() {
        return (
            <div>
                <Navigation />

                <div id="featuredfoods" className="carousel slide" data-ride="carousel">
                    <ol className="carousel-indicators">
                        <li data-target="#featuredfoods" data-slide-to="0" className="active"></li>
                        <li data-target="#featuredfoods" data-slide-to="1"></li>
                        <li data-target="#featuredfoods" data-slide-to="2"></li>
                    </ol>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img className="d-block w-100" src="https://sifu.unileversolutions.com/image/en-AU/recipe-topvisual/2/1260-709/chicken-ratatouille-50275431.jpg" style={{ height: "100vh", maxWidth: "100vw" }} alt="First slide" />
                        </div>
                        <div className="carousel-item">
                            <img className="d-block w-100" src="https://assets.epicurious.com/photos/576b38c090773c635caa8117/master/pass/ratatouille.jpg" style={{ height: "100vh", width: "100vw" }} alt="Second slide" />
                        </div>
                        <div className="carousel-item">
                            <img className="d-block w-100" src="https://www.cbc.ca/food/content/images/recipes/CowboySteak.jpg" style={{ height: "100vh", width: "100vw" }} alt="Third slide" />
                        </div>
                    </div>
                    <a className="carousel-control-prev" href="#featuredfoods" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#featuredfoods" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>

                <br />

                <div className="container jumbotron text-center" style={{ backgroundColor: "#ffffff" }}>
                    <div className="row">
                        <div className="col-sm-12" align="center">
                            <h1 className="h1">Featured Dishes</h1>
                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="input-group add-on">
                                <input type="text" className="form-control" placeholder="Search For Title" name="keyword" id="srch-term" value={this.state.keyword} onChange={this.onFind.bind(this)} />
                                &nbsp;
                                    <button className="btn btn-warning" onClick={this.clearKey}><i className="fas fa-times"></i></button>
                            </div>
                        </div>
                    </div>
                </div>

                <br />

                <div className="container">
                    <div className="row" align="center">
                        <div className="col-sm-2">
                            <div className="dropdown">
                                <button className="btn btn-outline-dark dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Price
                                </button>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <a className="dropdown-item" role="button" onClick={() => this.filterByPrice('HIGH_TO_LOW')}>High to Low</a>
                                    <a className="dropdown-item" role="button" onClick={() => this.filterByPrice('LOW_TO_HIGH')}>Low to High</a>
                                </div>
                            </div>
                        </div>


                        <div className='col-sm-2'>
                            <div className="dropdown">
                                <button className="btn btn-outline-dark dropdown-toggle" type="button" id="dropDownProjectButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Restaurant
                                </button>
                                <div className="dropdown-menu" aria-labelledby="dropDownProjectButton">
                                    <a role="button" className="dropdown-item" onClick={() => this.filterByCategory('KFC')}>KFC</a>
                                    <a role="button" className="dropdown-item" onClick={() => this.filterByCategory('Texas Chicken Vietnam')}>Texas Chicken Vietnam</a>
                                    <a role="button" className="dropdown-item" onClick={() => this.filterByCategory('Oven Maru Chicken')}>Oven Maru Chicken</a>
                                    <a role="button" className="dropdown-item" onClick={() => this.filterByCategory('The Pizza Company')}>The Pizza Company</a>
                                    <a role="button" className="dropdown-item" onClick={() => this.filterByCategory("Pizza 4 P's")}>Pizza 4 P's</a>
                                    <a role="button" className="dropdown-item" onClick={() => this.filterByCategory("Domino's Pizza")}>Domino's Pizza</a>
                                    <a role="button" className="dropdown-item" onClick={() => this.filterByCategory("Marukame Udon")}>Marukame Udon</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <br/>

                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <GridView
                            allfoods = {this.state.currentfoods}
                            editfood = {this.props.editfood}
                            getFood = {(_id) => this.props.getFood(_id)}
                            sendOrder = {(order) => this.props.sendOrder(order)}
                            sendFeedback={(feedback) => this.props.sendFeedback(feedback)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


    function helloWorldw3(cb) {
        console.log('1');
        return Promise.resolve('2').then(data => {
            console.log(data);
            return '3';
        }).then(data => {
            cb(data);
            return Promise.resolve('4')
        }).then(cb);
        }