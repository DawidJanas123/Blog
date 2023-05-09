import {NavLink} from "react-router-dom";
import './main.css';
import {useEffect, useState} from "react";

export default function NavBar(props) {

    const [isLoggedIn, setIsLoggedIn] = useState(props.isLoggedIn);


    useEffect(() => {
        setIsLoggedIn(props.isLoggedIn);
    }, [props.isLoggedIn])


    const handleSignOut = () => {
        props.setIsLoggedIn(false);
    }

    return (<>
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
            <div className='container-fluid'>
                <NavLink className='navbar-brand' to='/'>BlogApp</NavLink>
                <button className='navbar-toggler' type='button' data-bs-toggle="collapse"
                        data-bs-target="#navbarContent"><span
                    className='navbar-toggler-icon'></span></button>
                <div className='collapse navbar-collapse' id='navbarContent'>
                    <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                        <li className='nav-item'>
                            <NavLink className='nav-link' to='/'>Home</NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink className='nav-link' to='/about'>About</NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink className='nav-link' to='/share'>Share</NavLink>
                        </li>
                        <li className='nav-item dropdown'>
                            <NavLink className='nav-link dropdown-toggle' role='button'
                                     data-bs-toggle='dropdown'
                                     aria-expanded='false'>{isLoggedIn ? 'Profile' : 'Login'}</NavLink>
                            {!isLoggedIn ? (<ul className='dropdown-menu'>
                                <li>
                                    <NavLink className='dropdown-item' to='/login'>login</NavLink>
                                </li>
                                <li>
                                    <NavLink className='dropdown-item' to='/signin'>sign in</NavLink>
                                </li>
                                <li>
                                    <hr className='dropdown-divider'/>
                                </li>
                                <p className='text-muted text-center'>BlogApp</p>
                            </ul>) : (<ul className='dropdown-menu'>
                                <li>
                                    <NavLink className={'dropdown-item'} to={'/published'}>published</NavLink>
                                </li>
                                <li>
                                    <NavLink className={'dropdown-item'} to={'/settings'}>settings</NavLink>
                                </li>
                                <li>
                                    <button className={'dropdown-item'} onClick={handleSignOut}>sign
                                        out
                                    </button>
                                </li>
                                <li>
                                    <hr className='dropdown-divider'/>
                                </li>
                                <p className='text-muted text-center'>BlogApp</p>
                            </ul>)}
                        </li>
                    </ul>
                    <form className='d-flex' role='search'>
                        <input className='form-control me-2' type='search' placeholder='Search...'
                               aria-label="Search"/>
                        <input className='btn my-2 my-sm-0 text-white' type='submit' value="Search"/>
                    </form>
                </div>
            </div>
        </nav>
    </>)
}