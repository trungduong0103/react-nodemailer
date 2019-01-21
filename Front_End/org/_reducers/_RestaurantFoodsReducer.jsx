const userfoods = (state = [], action) => {
    switch(action.type){
        case 'ADD_FOOD':
            return [...state, action.payload];
        case 'DELETE_FOOD':
            return state.filter((res) => res._id !== action.payload);
        case  'FETCH_USER_FOODS':
            return state = action.payload;
        default: 
            return state;
    }
}

export default userfoods;