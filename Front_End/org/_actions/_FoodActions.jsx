export function fetchUserFoods(restaurant){
    return function (dispatch){
        fetch(`http://104.248.247.26:3000/food/byRestaurant/${restaurant}`, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            method: 'GET'
        })
        .then((res) => {return res.json()} )
        .then((data) => {
            dispatch({
                type: 'FETCH_USER_FOODS',
                payload: data
            })
        })
    }
}

export function addFood(food){
    return (dispatch) => {
        fetch(`http://104.248.247.26:3000/food/byUser`, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                id:food.id,
                restaurant: food.restaurant,
                address: food.address,
                itemName: food.itemName,
                price: food.price,
                imageUrl: food.imageUrl
            })
        })
        .then((res) => {return res.json()})
        .then((data) => {
            dispatch({
                type: 'ADD_FOOD',
                payload: data
            })
        })
    }
}

export function deleteFood(_id){
    return (dispatch) => {
        fetch(`http://104.248.247.26:3000/delete/one/${_id}`, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            method: 'DELETE',
        })
        .then((res) => {return JSON.stringify(res)})
        .then(dispatch({
            type: 'DELETE_FOOD',
            payload: _id
        }))
    }
}

export function getFood(_id){
    return (dispatch) => {
        fetch(`http://104.248.247.26:3000/get/one/${_id}`, {
            method: 'GET'
        })
        .then((res) => {return res.json()})
        .then((data) => {
            dispatch({
                type: 'GET_FOOD',
                payload: data
            })
        })
    }
}

export function updateFood(food){
    return (dispatch) => {
        fetch(`http://104.248.247.26:3000/update/one`, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify(food)
        })
        .then((res) => {dispatch(fetchUserFoods(sessionStorage.getItem('restaurant')))})
    }
}