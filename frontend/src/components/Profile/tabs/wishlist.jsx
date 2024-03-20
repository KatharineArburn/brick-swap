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
        console.log('STATE', state)
        return state.wishlist
    })

    const sessionUser = useSelector((state) => {
        return state.session.user
    })


    useEffect(() =>{
        dispatch(getUserWishlist(userId))
        .then(() => setIsLoaded(true));
    }, [dispatch, userId])

    if (!wishlist) return <>
        <h1>Explore Sets in your area</h1>
        <Link to={`/lego`}>
            <button>Check out these bricks!</button>
        </Link>
    </>

    const userSets = Object.values(wishlist).filter((wishlist) => (wishlist.userId === sessionUser.id))
    // console.log("USERSETS",userSets)

    const setGrid = Object.values(userSets).map(lego => {
        console.log('LEGO', lego)
        return (
            <div className="lego-list" key={lego.id}>
                <div>
                    <img onClick={() => history.push(`/lego/${lego.id}`)} src={lego['Lego.image']} alt="lego set" className="set-image"/>
                    <div className="title-grid">
                        <p className="name">{lego['Lego.name']} <br/> {lego['Lego.pieces']} pieces</p>
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
