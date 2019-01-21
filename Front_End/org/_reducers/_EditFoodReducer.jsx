const editfood = (state = {}, action) => {
    switch(action.type){
        case 'GET_FOOD':
            return action.payload ;
        default: 
            return state;
    }
}

export default editfood;