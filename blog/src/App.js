import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import HomePage from "./homePage/HomePage";
import About from "./about/About";
import NavBar from "./navBar/NavBar";
import SingIn from "./form/singin/SingIn";
import {useState} from "react";


export default function App() {

    const [isTrue, setIsTrue] = useState(true);

    return (
        <BrowserRouter>
            {isTrue && <NavBar/>}
            <Routes>
                <Route path={'/'} element={<HomePage/>}/>
                <Route path={'/About'} element={<About/>}/>
                <Route path={'/singin'} element={<SingIn setIsTrue={setIsTrue}/>}/>
            </Routes>
        </BrowserRouter>
    );
}
