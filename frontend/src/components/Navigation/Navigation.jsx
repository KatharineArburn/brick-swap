import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import Logo from '../../images/NBS.png'
import { FaPlus } from "react-icons/fa6";

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    const [loggedIn, setLoggedIn] = useState(true);

useEffect(() => {
    if (sessionUser) return setLoggedIn(false)
}, [sessionUser])


    return (
    <>
        <div className='navbar'>
            <a>
        <Link to={'/'} rel="icon" href="./favicon.ico" className="nav-left">
        <img className="image" alt="image" src={Logo} width='70px' height='50px'/>
        </Link>
            </a>
        <div className='nav-center'>Neighborhood Brick Swap</div>
        <div className='nav-right'>
        <Link to={'/lego/new'} hidden={sessionUser == null} className="link"> <FaPlus className='icon'/>  Add your sets</Link>
        {isLoaded && (
        <a>
            <ProfileButton user={sessionUser} />
        </a>
        )}
        </div>
        </div>
    </>
    );
}

export default Navigation;
