import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { deleteLego } from "../../store/lego";
import { useModal } from "../../context/Modal";
import "./DeleteLego.css"

function DeleteLegoModal({legoId}) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [reload, setReload] = useState(false);
    const [errors, setErrors] = useState({})

    useEffect(() => {
        if (reload) {
            window.location.reload();
        }
    }, [reload])

    const handleDelete = (e) => {
        e.preventDefault();
        setErrors({})

        return dispatch(deleteLego(legoId))
        .then(closeModal)
        .then(setReload(!reload))
        .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) {
                setErrors(data.errors);
            }
        });
    }

    return (
        <section className="delete-lego">
            <h1 className="Dheader">Confirm Delete</h1>
                <span className="Dspan">Are you sure you want to remove this lego set from your profile?</span>
                <div className="buttons-div">
                <button onClick={handleDelete} className="yes-btn">Yes (Delete Lego Set)</button>
                <button onClick={closeModal} className="no-btn">No (Keep Lego Set)</button>
                </div>
        </section>
    )
}

export default DeleteLegoModal
