import allowedOrigins from './allowedOrigins';

const corsOptions ={
    origin: (origin,callback)=>{
         console.log("Request from:", origin);
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null,true);
        }
        else {
            callback(new Error('cors error, not allowed'));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
}

export default corsOptions;