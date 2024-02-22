import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getAllTags } from "../../store/tags"
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem"
import UpdateTagForm from "./TagForms/UpdateTagModal"
import CreateTagForm from "./TagForms/CreateTagModal"
import "./Tags.css";

const Tags = () => {
    const dispatch = useDispatch();
    const { legoId } = useParams();

    const sessionUser = useSelector((state) => {
        return state.session.user
    })

    const tags = Object.values(useSelector((state) => {
        return state.lego.User.Tags
    }))

    console.log('TAGS', tags)

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
    const noTags = tags.length ? true: false
    const userSet = !loggedIn || !Object.values(lego).find((lego) => lego.userId === sessionUser.id)

        let tag0
        let tag1
        let tag2
        let tag3
        let tag4

    if (tags.length) {
        tag0 = tags[0].tag0 ? "tag": ""
        tag1 = tags[0].tag1 ? "tag": ""
        tag2 = tags[0].tag2 ? "tag": ""
        tag3 = tags[0].tag3 ? "tag": ""
        tag4 = tags[0].tag4 ? "tag": ""
    } else {
        tag0 = ""
        tag1 = ""
        tag2 = ""
        tag3 = ""
        tag4 = ""
    }

    return (
        <>
            <button hidden={(loggedIn && noTags && userSet) || (!loggedIn)} className="tagbtn">
            <OpenModalMenuItem
            itemText="Add tags to this set"
            modalComponent={<CreateTagForm legoId={legoId} />}/>
                </button>
        <div className="tag-list">
            {tags.map((tag) => (
                <div key={'Tag' + tag.id} className="tag-list">
                    <p className={tag0}>{tag.tag0}</p>
                    <p className={tag1}>{tag.tag1}</p>
                    <p className={tag2}>{tag.tag2}</p>
                    <p className={tag3}>{tag.tag3}</p>
                    <p className={tag4}>{tag.tag4}</p>
                <button hidden={(loggedIn && !noTags && userSet)} className="tagbtn">
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
                </button>
                </div>
            ))}
        </div>
        </>
    )
}

export default Tags
