const express=require('express');
const mongoose=require('mongoose');
const dotenv=require('dotenv');

// const hrRouter=require('./router/hrRouter')
// const employeeRouter=require('./router/employeeRouter');
// const adminRouter=require('./router/adminRouter');
const authRouter=require('./router/authRouter');

dotenv.config();

const app=express();
app.use(express.json());

app.use('/auth',authRouter);
// app.use('/admin',adminRouter);
// app.use('/hr',hrRouter);
// app.use('/emploee',employeeRouter);

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("MongoDB is connected")
}) .catch(  err=>console.log("MongoDB connecting error",err));

app.listen(process.env.PORT,()=>console.log(`Server is running at http://localhost:${process.env.PORT}`));
