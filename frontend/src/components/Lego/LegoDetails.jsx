import { useParams } from "react-router-dom";
import { useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"
import { getLegoDetails } from "../../store/lego";
import { addToWishlist, deleteFromWishlist } from "../../store/wishlist";
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
        return state.lego
    })

    const [isLoading, setIsLoading] = useState(false)
    const [onWishlist, setOnWishlist] = useState(null)

    useEffect(() => {
        dispatch(getLegoDetails(legoId))
        .then(() => setIsLoading(true));
    }, [dispatch, legoId, setIsLoading, onWishlist])

    useEffect(() => {
        setOnWishlist(lego?.onWishlist);
    }, [lego?.onWishlist])

    if (!isLoading) return <h1>Building...</h1>

    if (!lego ) return <h1>Set not found</h1>

    const loggedIn = sessionUser ? true : null
    const userSet = !loggedIn || !Object.values(lego).find((lego) => lego.userId === sessionUser.id)

    const handleWishlist = async () => {
        if (!onWishlist) {
            dispatch(addToWishlist(legoId)).then(() => setOnWishlist(true));
        }
        else {
            dispatch(deleteFromWishlist(legoId)).then(() => setOnWishlist(false));
        }
    }

    const {
        name,
        itemNumber,
        pieces,
        ages,
        theme,
        status,
        image,
    } = lego

    const {
        firstName,
        lastName,
        city,
        state
    } = lego.User

    const setStatus = status === "yes" ? "Available for Trade" : "Not available for Trade"

    const statusCircle = status === "yes" ? <FaCircle className="green-circle" /> : <FaCircle className="red-circle"/>


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
            <Link to={`/profile/${lego.userId}`}>
            <p className="user-name">{firstName} {lastName}</p>
            <p className="user-location">{city}, {state}</p>
            </Link>
            <p className="btn">
            <button
            hidden={(!userSet) || (!loggedIn)}
            onClick={handleWishlist} className="wishlist-btn">Add to Wishlist</button>
            </p>
            </div>
            </div>
            <Tags />
        </section>
    )
}

export default LegoDetails
