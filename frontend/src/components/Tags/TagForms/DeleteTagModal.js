import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { deleteTag } from "../../../store/tags";


const DeleteTagForm = ({tagId}) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [reload, setReload] = useState(false);
    const [errors, setErrors] = useState({})

    useEffect(() => {
        if (reload) {
            window.location.reload();
        }
    }, [reload])


                // console.log('UPDATED TAG', updateTag)

    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(deleteTag(tagId))
            .then(() => closeModal())
            .then(setReload(!reload))
    }

    return (
        <section className="delete-form">
            <h1>Confirm Delete</h1>
                <span>Are you sure you want to delete this tag?</span>
                <button onClick={handleDelete}>Yes (Delete Tag)</button>
                <button onClick={closeModal} className="no-btn">No (Keep Tag)</button>
        </section>
    )
}

export default DeleteTagForm
