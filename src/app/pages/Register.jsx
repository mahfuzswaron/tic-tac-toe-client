import React, { useState } from 'react';
import Heading2 from "../components/Heading2";
import Heading1 from "../components/Heading1";
import Button from "../components/Button";
import Info from '../components/Info';

const inputClasses = "mt-3 p-3 rounded-lg bg-gray w-full";

const Register = () => {
    const [formValue, setFormValue] = useState({
        name: "",
        username: "",
        email: "",
        password: ""
    });
    const updateFormValue = (e, inputName) => {
        console.log(e)
        const value = e.target.value;
        const newForm = { ...formValue };
        newForm[inputName] = value;
        setFormValue({ ...newForm });
    }
    const registerUser = (e) => {
        e.preventDefault()
        console.log(formValue);
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
                        type={"text"}
                        placeholder="Type your name here"
                        className={inputClasses}
                        value={formValue["name"]}
                        onChange={(e) => updateFormValue(e, "name")}
                    />

                    {/* USERNAME  */}
                    <Heading2 additionalClasses={'mt-4'} > username</Heading2>
                    <input
                        type={"text"}
                        placeholder="Type your username here"
                        className={inputClasses}
                        value={formValue["username"]}
                        onChange={(e) => updateFormValue(e, "username")}
                    />

                    {/* EMAIL  */}
                    <Heading2 additionalClasses={'mt-4'} >Email</Heading2>
                    <input
                        type={"email"}
                        placeholder="Type your Email here"
                        className={inputClasses}
                        value={formValue["email"]}
                        onChange={(e) => updateFormValue(e, "email")}
                    />

                    {/* PASSWORD */}
                    <Heading2 additionalClasses={'mt-4'} > Password</Heading2>
                    <input
                        type={"password"}
                        placeholder="Type your password here"
                        className={inputClasses}
                        value={formValue["password"]}
                        onChange={(e) => updateFormValue(e, "password")}
                    />
                </div>

                <div className='place-self-end w-full mt-[73px]'>
                    {/* <Info type="success"> success </Info> */}

                    {/* SUBMIT BUTTON  */}
                    <Button additionalClasses="mt-4" type="submit" btnType={"primary"} > Register </Button>
                </div>
            </form>
        </div>
    );
};

export default Register;