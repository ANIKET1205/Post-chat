const initialState = {
    id: "",
    fname: "",
    lname: "",
    gender: "",
    email: "",
    mobile: "",
    pass: "",
    login: false
}




export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_USER":
            return state = action.payload
        // case "UPDATE_PASSWORD":
        //     return forgotPassword(action.payload)

        default:
            return state;
    }
}