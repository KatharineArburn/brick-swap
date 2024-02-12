import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createTag, updateTag } from "../../../store/tags";

const TagForm = ({ tag, formType}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [errors, setErrors] = useState({})
    const [tag0, setTag0] = useState(tag?.tag0);
    const [tag1, setTag1] = useState(tag?.tag1);
    const [tag2, setTag2] = useState(tag?.tag2);
    const [tag3, setTag3] = useState(tag?.tag3);
    const [tag4, setTag4] = useState(tag?.tag4);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        tag = { ...tag, tag0, tag1, tag2, tag3, tag4}

        let newTag;

        if (formType === "Add Tags") {
            try {
                newTag = await dispatch(createTag(tag))
            } catch (res) {
                if (newTag && newTag.errors) {
                    setErrors(newTag.errors)
                }
            }
        } else if (formType === "Update Tags") {
            try {
                newTag = await dispatch(updateTag(tag))
            } catch (res) {
                if (newTag && newTag.errors) {
                    setErrors(newTag.errors)
                }
            };
        }
    }

    const header = formType === "Add Tags" ? "Add Tags" : "Update Tags"

    return (
        <form onSubmit={handleSubmit} className="tag-form">
            <h1>{header}</h1>
            <h2 className="form-title">Add up to five tags</h2>
            <label>
                <input
                    type="text"
                    id="tag"
                    placeholder="example: building"
                    value={tag0}
                    onChange={(e) => setTag0(e.target.value)}
                    />
            <div className="errors">{errors.tag0}</div>
            </label>
            <label>
                <input
                    type="text"
                    id="tag"
                    placeholder="example: Star Wars"
                    value={tag1}
                    onChange={(e) => setTag1(e.target.value)}
                    />
            <div className="errors">{errors.tag1}</div>
            </label>
            <label>
                <input
                    type="text"
                    id="tag"
                    placeholder="example: animals"
                    value={tag2}
                    onChange={(e) => setTag2(e.target.value)}
                    />
            <div className="errors">{errors.tag2}</div>
            </label>
            <label>
                <input
                    type="text"
                    id="tag"
                    placeholder="example: vehicles"
                    value={tag3}
                    onChange={(e) => setTag3(e.target.value)}
                    />
            <div className="errors">{errors.tag3}</div>
            </label>
            <label>
                <input
                    type="text"
                    id="tag"
                    placeholder="example: castle"
                    value={tag4}
                    onChange={(e) => setTag4(e.target.value)}
                    />
            <div className="errors">{errors.tag4}</div>
            </label>
            <div className="btn">
            <button type="submit" className="submit-btn">{formType}</button>
            </div>
        </form>
    )
}

export default TagForm
