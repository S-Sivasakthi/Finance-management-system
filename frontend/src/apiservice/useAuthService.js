import axios from "./axios";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";

const useAuthService = () => {
    const axiosPrivate = useAxiosPrivate();
    const { setUser, setAccessToken } = useAuth();

    const signup = async (newUser) => {
        try {
            // Send signup request to the backend
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}auth/signup`, newUser);
    
            // Log the full response to understand the structure
            console.log("Signup response:", response);
    
            // Ensure a success response and return the relevant data
            if (response.status === 200 || response.status === 201) {
                return { status: true, data: response.data }; // Check status and return data
            } else {
                return { status: false, data: response.data }; // If the status isn't 200 or 201, handle as failure
            }
        } catch (error) {
            console.error("Error during signup:", error.response || error);
            throw error;  // Propagate error to be handled in the component
        }
    };
    

    // Updated signup function to use full URL and return actual response data

    // const signup = async (newUser) => {
    //     try {
    //         // Use full URL for the request
    //         const response = await axios.post(`${import.meta.env.VITE_BASE_URL}auth/signup`, newUser);

    //         // Log response for debugging
    //         console.log("Signup response:", response.data);

    //         // Return actual data along with status
    //         return { status: true, data: response.data };
    //     } catch (error) {
    //         // Log full error response for debugging
    //         console.error("Error during signup:", error.response || error);
    //         throw error;  // Propagate error to be handled in the component
    //     }
    // };

    // Updated login function to handle response properly and return data
    const login = async (id, password) => {
        const credentials = { id, password };

        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}auth/login`, credentials, { withCredentials: true });

            const { message, accessToken, user } = response.data;

            setUser(user);  // Store user data in context
            setAccessToken(accessToken);  // Store access token in context

            // Return status and data
            return { status: true, data: { message, accessToken, user } };
        } catch (error) {
            // Log error for debugging
            console.error("Error during login:", error.response || error);
            throw error;
        }
    };

    // Updated logout function to clear user and token data
    const logout = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}auth/logout`, { withCredentials: true });

            // Clear user data and access token
            setUser('');
            setAccessToken('');
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    // Fetch user details function with axiosPrivate (authenticated requests)
    const getDetails = async () => {
        try {
            const res = await axiosPrivate.get(`${import.meta.env.VITE_BASE_URL}auth/details`);

            // Return status and data
            return { status: true, data: res.data };
        } catch (error) {
            console.error("Error during fetching details:", error);
            return { status: false, error };
        }
    };

    return {
        signup,
        login,
        logout,
        getDetails
    };
};

export default useAuthService;













// import axios from "./axios";
// import useAxiosPrivate from "../hooks/useAxiosPrivate";
// import useAuth from "../hooks/useAuth";

// const useAuthService = () => {
//     const axiosPrivate = useAxiosPrivate();
//     const { setUser, setAccessToken } = useAuth();

//     // Updated signup function to use full URL and return actual response data
//     const signup = async (newUser) => {
//         try {
//             // Use full URL for the request
//             // const res = await axios.post(`http://localhost:5000/api/auth/signup`, newUser);

//             // const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/auth/signup`, newUser);

            
//             const response = await axios.post(`${import.meta.env.VITE_BASE_URL}auth/signup`, newUser);

//             // Log response for debugging
//             console.log("Signup response:", response.data);

//             // Return actual data along with status
//             return { status: true, data: res.data };
//         } catch (error) {
//             // Log full error response for debugging
//             console.error("Error during signup:", error.response || error);
//             throw error;  // Propagate error to be handled in the component
//         }
//     };

//     // Updated login function to handle response properly and return data
//     const login = async (id, password) => {
//         const credentials = { id, password };

//         try {
//             const res = await axios.post(`/auth/login`, credentials, { withCredentials: true });

//             const { message, accessToken, user } = res.data;

//             setUser(user);  // Store user data in context
//             setAccessToken(accessToken);  // Store access token in context

//             // Return status and data
//             return { status: true, data: { message, accessToken, user } };
//         } catch (error) {
//             // Log error for debugging
//             console.error("Error during login:", error.response || error);
//             throw error;
//         }
//     };

//     // Updated logout function to clear user and token data
//     const logout = async () => {
//         try {
//             const res = await axios.get(`/auth/logout`, { withCredentials: true });

//             // Clear user data and access token
//             setUser('');
//             setAccessToken('');
//         } catch (error) {
//             console.error("Error during logout:", error);
//         }
//     };

//     // Fetch user details function with axiosPrivate (authenticated requests)
//     const getDetails = async () => {
//         try {
//             const res = await axiosPrivate.get(`/auth/details`);

//             // Return status and data
//             return { status: true, data: res.data };
//         } catch (error) {
//             console.error("Error during fetching details:", error);
//             return { status: false, error };
//         }
//     };

//     return {
//         signup,
//         login,
//         logout,
//         getDetails
//     };
// };

// export default useAuthService;









// import axios from "./axios"
// import useAxiosPrivate from "../hooks/useAxiosPrivate"
// import useAuth from "../hooks/useAuth"


// const useAuthService = () => {
//     const axiosPrivate = useAxiosPrivate()
//     const { setUser, setAccessToken } = useAuth()

//     const signup = async (newUser) => {
//         try {
//             const res = await axios.post(`http://localhost:5000/auth/signup`, newUser)
//             return { status: true }
//         } catch (error) {
//             throw error
//         }
//     }

//     const login = async (id, password) => {
//         const credentials = { id, password };

//         try {
//             const res = await axios.post(`http://localhost:5000/auth/login`, credentials, { withCredentials: true });
//             const { message, accessToken, user } = res.data

//             setUser(user)
//             setAccessToken(accessToken)

//             return { status: true }
//         } catch (error) {
//             throw error
//         }
//     }

//     const logout = async () => {
//         try {
//             const res = await axios.get(`http://localhost:5000/auth/logout`, { withCredentials: true })
//             setUser('')
//             setAccessToken('')
//         } catch (error) {
//             console.error(error);
//         }
//     }

//     const getDetails = async () => {
//         try {
//             const res = await axiosPrivate.get(`/auth/details`)
//             return { status: true, data: res.data }
//         } catch (error) {
//             console.error(error);
//             return { status: false, error }
//         }
//     }

//     return {
//         signup,
//         login,
//         logout,
//         getDetails
//     }
// }

// export default useAuthService
