import React, { useState } from 'react';
import Heading2 from "../components/Heading2";
import Heading1 from "../components/Heading1";
import Button from "../components/Button";
import Info from '../components/Info';
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../components/Loader/Loader';

const inputClasses = "mt-3 p-3 w-full rounded-lg bg-gray dark:border border-gray dark:bg-semiBlack";

const Register = ({ clickSound }) => {
    const [formValue, setFormValue] = useState({
        name: "",
        username: "",
        email: "",
        password: ""
    });
    const [info, setInfo] = useState({ success: "", error: "" });
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);
    const navigate = useNavigate();
    const updateFormValue = (e, inputName) => {
        const value = e.target.value;
        const newForm = { ...formValue };
        newForm[inputName] = value;
        setFormValue({ ...newForm });
    }
    const registerUser = async (e) => {
        e.preventDefault();
        clickSound.play();
        fetch("http://localhost:5000/register", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(formValue)
        }).then(res => res.json()).then(data => {
            if (data.success) {
                createUserWithEmailAndPassword(formValue.email, formValue.password);
            }
            else {
                setInfo({ success: "", error: data.error })
            }
        })

        if (error) {
            console.log("error ache")
            setInfo({ success: "", error: error.message })
        }

        console.log("<<<", user)
        if (user) {
            console.log(user)
            setInfo({ error: "", success: "congrats" })
            setFormValue({ name: "", email: "", "username": "", "password": "" })
            navigate("/home");
        }

    }

    if (loading) {
        return <Loader message={"Joining..."} />
    }
    if (user) {
        localStorage.setItem("sound", true)
        navigate("/")
    }


    return (
        <div className='text-darkGray dark:text-gray flex flex-col min-h-screen w-full animate__animated animate__fadeInUpBig' >
            {/* BACK ARROW  */}
            <Link to={"/entry"}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[24px] h-[24px] -ml-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
            </Link>

            {/* HEADING  */}
            <div className='my-9' >
                <Heading2>Create account</Heading2>
                <Heading1 additionalClasses="mt-[9px] " >Let’s get to know you better!</Heading1>
            </div>

            <form onSubmit={registerUser} className='grid grid-cols-1 w-full h-full flex-grow'>
                <div>
                    {/* NAME  */}
                    <Heading2 additionalClasses={'mt-4'} >Your name</Heading2>
                    <input
                        required
                        type={"text"}
                        placeholder="Type your name here"
                        className={inputClasses}
                        value={formValue["name"]}
                        onChange={(e) => updateFormValue(e, "name")}
                    />

                    {/* USERNAME  */}
                    <Heading2 additionalClasses={'mt-4'} > Username</Heading2>
                    <input
                        required
                        type={"text"}
                        placeholder="Type your username here"
                        className={inputClasses}
                        value={formValue["username"]}
                        onChange={(e) => updateFormValue(e, "username")}
                    />

                    {/* EMAIL  */}
                    <Heading2 additionalClasses={'mt-4'} >Email</Heading2>
                    <input
                        required
                        type={"email"}
                        placeholder="Type your Email here"
                        className={inputClasses}
                        value={formValue["email"]}
                        onChange={(e) => updateFormValue(e, "email")}
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

                <div className='place-self-end w-full mt-[73px]'>
                    {/* <Info type="success"> success </Info> */}
                    {
                        info.success ? <Info type="success">{info.success}</Info> : info.error && <Info type="error" >{info.error}</Info>
                    }

                    {/* SUBMIT BUTTON  */}
                    <Button additionalClasses="mt-4" type="submit" btnType={"primary"} > Register </Button>
                </div>
            </form>
        </div>
    );
};

export default Register;