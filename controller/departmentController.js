const department =require('../models/departmentModels');

exports.createDepartment=async(req,res)=>{
    try{
const departments=await department.create(req.body);
res.json(departments);
    }catch(err){
        res.status(400).json({message:err.message});
    }
};

exports.getDepartment=async(req,res)=>{
    try{
const departments=await department.find();
res.json(departments);
    } catch(err){
        res.status(404).json({message:err.message});
    }
};

exports.getDepbyId=async(req,res)=>{
    try{
const dep=await department.findById(req.params.id);
res.json(dep);
    }catch(err){
        res.status(404).json({message:err.message});
    }
}

exports.searchBydepartment = async (req, res) => {
    const keyword = req.query.name;
    try {
        const employees = await department.find({ name: { $regex: keyword, $options: 'i' } });
        res.json(employees);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};