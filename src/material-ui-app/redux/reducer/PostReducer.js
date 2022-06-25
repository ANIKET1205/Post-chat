const initialState = []




export const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_POSTS":
            // console.log("BUV");
            return state = action.payload
        // case "UPDATE_PASSWORD":
        //     return forgotPassword(action.payload)
        case "REMOVE_POSTS":
            let nvar = state.filter(p => p.id !== action.payload)
            return state = nvar
        case "SET_LIKE_POST":
            state.map(p=>p.id===action.payload.id ? p.likes = action.payload.likes : null)
            // console.log('redu',state);
            // let nvr = state.filter(p => p.id !== action.payload)
            return state = state

        default:
            return state;
    }
}