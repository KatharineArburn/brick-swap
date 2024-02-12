import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getAllTags } from "../../store/tags"
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem"
import TagFormModal from "./TagFormModal"
import "./Tags.css"

const Tags = () => {
    const dispatch = useDispatch();
    const { legoId } = useParams();

    const sessionUser = useSelector((state) => {
        return state.session.user
    })

    const tags = useSelector((state) => {
        return state.tag[legoId]
    })

    const lego = useSelector((state) => {
        return state.lego
    })

    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        dispatch(getAllTags(legoId))
        .then(() => setIsLoading(true))
        // setReviews(fetchedReviews.reverse())
    }, [dispatch, legoId])

    if (!isLoading) return <h1>Loading...</h1>

    const loggedIn = sessionUser ? true : null

    return (
        <>
        { loggedIn &&
        (<OpenModalMenuItem
            itemText="Add tags to this set"
            modalComponent={<TagFormModal legoId={legoId} />}/>)}
            <div className="tag-list">
            {Object.values(tags).map((tag) => (
                <div key={tag.id}>
                    <p>{tag.tag}</p>
                </div>
            ))}
            </div>
        </>
    )
}

export default Tags
