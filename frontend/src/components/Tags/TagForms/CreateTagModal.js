import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import { createTag } from "../../../store/tags";


function CreateTagForm({legoId}) {
    const dispatch = useDispatch()
    const history = useHistory()
    // const navigate = useNavigate()
    const { closeModal } = useModal();
    const [reload, setReload] = useState(false);
    // const [errors, setErrors] = useState({})
    const [errors, setErrors] = useState([{}])
    // const [tag0, setTag0] = useState("");
    // const [tag1, setTag1] = useState("");
    // const [tag2, setTag2] = useState("");
    // const [tag3, setTag3] = useState("");
    // const [tag4, setTag4] = useState("");

    // useEffect(() => {
    //     if (reload) {
    //         window.location.reload();
    //     }
    // }, [reload])

    const userId = useSelector((state) => {
        return state.session.user.id
    })

    const [formInfo, setFormInfo] = useState ({
        legoId: legoId,
        userId: userId,
        tag0: '',
        tag1: '',
        tag2: '',
        tag3: '',
        tag4: ''
    });
    console.log('TAG0', formInfo)


    const handleChange = (e) => {
        const { name,  value } = e.target;
        setFormInfo(tagState => ({
            ...tagState,
            [name]: value,
        }))

        if (errors[name]) {
            setErrors(tagState => ({
                ...tagState,
                [name]: null
            }));
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await dispatch(createTag(formInfo))
        if (res && res.id) {
            closeModal()
            // history.push(`/lego/${legoId}`);
        } else if (res && res.errors) {
            setErrors(res.errors)
        }
        // let newTags;

        // const tagFormInfo = {
        //     "legoId": Number(legoId),
        //     "userId": userId,
        //     "tag0": tag0,
        //     "tag1": tag1,
        //     "tag2": tag2,
        //     "tag3": tag3,
        //     "tag4": tag4,
        // }

        // try {
        //     newTags = dispatch(createTag(tagFormInfo))
        //     .then(() => closeModal())
        //     .then(setReload(!reload))
        //     // history.push(`/lego/${legoId}`)
        // } catch (res) {
        //     if (newTags && newTags.errors) {
        //         setErrors(newTags.errors)
        //     }
        // }
    }
        return (
            <form onSubmit={handleSubmit} className="tag-form">
            <h1>Add Set Tags</h1>
            <label>
                <input
                    type="text"
                    id="tag"
                    name="tag0"
                    placeholder="example: building"
                    // value={tag0 || ""}
                    value={formInfo.tag0}
                    // onChange={(e) => setTag0(e.target.value)}
                    onChange={handleChange}
                    />
            {errors.tag0 && <div className="errors">{errors.tag0}</div> }
            </label>
            <label>
                <input
                    type="text"
                    id="tag"
                    name="tag1"
                    placeholder="example: Star Wars"
                    // value={tag1 || ""}
                    value={formInfo.tag1}
                    // onChange={(e) => setTag1(e.target.value)}
                    onChange={handleChange}
                    />
            {errors.tag1 && <div className="errors">{errors.tag1}</div> }
            </label>
            <label>
                <input
                    type="text"
                    id="tag"
                    name="tag2"
                    placeholder="example: animals"
                    // value={tag2 || ""}
                    value={formInfo.tag2}
                    // onChange={(e) => setTag2(e.target.value)}
                    onChange={handleChange}
                    />
            {errors.tag2 && <div className="errors">{errors.tag2}</div> }
            </label>
            <label>
                <input
                    type="text"
                    id="tag"
                    name="tag3"
                    placeholder="example: vehicles"
                    // value={tag3 || ""}
                    value={formInfo.tag03}
                    // onChange={(e) => setTag3(e.target.value)}
                    onChange={handleChange}
                    />
            {errors.tag3 && <div className="errors">{errors.tag3}</div> }
            </label>
            <label>
                <input
                    type="text"
                    id="tag"
                    name="tag4"
                    placeholder="example: castle"
                    // value={tag4 || ""}
                    value={formInfo.tag4}
                    // onChange={(e) => setTag4(e.target.value)}
                    onChange={handleChange}
                    />
            {errors.tag4 && <div className="errors">{errors.tag4}</div> }
            </label>
            <div className="btn">
            <button type="submit" className="submit-btn">Add Tags</button>
            </div>
        </form>
        )
}

export default CreateTagForm
