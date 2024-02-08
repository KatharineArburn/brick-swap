import { csrfFetch } from "./csrf";

export const LOAD_TAGS = "tags/LOAD_TAGS"

export const loadTags = (tags, legoId) => ({
    type: LOAD_TAGS,
    tags,
    legoId
})

export const getAllTags = (legoId) => async (dispatch) => {
    const res = await fetch(`/api/lego/:legoId/tags`)

    if (res.ok) {
        const data = await res.json();
        dispatch(loadTags(data, legoId))
        return data;
    }
    return res
}

const tagReducer = (state = {}, action) => {
    switch(action.type) {
        case LOAD_TAGS:
            const tagState = {};
            action.tags.Tags.forEach((tag) => {
                tagState[tag.id] = tag
            })
            return { ...state, [action.legoId]: tagState}
        default:
            return state;
        }
}

export default tagReducer
