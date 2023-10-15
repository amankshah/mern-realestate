import  dotenv  from 'dotenv';

import  express  from 'express';
import mongoose from 'mongoose';

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

app.listen(3000, () => {
    console.log('Server is running on port 3000');
    
});
