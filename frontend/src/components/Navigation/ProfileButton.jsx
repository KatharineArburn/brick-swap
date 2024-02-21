import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom'
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { GiHamburgerMenu } from "react-icons/gi";
import './Navigation.css';


function ProfileButton({ user }) {
const dispatch = useDispatch();
const history = useHistory();
const [showMenu, setShowMenu] = useState(false);
const ulRef = useRef();

const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
};

useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
    if (!ulRef.current?.contains(e.target)) {
        setShowMenu(false);
    }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
}, [showMenu]);

const closeMenu = () => setShowMenu(false);

const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    history.push('/')
};

const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

return (
    <>
    <button onClick={openMenu} className="ham-btn">
        <GiHamburgerMenu className='ham-icon'/>
        </button>
    {showMenu &&
    <ul className={ulClassName} ref={ulRef}>
        {user ? (
        <>
            {/* <li>{user.username}</li> */}
            <li>Hello {user.firstName}</li>
            <li>{user.email}</li>
            <li >
                <Link to={`/profile/${user.id}`} className="manage-profile">Profile Page</Link>
            </li>
            <li >
            <button className="logout" onClick={logout}>Log Out</button>
            </li>
        </>
        ) : (
        <>
            <OpenModalMenuItem
            itemText="Log In"
            onItemClick={closeMenu}
            modalComponent={<LoginFormModal />}
            />
            <OpenModalMenuItem
            itemText="Sign Up"
            onItemClick={closeMenu}
            modalComponent={<SignupFormModal />}
            />
        </>
        )}
    </ul>
        }
    </>
);
}

export default ProfileButton;
