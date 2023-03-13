"use client"

import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import useAuth from '@/hooks/useAuth';
import { AuthenticationContext } from "../context/AuthContext";
import { useContext } from 'react';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};



export default function SigninModal() {
    const { loading, data, error } = useContext(AuthenticationContext)


    const { handleSignin } = useAuth();
    const [errorState, setErrorState] = useState("");

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setInputs({
            email: "",
            password: ""

        })
        setErrorState("")
    }

    const handleClick = async () => {
        try {
            const response = await handleSignin({
                email: inputs.email,
                password: inputs.password,
            })

            handleClose()
            window.location.reload()


        } catch (error) {
            setErrorState('Email/Password Error')
        }

        // signin({ email: inputs.email, password: inputs.password })

    }

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value,
        });
    };

    const [disabled, setDisabled] = useState(true)

    const [inputs, setInputs] = useState({
        email: "",
        password: ""

    });

    React.useEffect(() => {
        setDisabled(!hasRequiredFields());
    },
        [inputs]
    )
    const hasRequiredFields = () => {
        return inputs.email && inputs.password
    };
    return (
        <div>
            <button
                className="bg-blue-400 hover:bg-blue-500 text-white border p-1 px-4 rounded mr-3"
                onClick={handleOpen}
            >
                Sign in
            </button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {/* <div className="uppercase font-bold text-center pb-2 border-b mb-2"> */}
                    <div className=" font-bold text-center pb-2 border-b mb-2">
                        {errorState.length > 1 && <div>{errorState}</div>}

                        <div className="text-sm">
                            <p>
                                Sign In
                            </p>

                            <p >yinho@hotmail.com</p>
                            <p >as14Adsdkfasdkgjh23s.ag</p>
                        </div>
                    </div>
                    <h2 className="text-2xl font-light text-center">

                        Sign Into Your Account


                    </h2>
           

                    <div className="my-3 flex flex-col">
                        <label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="text"
                            id="email"
                            className={`border rounded p-2 py-3 ${errorState ? 'border-red-500' : ''
                                }`}
                            placeholder="Enter your email"
                            value={inputs.email}
                            onChange={handleChangeInput}
                            name="email"
                        />
                    </div>

                    <div className="my-3 flex flex-col">
                        <label htmlFor="password" className="text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            id="password"
                            className={`border rounded p-2 py-3 ${errorState ? 'border-red-500' : ''
                                }`}
                            placeholder="Enter your password"
                            value={inputs.password}
                            onChange={handleChangeInput}
                            name="password"
                        />
                    </div>
                    {errorState && (
                        <p className="text-red-500 mt-2">
                            The email or password you entered is incorrect.
                        </p>
                    )}


                    {/* test bottom */}


                    <button
                        className={`w-[100%] bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ${disabled ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                        onClick={handleClick}
                        disabled={disabled}
                    >
                        Sign In
                    </button>

                </Box>
            </Modal>
        </div>
    );
}