import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllTags } from "../../../store/tags";
import { useEffect } from "react";
import TagForm from "./TagForm";

const UpdateTagForm = () => {
    const { tagId } = useParams();
    const dispatch = useDispatch();
    const tags = useSelector((state) => {
        console.log("TAGS STATE", state.tag)
        return state.tag
    })

    const legoId = tags.legoId

    useEffect(() => {
        dispatch(getAllTags(legoId));
    }, [dispatch, legoId])

    if (!tags) return <></>

    return (
        Object.keys(tags).length > 1 && (
            <>
                <TagForm tag={tags} formType="Update Tags"/>
            </>
            )
        );
}

export default UpdateTagForm
