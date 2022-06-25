const initialState = {}




export const ureducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_U":
            return state = action.payload
        default:
            return state;
    }
}