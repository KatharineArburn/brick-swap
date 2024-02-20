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


    const handleSubmit = async (e) => {
        e.preventDefault();
        // setErrors({});
        lego = { ...lego, name, itemNumber, pieces, ages, theme, status, image}
        let newLego;

        if (formType === "Add Lego") {
            try {
                newLego = await dispatch((createLego(lego)))
                // .then((newLego) => history.push(`/lego/${newLego.lego.id}`))
            } catch (res) {
                if (newLego && newLego.errors) {
                    setErrors(newLego.errors)
                }
            }
        } else if (formType === "Update Lego Set") {
            try {
                newLego = await dispatch(updateLego(lego))
                // .then((newLego) => history.push(`/lego/${newLego.lego.id}`))
                console.log("LEGO", newLego)
            } catch (res) {
                if (newLego && newLego.errors) {
                    setErrors(newLego.errors)
                }
            };
        }
        history.push(`/lego/${newLego.id}`)
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
            <fieldset>
                <legend>Is this set available for Trade?
                    <div>
                        <input type="radio" id="yes"
                        name="status" value="yes"
                        onChange={(e) => setStatus(e.target.value)}
                        />
                        <label htmlFor="yes">Yes</label>
                        <input type="radio" id="no"
                        name="status" value="no"
                        onChange={(e) => setStatus(e.target.value)}
                        />
                        <label htmlFor="no">No</label>
                    </div>
                </legend>
            <div className="errors">{errors.status}</div>
            </fieldset>
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
