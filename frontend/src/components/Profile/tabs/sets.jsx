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
        // console.log(state.lego)
        return state.lego
    })

    const sessionUser = useSelector((state) => {
        return state.session.user
    })


    useEffect(() =>{
        dispatch(findUserLego(userId))
        .then(() => setIsLoaded(true));
    }, [dispatch, userId])

    const setGrid = Object.values(lego).map(lego => {
        return (
            <div className="lego-list" key={lego.id}>
                <div>
                    <img onClick={() => history.push(`/lego/${lego.id}`)} src={lego.image} alt="lego set" className="set-image"/>
                    <div className="title-grid">
                        <p className="name">{lego.name} <br/> {lego.pieces} pieces</p>
                            <div className="lego-buttons">
                                <div className="update-btn-grid">
                                <Link to={`/lego/${lego.id}/edit`}>
                                    <button
                                    hidden={lego.userId !== sessionUser.id}
                                    className="update-btn">Update</button>
                                </Link>
                                </div>
                                <div className="delete-btn-grid">
                                <button
                                hidden={lego.userId !== sessionUser.id}
                                className="delete-btn">
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
