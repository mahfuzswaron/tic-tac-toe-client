import React from 'react';
import Button from './Button';

const Modal = ({ modal }) => {
    const { message, buttons } = modal;
    /* 

    type, message, buttons-configs, stateFns
    
    demo props:
    {
        type: "alert",
        message: "you're alerted",
        buttons: [
            { type: primary, text: "ok", onClick: ()=> setState() }
        ],
        stateFns:[setState1, setState2, ...]
    }

    */
    return (
        <div className='bg-gray dark:bg-darkGray rounded-lg p-5 max-w-[70%] z-1 fixed top-[35%] left-[4.5rem] shadow-[2px_2px_16px_0_rgba(0,0,0,0.16)]' >
            <h3 className='text-xs mb-5' >{message}</h3>
            <div className='flex space-x-2'>
                {
                    buttons.map((b, i) => <Button additionalClasses={" text-[10px] py-2"} key={i} btnType={b.type} onClick={b.onClick}>{b.text} </Button>)
                }
            </div>
        </div>
    );
};

export default Modal;