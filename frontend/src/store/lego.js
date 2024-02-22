import { csrfFetch } from "./csrf";

export const LOAD_LEGO = "lego/LOAD_LEGO";
export const LEGO_DETAILS = "lego/LEGO_DETAILS";
export const CREATE_LEGO = "lego/CREATE_LEGO";
export const UPDATE_LEGO = "lego/UPDATE_LEGO";
export const REMOVE_LEGO = "lego/REMOVE_LEGO";

export const loadLego = (lego, userId) => ({
    type: LOAD_LEGO,
    lego: lego,
    userId
});

export const legoDetails = (lego) => ({
    type: LEGO_DETAILS,
    lego: lego
});

export const editLego = (lego) => ({
    type: UPDATE_LEGO,
    lego
});

export const removeLego = (legoId) => ({
    type: REMOVE_LEGO,
    legoId
});

export const getAllLego = () => async (dispatch) => {
    const res = await fetch('/api/lego');

    if (res.ok) {
        const data = await res.json();
        dispatch(loadLego(data));
    }

    return res
}

export const deleteLego = (legoId) => async (dispatch) => {
    const res = await csrfFetch(`/api/lego/${legoId}`, {
        method: "DELETE"
    })
    if (res.ok) {
        const data = await res.json();
        dispatch(removeLego(legoId));
        return data;
    }
    return res;
}

export const getLegoDetails = (legoId) => async (dispatch) => {
    const res = await fetch(`/api/lego/${legoId}`)

    if (res.ok) {
        const data = await res.json();
        dispatch(legoDetails(data));
        // console.log("DATA", data)
    }

    return res
}

export const createLego = (payload) => async (dispatch) => {
    const res = await csrfFetch('/api/lego', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    })

    if (res.ok) {
        const data = await res.json();
        dispatch(getAllLego(data))
        return data;
    }
    return res
}

export const findUserLego = (userId) => async (dispatch) => {
    const res = await csrfFetch(`/api/profile/${userId}`)

    if (res.ok) {
        const data = await res.json();
        dispatch(loadLego(data));
    }
    return res
}

export const updateLego = (payload) => async (dispatch) => {
    const res = await csrfFetch(`/api/lego/${payload.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    })

    if (res.ok) {
        const data = await res.json();
        dispatch(editLego(data))
        return data;
    }
    return res
}

const legoReducer = (state = {}, action) => {
    switch(action.type) {
        case LOAD_LEGO:
            const legoState = {...state};
            action.lego.Lego.forEach((lego) => {
                if (!legoState[lego.id]) {
                    legoState[lego.id] = lego;
                }
            })
            return {...legoState}
        case LEGO_DETAILS:
            return { ...action.lego }
        case UPDATE_LEGO:
            return {...state, [action.lego.id]: action.lego}
        case REMOVE_LEGO:
            const newState = { ...state };
            delete newState[action.legoId];
            return newState;
        default:
            return state;
    }
};

export default legoReducer
