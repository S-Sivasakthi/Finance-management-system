import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthService from "../apiservice/useAuthService";

const Signup = () => {
    const { signup } = useAuthService();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        fname: "",
        lname: "",
        age: "",
        maritalstatus: "", // Added maritalstatus
    });

    const [message, setMessage] = useState('');
    const [passwordMessage, setPasswordMessage] = useState('');
    const navigate = useNavigate();

    // Handle input changes
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value,
        });

        // Password match check
        if (id === "confirmPassword" && value !== formData.password) {
            setPasswordMessage("Passwords don't match");
        } else {
            setPasswordMessage("");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Validate password match
        if (formData.password !== formData.confirmPassword) {
            setPasswordMessage("Passwords don't match");
            return;
        }
    
        // Basic email validation
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            setMessage("Please enter a valid email address.");
            return;
        }
    
        const { confirmPassword, ...userData } = formData;
    
        try {
            const response = await signup(userData);  // Use the signup function from useAuthService
            console.log("Signup response:", response); // Log response for debugging
    
            // Check response status or the actual data returned
            if (response.status && response.data?.message === "Signup successful") {
                setMessage("Signup successful! Please log in.");
                navigate("/login");
            } else {
                setMessage("Signup failed. Try again...");
            }
        } catch (error) {
            console.error("Error during signup:", error); // Log error for debugging
    
            if (!error.response) {
                setMessage('No Server response');
            } else if (error.response.status === 400) {
                setMessage(error.response.data.message || "Bad request");
            } else {
                setMessage("Signup failed. Please try again later.");
            }
        } finally {
            // Reset form after submission
            setFormData({
                username: "",
                email: "",
                password: "",
                confirmPassword: "",
                fname: "",
                lname: "",
                age: "",
                maritalstatus: "", // Reset marital status field
            });
    
            // Clear the message after 5 seconds
            setTimeout(() => setMessage(''), 5000);
        }
    };
    

    // Handle form submission
    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     // Validate password match
    //     if (formData.password !== formData.confirmPassword) {
    //         setPasswordMessage("Passwords don't match");
    //         return;
    //     }

    //     // Basic email validation
    //     if (!/\S+@\S+\.\S+/.test(formData.email)) {
    //         setMessage("Please enter a valid email address.");
    //         return;
    //     }

    //     const { confirmPassword, ...userData } = formData;

    //     try {
    //         const response = await signup(userData);  // Use the signup function from useAuthService
    //         console.log("Signup response:", response); // Log response for debugging

    //         // Log response.status to check the status
    //         console.log("Response status:", response.status);

    //         if (response.status === 201) {  // Ensure successful signup status
    //             setMessage("Signup successful! Please log in.");
    //             navigate("/login");
    //         } else {
    //             setMessage("Signup failed. Try again...");
    //         }
    //     } catch (error) {
    //         console.error("Error during signup:", error); // Log error for debugging

    //         if (!error.response) {
    //             setMessage('No Server response');
    //         } else if (error.response.status === 400) {
    //             setMessage(error.response.data.message || "Bad request");
    //         } else {
    //             setMessage("Signup failed. Please try again later.");
    //         }
    //     } finally {
    //         // Reset form after submission
    //         setFormData({
    //             username: "",
    //             email: "",
    //             password: "",
    //             confirmPassword: "",
    //             fname: "",
    //             lname: "",
    //             age: "",
    //             maritalstatus: "", // Reset marital status field
    //         });

    //         // Clear the message after 5 seconds
    //         setTimeout(() => setMessage(''), 5000);
    //     }
    // };

    return (
        <div className="py-20 background content-center lg:px-8 text-txt">
            <div className="w-5/6 mx-auto lg:max-w-lg">
                <form
                    className="space-y-4 p-4 md:p-10 rounded-lg shadow-2xl highlight-white bg-base"
                    onSubmit={handleSubmit}
                >
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2 className="my-4 text-center text-xl font-bold leading-9 tracking-tight">
                            Create a new account
                        </h2>
                    </div>

                    {/* Display general message */}
                    <div className="h-1">
                        <p className="text-center text-xs text-light-red">{message}</p>
                    </div>

                    {/* Username Input */}
                    <div>
                        <label htmlFor="username" className="form-label">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={formData.username}
                            placeholder="Username"
                            onChange={handleChange}
                            className="form-field"
                            autoFocus
                            required
                        />
                    </div>

                    {/* Email Input */}
                    <div>
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={formData.email}
                            placeholder="Email id"
                            onChange={handleChange}
                            className="form-field"
                            required
                        />
                    </div>

                    {/* Password and Confirm Password */}
                    <div className="flex space-x-2">
                        <div className="w-1/2">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={formData.password}
                                placeholder="Password"
                                onChange={handleChange}
                                className="form-field"
                                required
                            />
                        </div>
                        <div className="w-1/2">
                            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                value={formData.confirmPassword}
                                placeholder="Confirm password"
                                onChange={handleChange}
                                className="form-field"
                                required
                            />
                            <div className="h-1">
                                {passwordMessage && <p className="text-xs text-light-red">{passwordMessage}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Name Inputs */}
                    <div>
                        <label htmlFor="fname" className="form-label">Name</label>
                        <div className="flex space-x-2">
                            <input
                                type="text"
                                id="fname"
                                value={formData.fname}
                                placeholder="First Name"
                                onChange={handleChange}
                                className="form-field"
                                required
                            />
                            <input
                                type="text"
                                id="lname"
                                value={formData.lname}
                                placeholder="Last Name"
                                onChange={handleChange}
                                className="form-field"
                            />
                        </div>
                    </div>

                    {/* Age Input */}
                    <div className="flex flex-col">
                        <label htmlFor="age" className="form-label">Age</label>
                        <input
                            type="number"
                            id="age"
                            value={formData.age}
                            placeholder="Age"
                            onChange={handleChange}
                            className="form-field"
                        />
                    </div>

                    {/* Marital Status */}
                    <div>
                        <label htmlFor="maritalstatus" className="form-label">Marital Status</label>
                        <select
                            id="maritalstatus"
                            value={formData.maritalstatus}
                            onChange={handleChange}
                            className="form-field"
                            required
                        >
                            <option value="">Select Marital Status</option>
                            <option value="Single">Single</option>
                            <option value="Married">Married</option>
                            <option value="Divorced">Divorced</option>
                            <option value="Widowed">Widowed</option>
                        </select>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-accent hover:bg-sky-600 font-semibold leading-6 py-2 px-3 shadow-md transition-all"
                    >
                        Sign Up
                    </button>

                    {/* Redirect to Login */}
                    <p className="mt-6 text-center text-sm text-txt-depressed">
                        Already have an account?{' '}
                        <a href="/login" className="font-semibold leading-6 text-accent hover:text-sky-600">Login</a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Signup;



// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import useAuthService from "../apiservice/useAuthService";

// const Signup = () => {
//     const { signup } = useAuthService();

//     const [formData, setFormData] = useState({
//         username: "",
//         email: "",
//         password: "",
//         confirmPassword: "",
//         fname: "",
//         lname: "",
//         age: "",
//     });

//     const [message, setMessage] = useState('');
//     const [passwordMessage, setPasswordMessage] = useState('');
//     const navigate = useNavigate();

//     // Handle input changes
//     const handleChange = (e) => {
//         const { id, value } = e.target;
//         setFormData({
//             ...formData,
//             [id]: value,
//         });

//         // Password match check
//         if (id === "confirmPassword" && value !== formData.password) {
//             setPasswordMessage("Passwords don't match");
//         } else {
//             setPasswordMessage("");
//         }
//     };

//     // Handle form submission
//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         // Validate password match
//         if (formData.password !== formData.confirmPassword) {
//             setPasswordMessage("Passwords don't match");
//             return;
//         }

//         // Basic email validation
//         if (!/\S+@\S+\.\S+/.test(formData.email)) {
//             setMessage("Please enter a valid email address.");
//             return;
//         }

//         const { confirmPassword, ...userData } = formData;

//         try {
//             const response = await signup(userData);  // Use the signup function from useAuthService
//             console.log("Signup response:", response); // Log response for debugging

//             if (response.status === 201) {  // Ensure successful signup status
//                 setMessage("Signup successful! Please log in.");
//                 navigate("/login");
//             } else {
//                 setMessage("Signup failed. Try again...");
//             }
//         } catch (error) {
//             console.error("Error during signup:", error); // Log error for debugging

//             if (!error.response) {
//                 setMessage('No Server response');
//             } else if (error.response.status === 400) {
//                 setMessage(error.response.data.message || "Bad request");
//             } else {
//                 setMessage("Signup failed. Please try again later.");
//             }
//         } finally {
//             // Reset form after submission
//             setFormData({
//                 username: "",
//                 email: "",
//                 password: "",
//                 confirmPassword: "",
//                 fname: "",
//                 lname: "",
//                 age: "",
//             });

//             // Clear the message after 5 seconds
//             setTimeout(() => setMessage(''), 5000);
//         }
//     };

//     return (
//         <div className="py-20 background content-center lg:px-8 text-txt">
//             <div className="w-5/6 mx-auto lg:max-w-lg">
//                 <form
//                     className="space-y-4 p-4 md:p-10 rounded-lg shadow-2xl highlight-white bg-base"
//                     onSubmit={handleSubmit}
//                 >
//                     <div className="sm:mx-auto sm:w-full sm:max-w-sm">
//                         <h2 className="my-4 text-center text-xl font-bold leading-9 tracking-tight">
//                             Create a new account
//                         </h2>
//                     </div>

//                     {/* Display general message */}
//                     <div className="h-1">
//                         <p className="text-center text-xs text-light-red">{message}</p>
//                     </div>

//                     {/* Username Input */}
//                     <div>
//                         <label htmlFor="username" className="form-label">Username</label>
//                         <input
//                             type="text"
//                             id="username"
//                             value={formData.username}
//                             placeholder="Username"
//                             onChange={handleChange}
//                             className="form-field"
//                             autoFocus
//                             required
//                         />
//                     </div>

//                     {/* Email Input */}
//                     <div>
//                         <label htmlFor="email" className="form-label">Email</label>
//                         <input
//                             type="email"
//                             id="email"
//                             value={formData.email}
//                             placeholder="Email id"
//                             onChange={handleChange}
//                             className="form-field"
//                             required
//                         />
//                     </div>

//                     {/* Password and Confirm Password */}
//                     <div className="flex space-x-2">
//                         <div className="w-1/2">
//                             <label htmlFor="password" className="form-label">Password</label>
//                             <input
//                                 type="password"
//                                 id="password"
//                                 value={formData.password}
//                                 placeholder="Password"
//                                 onChange={handleChange}
//                                 className="form-field"
//                                 required
//                             />
//                         </div>
//                         <div className="w-1/2">
//                             <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
//                             <input
//                                 type="password"
//                                 id="confirmPassword"
//                                 value={formData.confirmPassword}
//                                 placeholder="Confirm password"
//                                 onChange={handleChange}
//                                 className="form-field"
//                                 required
//                             />
//                             <div className="h-1">
//                                 {passwordMessage && <p className="text-xs text-light-red">{passwordMessage}</p>}
//                             </div>
//                         </div>
//                     </div>

//                     {/* Name Inputs */}
//                     <div>
//                         <label htmlFor="fname" className="form-label">Name</label>
//                         <div className="flex space-x-2">
//                             <input
//                                 type="text"
//                                 id="fname"
//                                 value={formData.fname}
//                                 placeholder="First Name"
//                                 onChange={handleChange}
//                                 className="form-field"
//                                 required
//                             />
//                             <input
//                                 type="text"
//                                 id="lname"
//                                 value={formData.lname}
//                                 placeholder="Last Name"
//                                 onChange={handleChange}
//                                 className="form-field"
//                             />
//                         </div>
//                     </div>

//                     {/* Age Input */}
//                     <div className="flex flex-col">
//                         <label htmlFor="age" className="form-label">Age</label>
//                         <input
//                             type="number"
//                             id="age"
//                             value={formData.age}
//                             placeholder="Age"
//                             onChange={handleChange}
//                             className="form-field"
//                         />
//                     </div>

//                     {/* Submit Button */}
//                     <button
//                         type="submit"
//                         className="flex w-full justify-center rounded-md bg-accent hover:bg-sky-600 font-semibold leading-6 py-2 px-3 shadow-md transition-all"
//                     >
//                         Sign Up
//                     </button>

//                     {/* Redirect to Login */}
//                     <p className="mt-6 text-center text-sm text-txt-depressed">
//                         Already have an account?{' '}
//                         <a href="/login" className="font-semibold leading-6 text-accent hover:text-sky-600">Login</a>
//                     </p>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default Signup;




// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { validatePassword } from "../utils/passwordValidation";
// import useAuthService from "../apiservice/useAuthService";

// const Signup = () => {
//     const { signup } = useAuthService()

//     const [formData, setFormData] = useState({
//         username: "",
//         email: "",
//         password: "",
//         confirmPassword: "",
//         fname: "",
//         lname: "",
//         age: ""
//     })
//     const [message, setMessage] = useState('')
//     const [passwordMessage, setpasswordMessage] = useState('')
//     const navigate = useNavigate()



//     const handleChange = (e) => {
//         const { id, value } = e.target
//         setFormData({
//             ...formData,
//             [id]: value
//         })

//         if (id === "confirmPassword" && value !== formData.password) {
//             setpasswordMessage("Passwords don't match")
//         // } else if (id === "password") {
//         //     validatePassword(value, setpasswordMessage); // Validate password on change
//         } else {
//             setpasswordMessage("");
//         }
//     }

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (formData.password !== formData.confirmPassword) {
//             setpasswordMessage("Passwords don't match");
//             return
//         }

//         const { confirmPassword, ...userData } = formData

//         try {
//             const response = await signup(userData)
//             if (response.status) {
//                 navigate("/login");
//             }
//         } catch (error) {
//             // console.error(error);
//             if (!error.response) {
//                 setMessage('No Server response')
//             } else if (error.response.status === 400) {
//                 setMessage(error.response.data.message)
//             } else {
//                 setMessage("Login failed. Try again...");
//             }
//             setMessage(error.response.data.message);
//         } finally {
//             setFormData({
//                 username: "",
//                 email: "",
//                 password: "",
//                 confirmPassword: "",
//                 fname: "",
//                 lname: "",
//                 age: ""
//             })

//             setTimeout(() => setMessage(''), 5000)
//         }
//     }

//     return (
//         <div className="py-20 background content-center lg:px-8 text-txt">
//             <div className="w-5/6 mx-auto lg:max-w-lg">
//                 <form
//                     className="space-y-4 p-4 md:p-10 rounded-lg shadow-2xl highlight-white bg-base"
//                     onSubmit={handleSubmit}
//                 >
//                     <div className="sm:mx-auto sm:w-full sm:max-w-sm">
//                         {/* <img
//                         className="mx-auto h-10 w-auto"
//                         src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
//                         alt="Your Company"
//                         /> */}
//                         <h2 className="my-4 text-center text-xl font-bold leading-9 tracking-tight">
//                             Create a new account
//                         </h2>
//                     </div>
//                     <div className="h-1">
//                         <p className="text-center text-xs text-light-red">{message}</p>
//                     </div>
//                     <div>
//                         <label htmlFor="username" className="form-label">Username</label>
//                         <input
//                             type="text"
//                             id="username"
//                             value={formData.username}
//                             placeholder="Username"
//                             onChange={handleChange}
//                             className="form-field"
//                             autoFocus
//                             required
//                         />
//                     </div>
//                     <div>
//                         <label htmlFor="email" className="form-label">Email</label>
//                         <input
//                             type="email"
//                             id="email"
//                             value={formData.email}
//                             placeholder="Email id"
//                             onChange={handleChange}
//                             className="form-field"
//                             required
//                         />
//                     </div>
//                     <div className="flex space-x-2">
//                         <div className="w-1/2">
//                             <label htmlFor="password" className="form-label">Password</label>
//                             <input
//                                 type="password"
//                                 id="password"
//                                 value={formData.password}
//                                 placeholder="password"
//                                 onChange={handleChange}
//                                 className="form-field"
//                                 required
//                             />
//                         </div>
//                         <div className="w-1/2">
//                             <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
//                             <input
//                                 type="password"
//                                 id="confirmPassword"
//                                 value={formData.confirmPassword}
//                                 placeholder="Confirm password"
//                                 onChange={handleChange}
//                                 className="form-field"
//                                 required
//                             />
//                             <div className="h-1">
//                                 {passwordMessage && <p className="text-xs text-light-red">{passwordMessage}</p>}
//                             </div>
//                         </div>
//                     </div>
//                     <div>
//                         <label htmlFor="fname" className="form-label">Name</label>
//                         <div className="flex space-x-2">
//                             <input
//                                 type="text"
//                                 id="fname"
//                                 value={formData.fname}
//                                 placeholder="First Name"
//                                 onChange={handleChange}
//                                 className="form-field"
//                                 required
//                             />
//                             <input
//                                 type="text"
//                                 id="lname"
//                                 value={formData.lname}
//                                 placeholder="Last Name"
//                                 onChange={handleChange}
//                                 className="form-field"
//                             />
//                         </div>
//                     </div>
//                     <div className="flex flex-col">
//                         <label htmlFor="age" className="form-label">Age</label>
//                         <input
//                             type="number"
//                             id="age"
//                             value={formData.age}
//                             placeholder="Age"
//                             onChange={handleChange}
//                             className="form-field"
//                         />
//                     </div>
//                     <button
//                         type="submit"
//                         className="flex w-full justify-center rounded-md bg-accent hover:bg-sky-600 font-semibold leading-6 py-2 px-3 shadow-md transition-all"
//                     >
//                         Sign Up
//                     </button>
//                     <p className="mt-6 text-center text-sm text-txt-depressed">
//                         Already have an account?{' '}
//                         <a href="/login" className="font-semibold leading-6 text-accent hover:text-sky-600">Login</a>
//                     </p>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default Signup;