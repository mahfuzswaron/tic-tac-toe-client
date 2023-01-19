import React from 'react';
import { Detector } from "react-detect-offline";
import img from "../assets/no-internet.png";
import Button from "./Button";

const CheckOnline = ({ children }) => {
    return (
        <>
            <Detector
                render={({ online }) => (
                    online ? children :
                        <div className='flex justify-center items-center' >
                            <div className='flex flex-col space-y-3'>
                                <img src={img} alt="" className='w-28' />
                                <p className='text-center'>No internet!</p>
                                <Button additionalClasses={"text-[12px] w-20 mx-auto py-2 "} btnType={"secondary"} onClick={() => window.location.reload()}> Reload</Button>
                            </div>
                        </div>
                )}

            />
        </>
    );
};

export default CheckOnline;