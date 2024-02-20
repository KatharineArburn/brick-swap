import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import { BsBricks } from "react-icons/bs";
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    return (
    <>
        <div className='navbar'>
            <a>
        <Link to={'/'} className="nav-left">
                <BsBricks />
        </Link>
            </a>
        <div className='nav-center'>Neighborhood Brick Swap</div>
        <div className='nav-right'>
        <Link to={'/lego/new'} hidden={sessionUser == null} className="link">+ Add your sets</Link>
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
