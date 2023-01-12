import React from 'react';
import Button from './Button';

const Modal = ({ modal }) => {
    const { message, buttons } = modal;
    return (
        <div className='z-1 fixed top-[35%] left-0 flex justify-center w-full' >
            <div className='min-h-[5rem] bg-gray dark:bg-darkGray rounded-lg p-5 shadow-[2px_2px_16px_0_rgba(0,0,0,0.16)]'>
                <h3 className='text-xs mb-5' >{message}</h3>
                <div className='flex space-x-2'>
                    {
                        buttons.map((b, i) => <Button additionalClasses={" text-[10px] py-2 max-w-[50%] mx-auto"} key={i} btnType={b.type} onClick={b.onClick}>{b.text} </Button>)
                    }
                </div>
            </div>
        </div>
    );
};

export default Modal;