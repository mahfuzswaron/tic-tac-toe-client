import React, { useEffect, useState } from 'react';
import img from "../assets/no-internet.png";
import Button from "./Button";

const CheckOnline = ({ children }) => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    useEffect(() => {
        // Update network status
        const handleStatusChange = () => {
          setIsOnline(navigator.onLine);
        };
    
        // Listen to the online status
        window.addEventListener('online', handleStatusChange);
    
        // Listen to the offline status
        window.addEventListener('offline', handleStatusChange);
    
        // Specify how to clean up after this effect for performance improvment
        return () => {
          window.removeEventListener('online', handleStatusChange);
          window.removeEventListener('offline', handleStatusChange);
        };
    }, [isOnline]);

return (
    <> {
        isOnline ? children :
        <div className='flex justify-center items-center' >
            <div className='flex flex-col space-y-3'>
                <img src={img} alt="" className='w-28' />
                <p className='text-center'>No internet!</p>
                <Button additionalClasses={"text-[12px] w-20 mx-auto py-2 "} btnType={"secondary"} onClick={() => window.location.reload()}> Reload</Button>
            </div>
        </div>
    }
    </>
);
};

export default CheckOnline;