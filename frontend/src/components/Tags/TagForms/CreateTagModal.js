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
    const [tag0, setTag0] = useState("");
    const [tag1, setTag1] = useState("");
    const [tag2, setTag2] = useState("");
    const [tag3, setTag3] = useState("");
    const [tag4, setTag4] = useState("");

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
            "tag0": tag0,
            "tag1": tag1,
            "tag2": tag2,
            "tag3": tag3,
            "tag4": tag4,
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
            <h1>Add Set Tags</h1>
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
            <button type="submit" className="submit-btn">Add Tags</button>
            </div>
        </form>
        )
}

export default CreateTagForm
