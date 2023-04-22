import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import HomePage from "./homePage/HomePage";
import About from "./about/About";
import NavBar from "./navBar/NavBar";
import SingIn from "./form/singin/SingIn";
import Login from "./form/login/Login";
import {useState} from "react";


export default function App() {

    const [usernameErr, setUsernameErr] = useState(false);
    const [passwordErr, setPasswordErr] = useState(false);
    const [emailErr, setEmailErr] = useState(false);
    const [loginErr, setLoginErr] = useState(false);


    return (
        <BrowserRouter>
            <NavBar/>
            <Routes>
                <Route path={'/'} element={<HomePage/>}/>
                <Route path={'/About'} element={<About/>}/>
                <Route path={'/singin'} element={<SingIn
                    username={usernameErr}
                    setUsername={setUsernameErr}
                    password={passwordErr}
                    setPassword={setPasswordErr}
                    email={emailErr}
                    setEmail={setEmailErr}
                />}/>
                <Route path={'/login'} element={<Login
                    login={loginErr}
                    setLogin={setLoginErr}
                />}/>
            </Routes>
        </BrowserRouter>
    );
}
