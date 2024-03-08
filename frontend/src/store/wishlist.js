import { csrfFetch } from "./csrf";

export const LOAD_WISHLIST = "wishlist/LOAD_WISHLIST";
// export const ADDTO_WISHLIST = "wishlist/ADDTO_WISHLIST";
// export const REMOVE_WISHLIST = "wishlist/REMOVE_WISHLIST";


export const loadWishlist = (wishlist) => ({
    type: LOAD_WISHLIST,
    wishlist
});

// export const postWishlist = (legoId, payload) => ({
//     type: ADDTO_WISHLIST,
//     legoId,
//     payload
// })

// export const deleteFromWishlist = (wish)

// export const removeWishlist = (legoId) => ({
//     type: REMOVE_LEGO,
//     legoId
// });

export const getUserWishlist = (userId) => async (dispatch) => {
    const res = await fetch(`/api/wishlist/${userId}`)

    if (res.ok) {
        const data = await res.json();
        dispatch(loadWishlist(data));
    }
    return res

}

export const addToWishlist = (legoId) => async (dispatch) => {
    try {
        await fetch(`api/lego/${legoId}/wishlist`, {
            method: 'POST'
        })
    }
    catch (err) {
        return err
    }
}

export const deleteFromWishlist = (legoId) => async (dispatch) => {
    try {
        await fetch(`api/lego/${legoId}/wishlist`, {
            method: 'DELETE'
        })
    }
    catch (err) {
        return err
    }
}

const wishlistReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_WISHLIST:
            const wishlist = action.wishlist.reduce((obj, set) => {
                obj[set.id] = set;
                return obj
            }, {});
            return {...wishlist}
        default:
            return state;
    }
}

export default wishlistReducer;
