const mongoose=require('mongoose');

const departmentSchema=new mongoose.Schema(
    {
        name:{type:String,required:true,unique:true},
        location:{type:String}
    },{timestamps:true}
);

departmentSchema.virtual("employees", {
  ref: "Employee",
  localField: "_id",
  foreignField: "department",
});


module.exports=mongoose.model("Department",departmentSchema);