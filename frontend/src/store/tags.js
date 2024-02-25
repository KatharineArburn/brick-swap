import { csrfFetch } from "./csrf";

export const LOAD_TAGS = "tags/LOAD_TAGS"
export const CREATE_TAGS = "tags/CREATE_TAGS"
export const UPDATE_TAGS = "tags/UPDATE_TAGS"
export const REMOVE_TAG = "tags/REMOVE_TAG"

export const loadTags = (tags, legoId) => ({
    type: LOAD_TAGS,
    tags,
    legoId
})

export const postTags = (legoId, payload) => ({
    type: CREATE_TAGS,
    legoId,
    payload
})

export const editTag = (payload, tagId) => ({
    type: UPDATE_TAGS,
    payload,
    tagId
})

export const removeTag = (tag) => ({
    type: REMOVE_TAG,
    tag,
})

export const getAllTags = (legoId) => async (dispatch) => {
    const res = await fetch(`/api/lego/${legoId}/tags`)

    if (res.ok) {
        const data = await res.json();
        dispatch(loadTags(data, legoId))
        return data;
    }
    return res
}

export const createTag = (payload) => async (dispatch) => {
    const res = await csrfFetch(`/api/lego/${payload.legoId}/tags`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
    if (res.ok) {
        const data = await res.json();
        // console.log(data)
        dispatch(postTags(data))
        return data;
    }
    return res;
}

export const updateTag = (payload, tagId) => async (dispatch) => {
    const res = await csrfFetch(`/api/tag/${tagId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    })
    if (res.ok) {
        const data = await res.json();
        dispatch(editTag(data))
        return data
    }
    return res
}

export const deleteTag = (tagId) => async (dispatch) => {
    const res = await csrfFetch(`/api/tag/${tagId}`, {
        method: "DELETE"
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(removeTag(tagId))
        return data;
    }
    return res;
}

const tagReducer = (state = {}, action) => {
    switch(action.type) {
        case LOAD_TAGS:
            const tagState = { ...state};
            action.tags.Tags.forEach((tag) => {
                tagState[tag.id] = tag
            })
            return { ...state, [action.legoId]: tagState}
        case CREATE_TAGS:
            if (action.tags) {
                const updatedSetTags = { ...state.tags, [action.tag.id]: action.tag };
                // return { ...state, updatedSetTags}
                return {...state, tagReviews: updatedSetTags}
            } else {
                return state;
            }
        case UPDATE_TAGS:
            const updateState = {...state, [action.tagId]: action.tag}
            return updateState
            // return {...state, [action.tagId]: action.tag}
        case REMOVE_TAG:
            const newState = { ...state };
            delete newState[action.tagId];
            return newState;
        default:
            return state;
        }
}

export default tagReducer
