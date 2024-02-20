import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import { updateTag, deleteTag } from "../../../store/tags";


const UpdateTagForm = ({legoId, tagA, tagB, tagC, tagD, tagE, tagId}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();
    const [reload, setReload] = useState(false);
    const [errors, setErrors] = useState({})
    const [tag0, setTag0] = useState(tagA);
    const [tag1, setTag1] = useState(tagB);
    const [tag2, setTag2] = useState(tagC);
    const [tag3, setTag3] = useState(tagD);
    const [tag4, setTag4] = useState(tagE);

    useEffect(() => {
        if (reload) {
            window.location.reload();
        }
    }, [reload])

    const handleSubmit = (e) => {
        e.preventDefault();

        let updatedTags;

        const tagFormInfo = {
            "legoId": legoId,
            "tag0": tag0,
            "tag1": tag1,
            "tag2": tag2,
            "tag3": tag3,
            "tag4": tag4,
        }

        try {
            updatedTags = dispatch(updateTag(tagFormInfo, tagId))
            .then(() => closeModal())
            history.push(`/lego/${legoId}`)
        } catch (res) {
            if (updatedTags && updatedTags.errors) {
                setErrors(updatedTags.errors)
            }
        }

    }

    const handelDelete = (e) => {
        e.preventDefault();
        dispatch(deleteTag(tagId))
            .then(() => closeModal())
    }

    return (
        <form onSubmit={handleSubmit} className="tag-form">
        <button
            onClick={handelDelete}
            >Delete All Set Tags</button>
        <h1>Edit Set Tags</h1>
        <h2 className="form-title">Add up to five tags</h2>
        <label>
            <input
                type="text"
                id="tag"
                placeholder="example: building"
                value={tag0 || ""}
                onChange={(e) => setTag0(e.target.value)}
                />
        <div className="errors">{errors.tag0}</div>
        </label>
        <label>
            <input
                type="text"
                id="tag"
                placeholder="example: Star Wars"
                value={tag1 || ""}
                onChange={(e) => setTag1(e.target.value)}
                />
        <div className="errors">{errors.tag1}</div>
        </label>
        <label>
            <input
                type="text"
                id="tag"
                placeholder="example: animals"
                value={tag2 || ""}
                onChange={(e) => setTag2(e.target.value)}
                />
        <div className="errors">{errors.tag2}</div>
        </label>
        <label>
            <input
                type="text"
                id="tag"
                placeholder="example: vehicles"
                value={tag3 || ""}
                onChange={(e) => setTag3(e.target.value)}
                />
        <div className="errors">{errors.tag3}</div>
        </label>
        <label>
            <input
                type="text"
                id="tag"
                placeholder="example: castle"
                value={tag4 || ""}
                onChange={(e) => setTag4(e.target.value)}
                />
        <div className="errors">{errors.tag4}</div>
        </label>
        <div className="btn">
        <button type="submit" className="submit-btn">Update Tags</button>
        </div>
    </form>
    )
}

export default UpdateTagForm
