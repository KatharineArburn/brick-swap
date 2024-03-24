import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { findUserLego } from "../../store/lego";
import { getUserProfile } from "../../store/profile";
import { useModal } from "../../context/Modal";
import Sets from "./tabs/sets";
import Wishlist from "./tabs/wishlist";
import Inbox from "./tabs/inbox";
import Header from '../../images/brick.png'
import Pic from '../../images/profilepic.png'
import "./Profile.css"


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

    const userProfile = useSelector((state) => {
        return state.profile.userInfo
    })

    useEffect(() => {
        dispatch(getUserProfile(userId));
    }, [dispatch, userId])

    useEffect(() =>{
        dispatch(findUserLego(userId))
        .then(() => setIsLoading(true));
    }, [dispatch, userId])

    const userSets = Object.values(lego)
    console.log(userSets)
    const deleteLego = (id) => {
        dispatch(deleteLego(id))
            .then(closeModal)
            .then(() => setIsDeleted(true))
    }

    if (!isLoading) return <h1>Building...</h1>

    // if (!userSets) return <>
    //     <h2>{userProfile.firstName} {userProfile.lastName}</h2>
    //     <h3>{userProfile.city} {userProfile.state}</h3>
    //     {/* <Link to={'/lego/new'}>
    //         <button>Add a New Lego Set</button>
    //     </Link> */}
    // </>

        const nonActiveTabCss = 'profile-page-tab-item';
        const activeTabCss = 'profile-page-tab-item-active';

    const {
        firstName,
        lastName,
        city,
        state
    } = userProfile

    return (
        <>
            <div className="header-img">
                <img className="header-img" src={Header} width="100%"/>
        <img className="profile-pic" src={Pic}/>
            </div>
        <div className="page-container">
        <div className="left-side">
        <div className="profile-user-information-container">
        <h2 className="profile-page-username">{firstName} {lastName}</h2>
        <h3>{city}, {state}</h3>
        </div>
        </div>
        <div className="right-side">
        <div className="profile-tabs-container">
            <ul className="profile-page-tabs-ul">
                <li className={tab === 'sets' ? activeTabCss : nonActiveTabCss} onClick={() => setTab('sets')}>My Sets ({userSets.length})</li>
                <li className={tab === 'wishlist' ? activeTabCss : nonActiveTabCss} onClick={() => setTab('wishlist')}>Wishlist</li>
                <li className={tab === 'inbox' ? activeTabCss : nonActiveTabCss} onClick={() => setTab('inbox')}>Inbox</li>

            </ul>
        </div>
        <div>
            {tab === 'sets' && <Sets deleteLego={deleteLego} isDeleted={isDeleted} />}
            {tab === 'wishlist' && <Wishlist />}
            {/* {userId === sessionUser.id ? tab === 'inbox' && <Inbox /> : null } */}
        </div>
        </div>
        </div>
        </>
    );
}

export default ProfilePage
