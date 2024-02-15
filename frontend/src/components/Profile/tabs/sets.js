import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { findUserLego } from "../../../store/lego"
import OpenModalMenuItem from "../../Navigation/OpenModalMenuItem"
import DeleteLegoModal from "../../Lego/DeleteLegoModal";
import { useHistory } from "react-router-dom";

const Sets = () => {
    const dispatch = useDispatch();
    const { userId } = useParams();
    const history = useHistory();
    const [isLoaded, setIsLoaded] = useState(false);

    const lego = useSelector((state) => {
        return state.lego
    })

    const sessionUser = useSelector((state) => {
        return state.session.user
    })


    useEffect(() =>{
        dispatch(findUserLego(userId))
        .then(() => setIsLoaded(true));
    }, [dispatch, userId])

    const userSets = Object.values(lego).filter((lego) => (lego.userId === sessionUser.id))
    // console.log(userSets)

    const setGrid = Object.values(userSets).map(lego => {
        return (
            <div className="profile-page-lego-container" key={lego.id}>
                <div onClick={() => history.push(`/lego/${lego.id}`)}>
                    <img src={lego.image} alt="lego set" className="lego-set-image"/>
                <div>
                    <p>{lego.name}</p>
                    <p>{lego.pieces}</p>
                </div>
                </div>

                <div className="lego-buttons">
                    <Link to={`/lego/${lego.id}/edit`}>
                        <button className="update-btn">Update</button>
                    </Link>
                <button className="delete-btn">
                <OpenModalMenuItem
                itemText="Delete"
                modalComponent={<DeleteLegoModal legoId={lego.id}/>}/>
                </button>
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

export default Sets;
