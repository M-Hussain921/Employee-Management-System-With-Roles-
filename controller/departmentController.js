const dep = require('../models/departmentModels');

exports.createDepartment = async (req, res) => {
    try {
        const departments = await dep.create(req.body);
        res.json(departments);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getDepartment = async (req, res) => {
    try {
        const departments = await dep.find();
        res.json(departments);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

exports.getDepbyId = async (req, res) => {
    try {
        const department = await dep.findById(req.params.id);
        res.json(department);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

exports.searchBydepartment = async (req, res) => {
    const keyword = req.query.name;
    try {
        const department = await dep.findOne({ name: { $regex: keyword, $options: 'i' } }).populate('employees');
        if (!dep) return res.status(404).json({ message: "Department Not Found" });
        res.status(200).json({ message: department.employees.length === 0 ? "No employees in this department" : "Employees fetched successfully", department });
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

exports.updateDepartment=async(req,res)=>{
    try{
const department=await dep.findByIdAndUpdate(req.params.id,req.body,{new:true});
res.json(department);
    }catch(err){
        res.status(404).json({message:err.message});
    }
}

exports.deleteDepartment=async(req,res)=>{
    try{
        const department =await dep.findByIdAndDelete(req.params.id);
        res.json({message:"Department Delete Successfully",department})
    } catch(err){
res.status(404).json({message:err.message})
    };
};