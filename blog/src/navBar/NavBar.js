import {NavLink} from "react-router-dom";
import './main.css';

export default function NavBar() {
    return (
        <>
            <ul className='navbar bg-light'>
                <li><NavLink className='text-decoration-none text-black' to='/'>Home</NavLink></li>
                <li><NavLink className='text-decoration-none text-black' to='/about'>About</NavLink></li>
                <li><NavLink className='text-decoration-none text-black' to='/share'>Share</NavLink></li>
                <li><NavLink className='text-decoration-none text-black' to='/search'>Search</NavLink></li>
            </ul>
        </>
    )
}