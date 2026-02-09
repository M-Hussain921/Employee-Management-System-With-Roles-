const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    name:{type:String},
    email:{type:String,require:true},
password:{type:String,require:true},
phoneNumber:{type:Number},
age:{type:Number},
role:{type:String},
department:{type:String}
});

module.exports=mongoose.model('users',userSchema);