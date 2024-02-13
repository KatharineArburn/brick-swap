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
    const noTags = !loggedIn || !Object.values(tags).find((tag) => tag.userId === sessionUser.id)
    const notUserSet = !loggedIn || !Object.values(lego).find((lego) => lego.userId === sessionUser.id)

    return (
        <>
        { loggedIn && noTags && !notUserSet &&
        (<OpenModalMenuItem
            itemText="Add tags to this set"
            modalComponent={<TagFormModal legoId={legoId} />}/>)}
        <div className="tag-list">
            {Object.values(tags).map((tag) => (
                <div key={tag.id}>
                    <p>{tag.tag0} {tag.tag1} {tag.tag2} {tag.tag3} {tag.tag4}</p>
                </div>
            ))}
            </div>
            { loggedIn && !noTags && notUserSet &&
        (<OpenModalMenuItem
            itemText="Update tags"
            modalComponent={<TagFormModal legoId={legoId} />}/>)}
        </>
    )
}

export default Tags
