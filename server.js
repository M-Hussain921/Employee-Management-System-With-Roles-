const express=require('express');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
const cors =require('cors');
const path = require("path");


const employeeRouter=require('./router/employeeRouter');
const authRouter=require('./router/authRouter');
const departmentRouter=require('./router/departmantRouter');

dotenv.config();

const app=express();
app.use(express.json());
app.use(cors());

app.use(
  cors({
    origin: "*",
  })
);

app.use("/images", express.static(path.join(__dirname, "public/images")));

app.get("/api/forms-page-image", (req, res) => {
  res.json({
    image: `${req.protocol}://${req.get("host")}/images/forms-page-bg.jpg`
  });
});

app.use('/api/auth',authRouter);
app.use('/api/user',employeeRouter);
app.use('/api/department',departmentRouter);

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("MongoDB is connected")
}) .catch(  err=>console.log("MongoDB connecting error",err));

const PORT=process.env.PORT||8000;

app.listen(PORT,()=>console.log(`Server is running on${PORT}`));
