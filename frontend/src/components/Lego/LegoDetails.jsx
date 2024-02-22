import { useParams } from "react-router-dom";
import { useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLegoDetails } from "../../store/lego";
import { FaCircle } from "react-icons/fa";
import Tags from "../Tags/Tags"
import "./LegoDetails.css"

const LegoDetails = () => {
    const dispatch = useDispatch();
    const { legoId } = useParams();

    const sessionUser = useSelector((state) => {
        return state.session.user
    })

    const lego = useSelector((state) => {
        // console.log("STATE", state.lego)
        return state.lego
    })

    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        dispatch(getLegoDetails(legoId))
        .then(() => setIsLoading(true));
    }, [dispatch, legoId])

    if (!isLoading) return <h1>Loading...</h1>

    const loggedIn = sessionUser ? true : null
    const userSet = !loggedIn || !Object.values(lego).find((lego) => lego.userId === sessionUser.id)


    const {
        name,
        itemNumber,
        pieces,
        ages,
        theme,
        status,
        image,
    } = lego

    const setStatus = status === "yes" ? "Available for Trade" : "Not available for Trade"

    const statusCircle = status === "yes" ? <FaCircle className="green-circle" /> : <FaCircle className="red-circle"/>

    const {
        firstName,
        lastName
    } = lego.User

    return (
        <section className="page">
            <div className="details-container">
            <div className="grid-left">
                <img className="set-image" alt="image" src={image}/>
            </div>
            <div className="grid-center">
                <p className="name bigger">{name}</p>
                <p className="set-number">Set Number: {itemNumber}</p>
                <p className="pieces">Pieces: {pieces}</p>
                <p className="age">Suggested Age: {ages}</p>
                <p className="theme">Set Theme: {theme}</p>
                <p className="status big">{statusCircle} {setStatus}</p>
            </div>
            <div className="grid-right">
            <p className="user-name">{firstName} {lastName}</p>
            <p className="user-location">City, State</p>
            <p className="btn">
            <button
            hidden={(!userSet) || (!loggedIn)}
            onClick={()=>{alert('Feature coming soon...'); }} className="wishlist-btn">Add to Wishlist</button>
            </p>
            </div>
            </div>
            <Tags />
        </section>
    )
}

export default LegoDetails
