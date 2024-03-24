export const LOAD_PROFILE = "profile/LOAD_PROFILE"

export const loadProfile = (userId) => ({
    type: LOAD_PROFILE,
    userId
})

export const getUserProfile = (userId) => async (dispatch) => {
    const res = await fetch(`/api/profile/${userId}`)

    if (res.ok) {
        const data = await res.json();
        // console.log(data)
        dispatch(loadProfile(data));
    }
    return res
}

const profileReducer = (state = {}, action) => {
    switch(action.type) {
        case LOAD_PROFILE:
            // const profileState = {...state};
            // action.userInfo.forEach((user) => {
            //     if (!profileState[user.id]) {
            //         user[user.id] = user;
            //     }
            // })
            // return {...profileState}
            return { ...action.userId}
    default:
        return state;
    }
}

export default profileReducer
