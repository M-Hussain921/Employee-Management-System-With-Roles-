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

exports.updateuser = async (req, res) => {
    try {
        const employees = await employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(employees);
    } catch {
        res.status(404).json({ message: "User not found" });
    }
};

exports.deleteuser = async (req, res) => {
    try {
        const employees = await employee.findByIdAndDelete(req.params.id);
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

exports.filterbyage=async(req,res)=>{
    const max=parseInt((req.query.maxage));
    const min=parseInt((req.query.minage));
    try{
const emp=await user.find({age:{$gte:min,$lte:max}}).populate("department");
if(!emp) return res.status(404).json({message:"Employee Not found"})
res.json(emp);
    }catch(err){
        res.status(400).json({message:err.message})
    }
}

