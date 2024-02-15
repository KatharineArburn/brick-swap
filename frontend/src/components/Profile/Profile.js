import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { findUserLego } from "../../store/lego";
import Sets from "./tabs/sets";


const Profile = () => {
    const dispatch = useDispatch()
    const { closeModal } = useModal();
    const [isDeleted, setIsDeleted] = useState(false);
    const [tab, setTab] = useState('sets')
    const sessionUser = useSelector((state) => {
        return state.session.user
    })

    if (!sessionUser) {
        return <Redirect to='/' />
    }

    const lego = useSelector((state) => {
        return state.lego
    })

    const [isLoading, setIsLoading] = useState(false)

    useEffect(() =>{
        dispatch(findUserLego())
        .then(() => setIsLoading(true));
    }, [dispatch])

    const userSets = Object.values(lego).filter((lego) => (lego.userId === sessionUser.user.id))

    if (!isLoading) return <h1>Locating your sets...</h1>

    if (!userSets) return <>
        <h2>{sessionUser.user.firstName} {sessionUser.user.lastName}</h2>
        <h3>{sessionUser.user.city} {sessionUser.user.state}</h3>
        <Link to={'/lego/new'}>
            <button>Add a New Lego Set</button>
        </Link>
    </>

    con

    return (
        <>
        <div>
            <img id='profile-img' src="" />
        <h2>{sessionUser.user.firstName} {sessionUser.user.lastName}</h2>
        <h3>{sessionUser.user.city} {sessionUser.user.state}</h3>
        </div>
        </>
    )
}
