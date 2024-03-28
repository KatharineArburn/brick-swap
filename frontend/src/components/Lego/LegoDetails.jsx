import { useParams } from "react-router-dom";
import { useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"
import { getLegoDetails } from "../../store/lego";
import { addToWishlist, deleteFromWishlist, getUserWishlist } from "../../store/wishlist";
import { FaCircle } from "react-icons/fa";
import Tags from "../Tags/Tags"
import "./LegoDetails.css"

const LegoDetails = () => {
    const dispatch = useDispatch();
    const { legoId } = useParams();
    const [isLoading, setIsLoading] = useState(false)
    const [legoOnWishlist, setLegoOnWishlist] = useState(null)


    const sessionUser = useSelector((state) => {
        return state.session.user
    })

    const lego = useSelector((state) => {
        return state.lego
    })

    const wishlist = useSelector((state) => {
        console.log('STATE', state.wishlist)
        return state.wishlist
    })

    useEffect(() =>{
        dispatch(getUserWishlist(sessionUser.id))
    }, [dispatch, sessionUser.id])


    useEffect(() => {
        dispatch(getLegoDetails(legoId))
        .then(() => setIsLoading(true));
    }, [dispatch, legoId, setIsLoading])

    if (!isLoading) return <h1>Building...</h1>

    if (!lego ) return <h1>Set not found</h1>

    const loggedIn = sessionUser ? true : null
    const userSet = !loggedIn || !Object.values(lego).find((lego) => lego.userId === sessionUser.id)
    const onWishlist = Object.values(wishlist).filter((wishlist) => (wishlist.legoId === lego.id))


    const [ setDetails ] = onWishlist

    // console.log("on wishlist", onWishlist)

    let wishlistBtn

    if (legoOnWishlist) {
        wishlistBtn = "Remove from Wishlist"
    } else if (onWishlist.length) {
        wishlistBtn = "Remove from Wishlist"
    } else {
        wishlistBtn = "Add to Wishlist"
    }

    const handleWishlist = async () => {
        if (!onWishlist.length) {
            dispatch(addToWishlist(legoId)).then(() => setLegoOnWishlist(true));
        }
        else {
            dispatch(deleteFromWishlist(setDetails.id)).then(() => setLegoOnWishlist(false));
        }
    }

    console.log(legoOnWishlist)
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
            onClick={handleWishlist} className="wishlist-btn">{wishlistBtn}</button>
            </p>
            </div>
            </div>
            <Tags />
        </section>
    )
}

export default LegoDetails
