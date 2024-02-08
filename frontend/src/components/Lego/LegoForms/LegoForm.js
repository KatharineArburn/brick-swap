import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createLego, updateLego } from "../../../store/lego";
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
    const [status, setStatus] = useState(lego?.status);
    const [image, setImage] = useState(lego?.image);

    // const [selectedAge, setSelectedAge] = useState("Please selected an age");
    // const [selectedStatus, setSelectedStatus] = useState("Available")

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        lego = { ...lego, name, itemNumber, pieces, ages, theme, status, image}

        let newLego;

        if (formType === "Add Lego") {
            try {
                newLego = await dispatch(createLego(lego))
                history.push(`/lego/${newLego.id}`)
            } catch (res) {
                if (newLego && newLego.errors) {
                    setErrors(newLego.errors)
                }
            }
        } else if (formType === "Update Lego Set") {
            try {
                newLego = await dispatch(updateLego(lego))
                // console.log("NEWLEGO", newLego.id)
                history.push(`/lego/${newLego.id}`)
            } catch (res) {
                if (newLego && newLego.errors) {
                    setErrors(newLego.errors)
                }
            };
        }

    }

    const header = formType === "Add Lego" ? "Add Lego" : "Update Lego Set"

    return (
        <form onSubmit={handleSubmit} className="lego-form">
            <h1>{header}</h1>
            <h2 className="form-titles">What set is this?</h2>
            <label>
                Set Name
                <input
                    type="text"
                    id="name"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    />
            <div className="errors">{errors.name}</div>
            </label>
            <label>
                Set Item Number
                <input
                    type="text"
                    id="itemNumber"
                    placeholder="Item Number"
                    value={itemNumber}
                    onChange={(e) => setItemNumber(e.target.value)}
                    />
            <div className="errors">{errors.itemNumber}</div>
            </label>
            <label>
                How many pieces does this set have?
                <input
                    type="text"
                    id="pieces"
                    placeholder="Pieces"
                    value={pieces}
                    onChange={(e) => setPieces(e.target.value)}
                    />
            <div className="errors">{errors.pieces}</div>
            </label>
            <label>
                What is the recommended age for this set?
                <select
                    value={ages}
                    onChange={e => setAges(e.target.value)}>
                    <option value="1.5+">1.5+</option>
                    <option value="4+">4+</option>
                    <option value="6+">6+</option>
                    <option value="9+">9+</option>
                    <option value="13+">13+</option>
                    <option value="18+">18+</option>
                    </select>
            <div className="errors">{errors.ages}</div>
            </label>
            <label>
                Set Theme
                <input
                    type="text"
                    id="theme"
                    placeholder="Theme"
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    />
            <div className="errors">{errors.theme}</div>
            </label>
            <label>
                Status of this set
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}>
                    <option value="available">Available</option>
                    <option value="traded">Traded</option>
                    </select>
            <div className="errors">{errors.status}</div>
            </label>
            <img className="image" id="image" alt='set_image' src={image}/>
            <label htmlFor="image" className="url">
                <input
                    type="url"
                    id="image"
                    placeholder="Set Image"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    />
            </label>
            <div className="btn">
            <button type="submit" className="submit-btn">{formType}</button>
            </div>
        </form>
    )
}

export default LegoForm
