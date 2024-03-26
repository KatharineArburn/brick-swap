import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getAllTags, deleteTag } from "../../store/tags"
import { useModal } from "../../context/Modal";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem"
import DeleteTagForm from "./TagForms/DeleteTagModal"
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

    const userSet = lego.userId === sessionUser.id
// console.log(userSet)

    const removeableTags = Object.values(tags).map((tag) => (
    <div key={tag.id} className='tag'>{tag.tag}
            <button className="x-btn" id="x">
            <OpenModalMenuItem
                itemText="X"
                className="btn-text"
                modalComponent={<DeleteTagForm tagId={tag.id}/>} />
            </button>

    </div>
    ))

    const viewOnlyTags = Object.values(tags).map((tag) => (
        <div>
            <li key={tag.id}>
                <p className='tag'>{tag.tag}</p>
            </li>
        </div>
        ))

    return (
        <>
        {userSet &&
            <button className="tagbtn">
            <OpenModalMenuItem
            itemText="Add tags to this set"
            modalComponent={<CreateTagForm legoId={legoId} />}/>
                </button>
            }
        <div className="tag-list">
        {userSet ? removeableTags : viewOnlyTags}
        </div>
        </>
    )
}

export default Tags
