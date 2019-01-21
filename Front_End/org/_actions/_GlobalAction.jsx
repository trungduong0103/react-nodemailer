export function fetchAllFoods(){
    return function (dispatch){
        fetch(`http://104.248.247.26:3000/food/all`)
        .then((res) => {return res.json()})
        .then(data => {
            dispatch({
                type: 'FETCH_ALL_FOODS',
                payload: data
            })
        })
    }
}