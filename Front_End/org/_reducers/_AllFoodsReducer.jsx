const allfoods = (state = [], action) => {
    switch(action.type){
        case 'FETCH_ALL_FOODS':
            state = action.payload
            return state 
        default: 
            return state 
    }
}

export default allfoods;