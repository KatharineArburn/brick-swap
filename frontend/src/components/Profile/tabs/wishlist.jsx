import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { getUserWishlist, deleteFromWishlist } from "../../../store/wishlist"
import { useHistory } from "react-router-dom";
import "../../Lego/LegoList.css"

const Wishlist = () => {
    const dispatch = useDispatch();
    const { userId } = useParams();
    const history = useHistory();
    const [isLoaded, setIsLoaded] = useState(false);

    const wishlist = useSelector((state) => {
        console.log(state)
        return state.wishlist
    })

    const sessionUser = useSelector((state) => {
        return state.session.user
    })


    useEffect(() =>{
        dispatch(getUserWishlist(userId))
        .then(() => setIsLoaded(true));
    }, [dispatch, userId])

    const userSets = Object.values(wishlist).filter((wishlist) => (wishlist.userId === sessionUser.id))
    // console.log(userSets)

    const setGrid = Object.values(userSets).map(lego => {
        return (
            <div className="lego-list" key={lego.id}>
                <div>
                    <img onClick={() => history.push(`/lego/${lego.id}`)} src={lego.image} alt="lego set" className="set-image"/>
                    <div className="title-grid">
                        <p className="name">{lego.name} <br/> {lego.pieces} pieces</p>
                    </div>
                </div>
            </div>
        );
    })

    return (
        <div className="profile-container">
            {isLoaded && setGrid}
        </div>
    );

}

export default Wishlist;
