"use client"

import { useContext } from "react";
import { signin, signup } from "../services/auth/auth";
import { AuthenticationContext } from "@/app/context/AuthContext";
import { removeCookies } from "cookies-next";

const useAuth = () => {
    const { setAuthState } = useContext(AuthenticationContext);

    const handleSignin = async ({
        email,
        password }:
        {
            email: string,
            password: string
        }) => {
        try {
            await signin({ email, password });
            setAuthState({ loading: false, data: null, error: null });
        } catch (error: any) {
            setAuthState({ loading: false, data: null, error: error.message });
            throw new Error (error.message)
        }
    }

    const handleSignup = async (
        {
            firstName,
            lastName,
            email,
            phone,
            city,
            password,
            confirmPassword
        }:
            {
                firstName: string,
                lastName: string,
                email: string,
                phone: string,
                city: string,
                password: string,
                confirmPassword: string
            }
    ) => {
        if (password !== confirmPassword) {
            setAuthState({ loading: false, data: null, error: "password do not match" })
            throw new Error("Password:Password do not match")
        }
        try {
            const response = await signup(
                {
                    firstName,
                    lastName,
                    email,
                    phone,
                    city,
                    password

                });

            console.log("data went through to signup")

            setAuthState({ loading: false, data: null, error: null });
        } catch (error: any) {
            setAuthState({ loading: false, data: null, error: error.message });
            console.log("Error useAuth: data did not go through to signup ")
            console.log(error.message)
            throw new Error(error.message)
            // console.log(JSON.stringify(error))
        }
    }

    const handleSignout = () => {
        setAuthState({ loading: true, data: null, error: null })
        removeCookies("jwt");
        window.location.reload()
    }
    return { handleSignin, handleSignout, handleSignup }
}

export default useAuth;


// functioning
// import axios from "axios";
// import { removeCookies } from "cookies-next";
// const useAuth = () => {


//     const signin = async ({ email, password,
//     }: {
//         email: string;
//         password: string;
//     }) => {
//         try {
//             const response = await axios.post("http://localhost:3000/api/auth/signin", {
//                 email,
//                 password
//             })
//             if (response.status !== 200) {
//                 throw new Error('Incorrect email or password')
//             }


//         } catch (error) {

//             throw new Error('Incorrect email or password')
//         }
//     }
//     const signout = () =>{
//         removeCookies("jwt");
//         setAUthState({loading: false, data: null, error:null})
//     }

//     return { signin,signout }
// }

// export default useAuth

// older
// import axios from "axios";




// export type Auth = {
//     // user: any;
//     signout: () => void; // Add the signin function here
//     // signout: () => void;
// }

// const useAuth = () => {
//     const signout = () => {

//         console.log("useAuth has been triggered")

//     }


//     return {signout}
// }
// export default useAuth