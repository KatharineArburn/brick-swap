import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getAllTags } from "../../store/tags"
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem"
import UpdateTagForm from "./TagForms/UpdateTagModal"
import CreateTagForm from "./TagForms/CreateTagModal"
import "./Tags.css"

const Tags = () => {
    const dispatch = useDispatch();
    const { legoId } = useParams();

    const sessionUser = useSelector((state) => {
        return state.session.user
    })

    const tags = Object.values(useSelector((state) => {
        // console.log("STATE", state.lego.User.Tags)
        return state.lego.User.Tags
    }))

    const lego = useSelector((state) => {
        // console.log("STATE", state.lego)
        return state.lego
    })

    // const tagCheck = useSelector((state) => {
    //     return state.tag[legoId]
    // })

    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        dispatch(getAllTags(legoId))
        .then(() => setIsLoading(true))
    }, [dispatch, legoId])

    if (!isLoading) return <h1>Loading...</h1>

    const loggedIn = sessionUser ? true : null
    const noTags = tags.length ? true: false
    const userSet = !Object.values(lego).find((lego) => lego.userId === sessionUser.id)



    return (
        <>
            <button hidden={(loggedIn && noTags && userSet)}>
            <OpenModalMenuItem
            itemText="Add tags to this set"
            modalComponent={<CreateTagForm legoId={legoId} />}/>
                </button>
        <div className="tag-list">
            {tags.map((tag) => (
                <div key={'Tag' + tag.id}>
                    <p>{tag.tag0} {tag.tag1} {tag.tag2} {tag.tag3} {tag.tag4}</p>
                { loggedIn && !noTags && userSet && (
                <OpenModalMenuItem
                itemText="Update tags"
                modalComponent={
                <UpdateTagForm
                legoId={legoId}
                tagA={tag.tag0}
                tagB={tag.tag1}
                tagC={tag.tag2}
                tagD={tag.tag3}
                tagE={tag.tag4}
                tagId={tag.id}
                            />}
                        />
                    )}
                </div>
            ))}
        </div>
        </>
    )
}

export default Tags
