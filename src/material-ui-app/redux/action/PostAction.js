export const setupPosts = (data) => {
    // console.log("HELLo");
    return {
        type:"SET_POSTS",
        payload:data
    }
}

export const removePost = (data) => {
    return {
        type:"REMOVE_POSTS",
        payload:data
    }
}

export const setLikePost = (data) => {
    return {
        type:"SET_LIKE_POST",
        payload:data
    }
}