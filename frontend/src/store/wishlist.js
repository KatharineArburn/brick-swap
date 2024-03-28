import { csrfFetch } from "./csrf";

export const LOAD_WISHLIST = "wishlist/LOAD_WISHLIST";
export const ADDTO_WISHLIST = "wishlist/ADDTO_WISHLIST";
export const REMOVE_WISHLIST = "wishlist/REMOVE_WISHLIST";


export const loadWishlist = (wishlist, userId) => ({
    type: LOAD_WISHLIST,
    wishlist,
    userId
});

export const postWishlist = (legoId, payload) => ({
    type: ADDTO_WISHLIST,
    legoId,
    payload
})


export const removeWishlist = (legoId) => ({
    type: REMOVE_WISHLIST,
    legoId
});

export const getUserWishlist = (userId) => async (dispatch) => {
    const res = await fetch(`/api/wishlist/${userId}`)

    if (res.ok) {
        const data = await res.json();
        // console.log("DATA", data)
        dispatch(loadWishlist(data));
        // return data
    }

    return res

}

export const addToWishlist = (legoId) => async (dispatch) => {
    const res = await csrfFetch(`/api/lego/${legoId}/wishlist`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // body: JSON.stringify(legoId),
    });
    if (res.ok) {
        const data = await res.json();
        // console.log(data)
        dispatch(postWishlist(legoId, data))
        return data;
    }
    return res;
}

export const deleteFromWishlist = (wishlistId) => async (dispatch) => {
    const res = await csrfFetch(`/api/wishlist/${wishlistId}`, {
        method: "DELETE"
    });
    console.log ("RES", res)
    if (res.ok) {
        const data = await res.json();
        dispatch(removeWishlist(wishlistId))
        return data;
    }
    return res
}

const wishlistReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_WISHLIST:
            const wishlistState = {...state};
            action.wishlist.forEach((wishlist) => {
                if (!wishlistState[wishlist.id]) {
                    wishlistState[wishlist.id] = wishlist;
                }
            })
            return {...wishlistState}
        // case ADDTO_WISHLIST:
        //     return state;
        // case REMOVE_WISHLIST:
        //     return state;
        default:
            return state;
    }
}

export default wishlistReducer;
