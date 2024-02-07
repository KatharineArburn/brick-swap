import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { deleteLego } from "../../store/spots";
import { useModal } from "../../context/Modal";
import "./DeleteLego.css"

function DeleteLegoModal({legoId}) {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({})
    const { closeModal } = useModal();

    const handleDelete = (e) => {
        e.preventDefault();
        setErrors({})

        return dispatch(deleteLego(legoId))
        .then(closeModal)
        .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) {
                setErrors(data.errors);
            }
        });
    }

    return (
        <section className="delete-lego">
            <h1>Confirm Delete</h1>
                <span>Are you sure you want to remove this lego set from your profile?</span>
                <button onClick={handleDelete}>Yes (Delete Lego Set)</button>
                <button onClick={closeModal} className="no-btn">No (Keep Lego Set)</button>
        </section>
    )
}

export default DeleteLegoModal
