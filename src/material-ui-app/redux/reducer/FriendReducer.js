const initialState = {}




export const friendReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_FRIEND":
            return state = action.payload
        default:
            return state;
    }
}