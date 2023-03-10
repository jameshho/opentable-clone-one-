
"use client"

import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

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

export default function SignupModal() {
    const [open, setOpen] = React.useState(false);
    const [disabled, setDisabled] = React.useState(true);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setInputs({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            city: "",
            password: "",
            confirmPassword: "",
        })
    }


    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value,
        });
    };

    // Set this up so validate can result
    const errors = ""


    const [inputs, setInputs] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        city: "",
        password: "",
        confirmPassword: "",
    });
    const hasRequiredFields = () => {
        return inputs.firstName && inputs.lastName && inputs.email && inputs.phone && inputs.city && inputs.password && inputs.confirmPassword;
    };
    React.useEffect(() => {
        setDisabled(!hasRequiredFields());


    },
        [inputs]
    )
        ;

    return (
        <div>
            <button
                className="border hover:bg-gray-200 p-1 px-4 rounded"
                onClick={handleOpen}
            >
                Sign up
            </button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"

            >
                <Box sx={style}>
                    <div className="uppercase font-bold text-center pb-2 border-b mb-2">
                        <p className="text-sm">
                            Sign up
                        </p>
                    </div>
                    <h2 className="text-2xl font-light text-center">

                        Sign up for an Account


                    </h2>

                    {/* test top */}
                    <form className="bg-white rounded px-8 pt-6 pb-8 mb-4">

                        <div className="my-3 flex justify-between text-sm">
                            <label htmlFor="firstName" className="w-1/2">
                                First Name
                            </label>
                            <label htmlFor="lastName" className="w-1/2">
                                Last Name
                            </label>
                        </div>

                        <div className="my-3 flex justify-between text-sm">
                            <input
                                type="text"
                                className="border rounded p-2 py-3 w-1/2 mr-2"
                                placeholder="John"
                                value={inputs.firstName}
                                onChange={handleChangeInput}
                                name="firstName"
                            />
                            <input
                                type="text"
                                className="border rounded p-2 py-3 w-1/2 ml-2"
                                placeholder="Doe"
                                value={inputs.lastName}
                                onChange={handleChangeInput}
                                name="lastName"
                            />
                        </div>

                        <div className="my-3">
                            <label htmlFor="email">
                                Email
                            </label>
                            <input
                                type="text"
                                className="border rounded p-2 py-3 w-full"
                                placeholder="Email"
                                value={inputs.email}
                                onChange={handleChangeInput}
                                name="email"
                            />
                        </div>

                        <div className="my-3 flex justify-between text-sm">
                            <label htmlFor="phone" className="w-1/2">
                                Phone
                            </label>
                            <label htmlFor="city" className="w-1/2">
                                City
                            </label>
                        </div>

                        <div className="my-3 flex justify-between text-sm">
                            <input
                                type="text"
                                className="border rounded p-2 py-3 w-1/2 mr-2"
                                placeholder="Phone"
                                value={inputs.phone}
                                onChange={handleChangeInput}
                                name="phone"
                            />
                            <input
                                type="text"
                                className="border rounded p-2 py-3 w-1/2 ml-2"
                                placeholder="City"
                                value={inputs.city}
                                onChange={handleChangeInput}
                                name="city"
                            />
                        </div>

                        <div className="my-3">
                            <label htmlFor="password">
                                Password
                            </label>
                            <input
                                type="password"
                                className="border rounded p-2 py-3 w-full"
                                placeholder="Password"
                                value={inputs.password}
                                onChange={handleChangeInput}
                                name="password"
                            />
                        </div>

                        <div className="my-3">
                            <label htmlFor="confirmPassword">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                className="border rounded p-2 py-3 w-full"
                                placeholder="Confirm Password"
                                value={inputs.confirmPassword}
                                onChange={handleChangeInput}
                                name="confirmPassword"
                            />
                        </div>

                        {errors && (
                            <p className="text-red-600 my-3">{errors}</p>
                        )}



                        <button
                            className={`w-[100%] bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ${disabled ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                            onClick={handleClose}
                            disabled={disabled}
                        >


                            Sign Up
                        </button>


                    </form>


                    {/* test bottom */}
                    {/* <div className="my-3 flex justify-between text-sm">
                        <input
                            type="text"
                            className="border rounded p-2 py-3 w-[49%]"
                            placeholder="John"
                            value={inputs.firstName}
                            onChange={handleChangeInput}
                            name="firstName"
                        />
                        <input
                            type="text"
                            className="border rounded p-2 py-3 w-[49%]"
                            placeholder="Doe"
                            value={inputs.lastName}
                            onChange={handleChangeInput}
                            name="lastName"
                        />
                    </div>
                    <div className="my-3 flex justify-between text-sm">
                        <input
                            type="text"
                            className="border rounded p-2 py-3 w-full"
                            placeholder="Email"

                            value={inputs.email}
                            onChange={handleChangeInput}
                            name="email"
                        />
                    </div>

                    <div className="my-3 flex justify-between text-sm">
                        <input
                            type="text"
                            className="border rounded p-2 py-3 w-[49%]"
                            placeholder="Phone"
                            value={inputs.phone}
                            onChange={handleChangeInput}
                            name="phone"
                        />
                        <input
                            type="text"
                            className="border rounded p-2 py-3 w-[49%]"
                            placeholder="City"
                            value={inputs.city}
                            onChange={handleChangeInput}
                            name="city"
                        />
                    </div>

                    <div className="my-3 flex justify-between text-sm">
                        <input
                            type="password"
                            className="border rounded p-2 py-3 w-full"
                            placeholder="Password"
                            value={inputs.password}
                            onChange={handleChangeInput}
                            name="password"
                        />
                    </div>
                    <div className="my-3 flex justify-between text-sm">
                        <input
                            type="password"
                            className="border rounded p-2 py-3 w-full"
                            placeholder="Confirm Password"
                            value={inputs.confirmPassword}
                            onChange={handleChangeInput}
                            name="confirmPassword"
                        />
                    </div>
                    <button
                        className='uppercase bg-red-600 w-full text-white disabled:bg-gray-400'
                        onClick={handleClose}
                        disabled={disabled}
                    // disabled={true}

                    >Sign Up</button> */}

                </Box>
            </Modal>
        </div >
    );
}
