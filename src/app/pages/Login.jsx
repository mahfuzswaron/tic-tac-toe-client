import React, { useEffect, useState } from 'react';
import Heading2 from "../components/Heading2";
import Heading1 from "../components/Heading1";
import Button from "../components/Button";
import Info from '../components/Info';
import { Link, useNavigate } from 'react-router-dom';
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import auth from '../../firebase.init';
import Loader from '../components/Loader/Loader';

const inputClasses = "mt-3 p-3 w-full rounded-lg bg-gray dark:border border-gray dark:bg-semiBlack";

const Login = ({ sound, clickSound, setLoggedIn }) => {
    const [formValue, setFormValue] = useState({
        username: "",
        password: "",
    });
    const [info, setInfo] = useState({ success: "", error: "" });
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);
    const navigate = useNavigate();
    useEffect(() => {
        if (error) {
            setInfo({ success: "", error: error.message })
        }
        else if (user) {
            setInfo({ success: "Congrats!", error: "" })
        }
    }, [error, user])

    const updateFormValue = (e, inputName) => {
        let value = e.target.value;
        if (inputName !== "password") value = value.toLowerCase();
        const newForm = { ...formValue };
        newForm[inputName] = value;
        setFormValue({ ...newForm });
    };

    const loginUser = (e) => {
        e.preventDefault();
        fetch(`https://tic-tac-toe-server-tqsm.onrender.com/userinfo?username=${formValue["username"]}`).then(res => res.json()).then(data => {
            if (data.success) {
                signInWithEmailAndPassword(data.user.email, formValue.password);
                if (user) {
                    setInfo({ error: "", success: "congrats" })
                    setFormValue({ "username": "", "password": "" })
                }
            }
            else {
                setInfo({ success: "", error: data.error })
            }
        })

    };

    if (loading) {
        return <Loader message={"Logging in..."} />
    }

    if (user) {
        setLoggedIn(true);
        navigate("/")
    }

    return (
        <div className='text-darkGray dark:text-gray flex flex-col h-[90vh] animate__animated animate__fadeInUpBig' >

            {/* BACK ARROW  */}
            <Link to={"/entry"}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[24px] h-[24px] -ml-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
            </Link>

            {/* HEADING  */}
            <div className='my-9' >
                <Heading2>Login</Heading2>
                <Heading1 additionalClasses="mt-[9px] " >Please enter your details</Heading1>
            </div>

            <form onSubmit={loginUser} className='grid grid-cols-1 w-full h-full flex-grow'>

                <div>
                    {/* USERNAME  */}
                    <Heading2 additionalClasses={'mt-4'} > username</Heading2>
                    <input
                        required
                        type={"text"}
                        placeholder="Type your username here"
                        className={inputClasses}
                        value={formValue["username"]}
                        onChange={(e) => updateFormValue(e, "username")}
                    />

                    {/* PASSWORD */}
                    <Heading2 additionalClasses={'mt-4'} > Password</Heading2>
                    <input
                        required
                        type={"password"}
                        placeholder="Type your password here"
                        className={inputClasses}
                        value={formValue["password"]}
                        onChange={(e) => updateFormValue(e, "password")}
                    />

                </div>

                <div className='place-self-end w-full'>
                    {/* <Info type="success"> success </Info> */}
                    {
                        info.success ? <Info type="success">{info.success}</Info> : info.error && <Info type="error" >{info.error}</Info>
                    }

                    {/* SUBMIT BUTTON  */}
                    <Button onClick={() => sound && clickSound.play()} additionalClasses="mt-4" type="submit" btnType={"primary"} >Login</Button>
                </div>
            </form>
        </div>
    );
};

export default Login;