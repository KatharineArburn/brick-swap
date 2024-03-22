import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getAllTags, deleteTag } from "../../store/tags"
import { useModal } from "../../context/Modal";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem"
// import UpdateTagForm from "./TagForms/UpdateTagModal"
import CreateTagForm from "./TagForms/CreateTagModal"
import "./Tags.css";

const Tags = () => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [reload, setReload] = useState(false);
    const { legoId } = useParams();

    const sessionUser = useSelector((state) => {
        return state.session.user
    })

    const tags = Object.values(useSelector((state) => {
        // console.log('TAGS', state.lego.User.Tags)
        return state.lego.User.Tags
    }))

    const tagUserId = (useSelector((state) => {
        return state.lego.User.id
    }))

    // console.log('TAGS', tags)

    const lego = useSelector((state) => {
        return state.lego
    })

    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        dispatch(getAllTags(legoId))
        .then(() => setIsLoading(true))
    }, [dispatch, legoId])

    if (!isLoading) return <h1>Loading...</h1>

    const loggedIn = sessionUser ? true : null
    // const noTags = tags.length ? true: false
    // const userSet = !loggedIn || !Object.values(lego).find((lego) => lego.userId === sessionUser.id)

    const userSet = lego.userId === sessionUser.id
// console.log(userSet)

    // const handelDelete = (e) => {
    //     e.preventDefault();
    //     dispatch(deleteTag(tagId))
    //         .then(() => closeModal())
    //         .then(setReload(!reload))
    // }

    return (
        <>
            <button hidden={(loggedIn && !userSet) || (!loggedIn)} className="tagbtn">
            <OpenModalMenuItem
            itemText="Add tags to this set"
            modalComponent={<CreateTagForm legoId={legoId} />}/>
                </button>
        <div className="tag-list">
            {Object.values(tags).map((tag) => (
                <div>
                    <li key={tag.id}>
                        <p className='tag-name'>{tag.tag}</p>
                    </li>
                </div>
            ))}
        </div>
        </>
    )
}

export default Tags
