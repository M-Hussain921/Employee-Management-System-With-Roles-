const employee = require('../models/employeeModels');
const user = require('../models/userModels');

exports.getallemployee = async (req, res) => {
    try {
        const employees = await employee.find().populate('user', '-password').populate('department');
        res.json(employees);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getemployeebyid = async (req, res) => {
    try {
        const employees = await employee.findById(req.params.id).populate('user', '-password').populate('department');
        res.json(employees);
    } catch (err) {
        res.status(404).json({ message: "user not found" });
    }
};

exports.updateEmp = async (req, res) => {
    try {
        const employees = await employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(employees);
    } catch {
        res.status(404).json({ message: "User not found" });
    }
};

exports.deleteEmployee = async (req, res) => {
    try {
        const employees = await employee.findByIdAndDelete(req.params.id);
        res.json({ message: "user delete successfully", employees });
    } catch {
        res.status(404).json({ message: "user not found" });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const employees = await user.findByIdAndDelete(req.params.id);
        res.json({ message: "user delete successfully", employees });
    } catch {
        res.status(404).json({ message: "user not found" });
    }
};

exports.createEmployee = async (req, res) => {
    try {
        const employees = await employee.create(req.body);
        res.json(employees);
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
};

exports.searchByrole = async (req, res) => {
    const keyword = req.query.role;
    try {
        const employees = await user.findOne({ role: { $regex: keyword, $options: 'i' } }).populate('department');
        res.json(employees);

    } catch (err) {
        res.status(404).json({ message: err.message })
    }
};

exports.filterbyage = async (req, res) => {
    const max = parseInt((req.query.maxage));
    const min = parseInt((req.query.minage));
    try {
        const emp = await user.find({ age: { $gte: min, $lte: max } }).populate("department");
        if (!emp) return res.status(404).json({ message: "Employee Not found" })
        res.json(emp);
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

exports.totalemployees = async (req, res) => {
    try {
        const count = await employee.countDocuments();
        res.json({ "Total Employees are": count });
    } catch (err) {
        res.status(404).josn({ message: err.message });
    }
};

exports.empPerDepartment = async (req, res) => {
  const report = await employee.aggregate([
    { $group: { _id: "$department", count: { $sum: 1 } } }
  ]);
  res.json(report);
};

exports.empPerRole=async(req,res)=>{
    try{
        const report=await user.aggregate([
            {$group:{_id:"$role",count:{$sum:1}}}
        ]);
        res.json(report);
    } catch(err){
        res.status(404).json({message:err.message});
    }
};

exports.updateUser=async(req,res)=>{
    const{password,contactNumber,age}=req.body;
try{
const users=await user.findByIdAndUpdate(req.params.id,{password,contactNumber,age},{new:true});
res.json(users)
}catch(err){
    res.status(404).json({message:err.message});
}
}