import { csrfFetch } from "./csrf";

export const LOAD_LEGO = "lego/LOAD_LEGO";
export const LEGO_DETAILS = "lego/LEGO_DETAILS";
export const CREATE_LEGO = "lego/CREATE_LEGO";
export const UPDATE_LEGO = "lego/UPDATE_LEGO";
export const REMOVE_LEGO = "lego/REMOVE_LEGO";

export const loadLego = (lego) => ({
    type: LOAD_LEGO,
    lego
});

export const legoDetails = (lego) => ({
    type: LEGO_DETAILS,
    lego
});

export const editLego = (lego) => ({
    type: UPDATE_LEGO,
    lego
});

export const removeLego (legoId) = ({
    type: REMOVE_LEGO,
    legoId
});
