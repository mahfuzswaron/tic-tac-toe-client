import React, { useState } from 'react';
import Heading2 from "../components/Heading2";
import Heading1 from "../components/Heading1";
import Button from "../components/Button";
import Info from '../components/Info';
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";


const inputClasses = "mt-3 p-3 rounded-lg bg-gray w-full";

const Register = () => {
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

    const updateFormValue = (e, inputName) => {
        const value = e.target.value;
        const newForm = { ...formValue };
        newForm[inputName] = value;
        setFormValue({ ...newForm });
    }
    const registerUser = async (e) => {
        e.preventDefault();
        await createUserWithEmailAndPassword(formValue.email, formValue.password);
        if (error) {
            console.log("error ache")
            setInfo({ success: "", error: error.message })
        }
        else if (user) {
            console.log("user ache")
            setInfo({ error: "", success: "congrats" })
            console.log(info)
        }
        setFormValue({ name: "", email: "", "username": "", "password": "" })
    }

    if (loading) {
        return <p>Loaidng...</p>
    }

    return (
        <div className='text-semiBlack flex flex-col min-h-screen w-full' >

            {/* BACK ARROW  */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[24px] h-[24px] -ml-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>

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