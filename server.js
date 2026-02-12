const express=require('express');
const mongoose=require('mongoose');
const dotenv=require('dotenv');

const employeeRouter=require('./router/employeeRouter');
const authRouter=require('./router/authRouter');
const departmentRouter=require('./router/departmantRouter');

dotenv.config();

const app=express();
app.use(express.json());

app.use('/auth',authRouter);
app.use('/user',employeeRouter);
app.use('/department',departmentRouter);

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("MongoDB is connected")
}) .catch(  err=>console.log("MongoDB connecting error",err));

app.listen(process.env.PORT,()=>console.log(`Server is running at http://localhost:${process.env.PORT}`));
