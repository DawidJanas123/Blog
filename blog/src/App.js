import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import HomePage from "./homePage/HomePage";
import About from "./about/About";
import NavBar from "./navBar/NavBar";
import SignIn from "./form/singin/SignIn";
import Login from "./form/login/Login";
import {useState} from "react";
import {useImmer} from "use-immer";


export default function App() {

    const [usernameErr, setUsernameErr] = useState(false);
    const [passwordErr, setPasswordErr] = useState(false);
    const [emailErr, setEmailErr] = useState(false);
    const [loginErr, setLoginErr] = useState(false);
    const [checkRegister, setCheckRegister] = useImmer(
        {
            checkRegister: false,
            sendMail: false
        }
    );
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    return (
        <BrowserRouter>
            <NavBar
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
            />
            <Routes>
                <Route path={'/'} element={<HomePage/>}/>
                <Route path={'/About'} element={<About/>}/>
                <Route path={'/signin'} element={<SignIn
                    username={usernameErr}
                    setUsername={setUsernameErr}
                    password={passwordErr}
                    setPassword={setPasswordErr}
                    email={emailErr}
                    setEmail={setEmailErr}
                    checkRegister={checkRegister}
                    setCheckRegister={setCheckRegister}
                />}/>
                <Route path={'/login'} element={<Login
                    login={loginErr}
                    setLogin={setLoginErr}
                    isLoggedIn={isLoggedIn}
                    setIsLoggedIn={setIsLoggedIn}
                />}/>
            </Routes>
        </BrowserRouter>
    );
}
