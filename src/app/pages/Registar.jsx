import React from 'react';
import Heading2 from "../components/Heading2";
import Heading1 from "../components/Heading1";
import Button from "../components/Button";

const inputClasses = "mt-[12px] p-3 rounded-lg bg-gray w-full";

const Registar = () => {
    return (
        <div className='text-semiBlack' >

            {/* BACK ARROW  */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[24px] h-[24px] -ml-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>

            {/* HEADING  */}
            <div className='my-9' >
                <Heading2>Create account</Heading2>
                <Heading1 additionalClasses="mt-[9px] " >Let’s get to know you better!</Heading1>
            </div>

            <form>
                {/* NAME  */}
                <Heading2 additionalClasses={'mt-[16px]'} >Your name</Heading2>
                <input type={"text"} placeholder="Type your name here" className={inputClasses} />

                {/* USERNAME  */}
                <Heading2 additionalClasses={'mt-[16px]'} > username</Heading2>
                <input type={"text"} placeholder="Type your username here" className={inputClasses} />

                {/* EMAIL  */}
                <Heading2 additionalClasses={'mt-[16px]'} >Email</Heading2>
                <input type={"email"} placeholder="Type your username here" className={inputClasses} />

                {/* PASSWORD */}
                <Heading2 additionalClasses={'mt-[16px]'} > Password</Heading2>
                <input type={"text"} placeholder="Type your password here" className={inputClasses} />

                {/* SUBMIT BUTTON  */}
                <Button additionalClasses="mt-[73px]" type="primary" >Register</Button>
            </form>
        </div>
    );
};

export default Registar;