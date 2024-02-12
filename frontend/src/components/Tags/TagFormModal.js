import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import TagForm from "./TagForms/TagForm";
import "./TagFormModal.css"

function TagFormModal({legoId}) {
    const dispatch = useDispatch();
    const [reload, setReload] = useState(false);
    const { closeModal } = useModal();


    useEffect(() => {
        if (reload) {
            window.location.reload();
        }
    }, [reload])


    return ( <TagForm /> )

}

export default TagFormModal
