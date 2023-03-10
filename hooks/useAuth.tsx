import axios from "axios";
import { removeCookies } from "cookies-next";
const useAuth = () => {


    const signin = async ({ email, password, 
    }: {
        email: string;
        password: string;
    }) => {
        try {
            const response = await axios.post("http://localhost:3000/api/auth/signin", {
                email,
                password
            })
            if (response.status !== 200) {
                throw new Error('Incorrect email or password')
            }
         

        } catch (error) {

            throw new Error('Incorrect email or password')
        }
    }

    return { signin }
}

export default useAuth

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