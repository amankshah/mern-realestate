import  dotenv  from 'dotenv';

import  express  from 'express';
import mongoose from 'mongoose';

import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';

let  MongoUrl = "mongodb+srv://Aman:Aman@real-estate.uh7pqry.mongodb.net/real-estate?retryWrites=true&w=majority";

dotenv.config();
console.log("env value :" ,process.env.MONGO);

// mongoose.connect(process.env.MONGO).then(()=>{
mongoose.connect(MongoUrl).then(()=>{
    console.log('Connected to MongoDB!!');
    
}).catch((err)=> {
    console.error("Error connecting to the database", err);
});
const app = express();
app.use(express.json());

app.listen(3001, () => {
    console.log('Server is running on port 3000');
    
});

app.use('/api/user',userRouter);
app.use('/api/auth',authRouter);


//Middleware

app.use((err, req, resp, next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return resp.status(statusCode).json({
        success :false,
        statusCode,
        message,
    })
})