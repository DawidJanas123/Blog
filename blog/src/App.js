import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import HomePage from "./homePage/HomePage";
import About from "./about/About";
import NavBar from "./navBar/NavBar";


export default function App() {
    return (
        <BrowserRouter>
            <NavBar/>
            <Routes>
                <Route path={'/'} element={<HomePage/>}/>
                <Route path={'/About'} element={<About/>}/>
            </Routes>
        </BrowserRouter>
    );
}
