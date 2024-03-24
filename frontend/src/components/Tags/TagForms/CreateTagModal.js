import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import { createTag } from "../../../store/tags";


function CreateTagForm({legoId}) {
    const dispatch = useDispatch()
    const history = useHistory()
    const { closeModal } = useModal();
    const [reload, setReload] = useState(false);
    const [errors, setErrors] = useState({})
    const [tag, setTag] = useState("");

    useEffect(() => {
        if (reload) {
            window.location.reload();
        }
    }, [reload])

    const userId = useSelector((state) => {
        return state.session.user.id
    })

    const handleSubmit = (e) => {
        e.preventDefault();

        let newTags;

        const tagFormInfo = {
            "legoId": Number(legoId),
            "userId": userId,
            "tag": tag
        }

        try {
            newTags = dispatch(createTag(tagFormInfo))
            .then(() => closeModal())
            .then(setReload(!reload))
            // history.push(`/lego/${legoId}`)
        } catch (res) {
            if (newTags && newTags.errors) {
                setErrors(newTags.errors)
            }
        }
    }
        return (
            <form onSubmit={handleSubmit} className="tag-form">
            {/* <h1>Add Tags</h1> */}
            <label>
                <input
                    type="text"
                    id="tag"
                    placeholder="example: building"
                    value={tag || ""}
                    onChange={(e) => setTag(e.target.value)}
                    />
            <div className="errors">{errors.tag}</div>
            </label>
            <div className="btn">
            <button type="submit"
            disabled={tag.length < 2 || tag.length > 20}
            className={tag.length >= 2 && tag.length < 20 ? "submit-btn" : "disabledButton"}>
                Add Tags</button>
            </div>
        </form>
        )
}

export default CreateTagForm
