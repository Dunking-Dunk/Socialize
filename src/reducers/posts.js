const reducer = (state = [], action) => {
    switch (action.type) {
        case 'FETCH_POSTS':
            return action.payload
        case 'CREATE_POST':
            return [...state, action.payload]
        case 'EDIT_POST':
            return [...state, action.payload]
        case 'FETCH_POST':
            return [...state, action.payload]
        case 'DELETE_POST':
            return state.filter((post) => post._id !== action.payload)
        case 'UPDATE_LIKES':
            return state.map((post) => post._id === action.payload._id ? action.payload: post)
        default:
            return state
    }
}

export default reducer