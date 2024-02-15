import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, useParams } from "react-router-dom";
import { findUserLego, deleteLego } from "../../store/lego";
import { useModal } from "../../context/Modal";
import Sets from "./tabs/sets";


const ProfilePage = () => {
    const dispatch = useDispatch()
    const { userId } = useParams();
    const { closeModal } = useModal();
    const [isDeleted, setIsDeleted] = useState(false);
    const [tab, setTab] = useState('sets')
    const [isLoading, setIsLoading] = useState(false)

    const sessionUser = useSelector((state) => {
        return state.session.user
    })

    const lego = useSelector((state) => {
        return state.lego
    })


    useEffect(() =>{
        dispatch(findUserLego(userId))
        .then(() => setIsLoading(true));
    }, [dispatch, userId])

    if (!sessionUser) {
        return <Redirect to='/' />
    }
    const userSets = Object.values(lego).filter((lego) => (lego.userId === sessionUser.id))

    const deleteLego = (id) => {
        dispatch(deleteLego(id))
            .then(closeModal)
            .then(() => setIsDeleted(true))
    }

    if (!isLoading) return <h1>Locating your sets...</h1>

    if (!userSets) return <>
        <h2>{sessionUser.user.firstName} {sessionUser.user.lastName}</h2>
        <h3>{sessionUser.user.city} {sessionUser.user.state}</h3>
        <Link to={'/lego/new'}>
            <button>Add a New Lego Set</button>
        </Link>
    </>

        const nonActiveTabCss = 'profile-page-tab-item';
        const activeTabCss = 'profile-page-tab-item-active';

    return (
        <>
        <div className="profile-user-information-container">
            <img id='profile-img' src="" />
        <h2>{sessionUser.firstName} {sessionUser.lastName}</h2>
        {/* <h3>{sessionUser.user.city} {sessionUser.user.state}</h3> */}
        <h3>City, State</h3>
        </div>

        <div className="profile-tabs-container">
            <li className={tab === 'sets' ? activeTabCss : nonActiveTabCss} onClick={() => setTab('sets')}>My Sets ({userSets.length})</li>
            <li className={tab === 'wishlist' ? activeTabCss : nonActiveTabCss} onClick={() => setTab('wishlist')}>Wishlist</li>
        </div>
        <div>
            {tab === 'sets' && <Sets deleteLego={deleteLego} isDeleted={isDeleted} />}
            {/* {tab === 'wishlist' && <Wishlist />} */}
        </div>
        </>
    );
}

export default ProfilePage
