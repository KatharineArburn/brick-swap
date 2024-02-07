import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createLego, updateLego } from "../../store/lego";
import "./LegoForm.css"

const LegoForm = ({ lego, formType}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [errors, setErrors] = useState({})
    const [name, setName] = useState(lego?.name);
    const [itemNumber, setItemNumber] = useState(lego?.itemNumber);
    const [pieces, setPieces] = useState(lego?.pieces);
    const [ages, setAges] = useState(lego?.ages);
    const [theme, setTheme] = useState(lego?.theme);
    const [status, setStatus] = useState(lego?.status)


}
