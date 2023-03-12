"use client"

import { useContext } from "react";
import { signin } from "./auth";
import { AuthenticationContext } from "@/app/context/AuthContext";
import { removeCookies } from "cookies-next";

const useAuth = () => {
    const { setAuthState } = useContext(AuthenticationContext);

    const handleSignin = async ({ email, password }: { email: string, password: string }) => {
        try {
            await signin({ email, password });
            setAuthState({ loading: false, data: null, error: null });
        } catch (error: any) {
            setAuthState({ loading: false, data: null, error: error.message });
        }
    }



    const handleSignout = () => {
        setAuthState({ loading: true, data: null, error: null })
        removeCookies("jwt");
        window.location.reload()
    }
    return { handleSignin, handleSignout }
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