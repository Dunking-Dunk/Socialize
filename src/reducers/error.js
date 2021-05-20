const errorReducer = (state = "", action) => {
    switch (action.type) {
        case 'SIGN_IN_ERROR':
            return action.payload
        default:
            return state
    }
}
export default errorReducer