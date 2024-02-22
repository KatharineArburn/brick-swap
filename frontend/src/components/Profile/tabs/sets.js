import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { findUserLego } from "../../../store/lego"
import OpenModalMenuItem from "../../Navigation/OpenModalMenuItem"
import DeleteLegoModal from "../../Lego/DeleteLegoModal";
import { useHistory } from "react-router-dom";
import "../../Lego/LegoList.css"

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
            <div className="lego-list" key={lego.id}>
                <div onClick={() => history.push(`/lego/${lego.id}`)}>
                    <img src={lego.image} alt="lego set" className="set-image"/>
                    <div className="title-grid">
                        <p className="name">{lego.name} <br/> {lego.pieces} pieces</p>
                            <div className="lego-buttons">
                                <div className="update-btn-grid">
                                <Link to={`/lego/${lego.id}/edit`}>
                                    <button className="update-btn">Update</button>
                                </Link>
                                </div>
                                <div className="delete-btn-grid">
                                <button className="delete-btn">
                                <OpenModalMenuItem
                                itemText="Delete"
                                modalComponent={<DeleteLegoModal legoId={lego.id}/>}/>
                                </button>
                                </div>
                            </div>
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

export default Sets;
