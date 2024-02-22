import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createLego, updateLego } from "../../../store/lego";
import "./LegoForm.css"

const LegoForm = ({ lego, formType}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [errors, setErrors] = useState([])
    const [name, setName] = useState(lego?.name);
    const [itemNumber, setItemNumber] = useState(lego?.itemNumber);
    const [pieces, setPieces] = useState(lego?.pieces);
    const [ages, setAges] = useState(lego?.ages);
    const [theme, setTheme] = useState(lego?.theme);
    const [status, setStatus] = useState(lego?.status);
    const [image, setImage] = useState(lego?.image);

    const sessionUser = useSelector((state) => {
        return state.session.user
    })

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

    const formImage = image ? image : "https://img.freepik.com/free-vector/children-brick-toys-alphabet-symbols_1284-42326.jpg"

    return (
        <form onSubmit={handleSubmit} className="lego-form">
            <ul>
                {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
            ))}
        </ul>
            <h1 className="formHeader">{header}</h1>
            <div className="container">
            <div className="grid1">
            <img className="form-img" id="form-img" alt='set_image' src={formImage}/>
            <label htmlFor="image" className="image-url">
                <input
                    type="url"
                    id="image-url"
                    placeholder="Add an image of your set"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    />
            </label>
            <fieldset className="status" id="status">
                <legend className="legend">Is this set available for Trade?
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
            </div>
            <div className="grid2">
            <label className="name">
                Set Name
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    />
            <div className="errors">{errors.name}</div>
            </label>
            <label className="itemNumber">
                Set Item Number
                <input
                    type="text"
                    id="itemNumber"
                    value={itemNumber}
                    onChange={(e) => setItemNumber(e.target.value)}
                    />
            <div className="errors">{errors.itemNumber}</div>
            </label>
            <label className="pieces">
                How many pieces does this set have?
                <input
                    type="text"
                    id="pieces"
                    value={pieces}
                    onChange={(e) => setPieces(e.target.value)}
                    />
            <div className="errors">{errors.pieces}</div>
            </label>
            <label className="age">
                What is the recommended age for this set?
                <select
                    value={ages}
                    id="age"
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
            <label className="theme">
                Set Theme
                <input
                    type="text"
                    id="theme"
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    />
            <div className="errors">{errors.theme}</div>
            </label>
            <div className="btn">
            <button className="cancel-btn"
            onClick={()=>{history.push(`/profile/${sessionUser.id}`)}}
            >Cancel</button>
            <button type="submit" className="submit-btn">{formType}</button>
            </div>
            </div>
            </div>
        </form>
    )
}

export default LegoForm
