import React, { useState } from 'react';
import Heading2 from "../components/Heading2";
import Heading1 from "../components/Heading1";
import Button from "../components/Button";
import Info from '../components/Info';
import { Link, useNavigate } from 'react-router-dom';
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import auth from '../../firebase.init';

const inputClasses = "mt-3 p-3 rounded-lg bg-gray w-full";

const Login = () => {
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


    const updateFormValue = (e, inputName) => {
        const value = e.target.value;
        const newForm = { ...formValue };
        newForm[inputName] = value;
        setFormValue({ ...newForm });
    };

    const loginUser = (e) => {
        e.preventDefault();

        fetch(`http://localhost:5000/userinfo/${formValue["username"]}`).then(res => res.json()).then(data => {
            if (data.success) {
                signInWithEmailAndPassword(data.user.email, formValue.password);
                setInfo({ error: "", success: "congrats" })
                setFormValue({ "username": "", "password": "" })
                navigate("/home")
            }
            else {
                setInfo({ success: "", error: data.error })
            }
        })


        if (error) {
            setInfo({ success: "", error: error.message })
        }

    };

    if (loading) {
        return <p>loading...</p>
    }

    return (
        <div className='text-semiBlack flex flex-col min-h-screen' >

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
                    <Button additionalClasses="mt-4" type="submit" btnType={"primary"} >Login</Button>
                </div>
            </form>
        </div>
    );
};

export default Login;