// backend/config/corsOptions.js
require('dotenv').config();

// Split the ALLOWED_ORIGINS environment variable into an array
const allowedOrigins = process.env.ALLOWED_ORIGINS.split(',');

const corsOptions = {
    origin: (origin, callback) => {
        // If origin is not defined (i.e., same-origin request or request from backend)
        if (!origin) {
            // Allow same-origin requests (useful during local development)
            callback(null, true);
        } else if (allowedOrigins.indexOf(origin) !== -1) {
            // If the origin is in the allowedOrigins list
            callback(null, true);
        } else {
            // Reject CORS if origin is not allowed
            callback(new Error('CORS not allowed for this origin'));
        }
    },
    credentials: true,  // Allow cookies to be sent with requests
    optionsSuccessStatus: 200  // For legacy browsers that require a status other than 204
};

module.exports = corsOptions;






// require('dotenv').config()

// // Split the ALLOWED_ORIGINS variable from the .env file into an array
// const allowedOrigins = process.env.ALLOWED_ORIGINS.split(',');

// const cors = require('cors');

// const corsOptions = {
//     origin: 'http://localhost:5173',  // Frontend origin for React Vite
//     credentials: true,  // Allow cookies to be sent/received
//     optionsSuccessStatus: 200 // Some legacy browsers choke on 204
// };

// app.use(cors(corsOptions));
// module.exports = corsOptions;





// require('dotenv').config()

// const allowedOrigins = process.env.ALLOWED_ORIGINS.split(',')

// const corsOptions = {
//     origin: (origin, callback) => {
//         if(allowedOrigins.indexOf(origin) !== -1) {
//             callback(null, true)
//         } else {
//             callback(new Error('CORS not allowed'))
//         }
//     },
//     credentials: true,
//     optionsSuccessStatus: 200
// }

// module.exports = corsOptions