const employee = require('../models/employeeModels');
const user = require('../models/userModels');
const { sendEmail, getWelcomeTemplate } = require('../utils/Email');
const bcrypt = require('bcrypt');


exports.createEmpFull = async (req, res) => {
    const { name, email, password, phoneNumber, age, salary, designation, department } = req.body;
    try {
        const isUser = await user.findOne({ email });
        if (isUser) return res.status(400).json({ message: "user already exist" });

        const generateTempPassword = () => {
            return Math.random().toString(36).slice(-8);
        }
        const tempPassword = generateTempPassword();
        const hashedPassword = await bcrypt.hash(tempPassword, 10)

        const newUser = await user.create({
            name,
            email,
            password: hashedPassword,
            phoneNumber,
            age
        });

        const newEmployee = await employee.create({ user: newUser._id, department, designation, salary });

        const populatedEmp = await employee.findById(newEmployee._id).populate("department");

        await sendEmail(
            email,
            "Welcome to Company",
            getWelcomeTemplate(name, populatedEmp.department.name, designation,tempPassword)
        );

        res.status(200).json({
            message: "Employee created successfully",
            data: newEmployee
        });
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

exports.editUser = async (req, res) => {
    try {
        const { name, email, phoneNumber, age } = req.body;
        const U = await user.findByIdAndUpdate(req.params.id, { name, email, phoneNumber, age }, { new: true });
        if (!U) return res.status(404).json({ message: "User not found" });
        res.status(200).json({ message: "user updated successfully", data: U });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getUserbyId = async (req, res) => {
    try {
        const User = await user.findById(req.params.id).select("-password").populate('Employee');
        if (!User) return res.status(404).json({ message: "user Not found" });

        res.json({ User });
    } catch (err) {
        res.status(400).json({ message: err.message })
    };
}

exports.getallemployee = async (req, res) => {
    try {
        const employees = await employee.find().populate('user', '-password').populate('department');
        if (!employees) return res.status(404).json({ message: "user Not found" });

        res.json(employees);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getemployeebyid = async (req, res) => {
    try {
        const employees = await employee.findOne({ user: req.params.id }).populate('user', '-password').populate('department');
        if (!employees) return res.status(404).json({ message: "user Not found" });
        res.json({ data: employees });
    } catch (err) {
        res.status(500).json({ message: "server error" });
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
        const employees = await employee.findById(req.params.id);
        if (!employees) return res.status(404).json({ message: "Employee Not Found" });

        if (employees.isDeleted) return res.status(404).json({ message: "Employee Deleted" });

        employees.isDeleted = true;
        employees.deletedAt = new Date();

        await employees.save();

        res.json({ message: "Employee delete successfully", employees });

    } catch {
        res.status(404).json({ message: "user not found" });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const User = await user.findById(req.params.id);

        if (!User) return res.status(404).json({ message: "User Not Found" });

        if (User.isDeleted) return res.status(404).json({ message: "User Deleted" });

        User.isDeleted = true;
        User.deletedAt = new Data();

        await User.save();

        res.json({ message: "User delete successfully", User });

    } catch {
        res.status(404).json({ message: "user not found" });
    }
};


exports.deleteEmployee = async (req, res) => {
    try {
        const employees = await employee.findById(req.params.id);
        if (!employees) return res.status(404).json({ message: "Employee Not Found" });

        if (!employees.isDeleted) return res.status(404).json({ message: "Employee Active" });

        employees.isDeleted = false;
        employees.restoredAt = new Date();

        await employees.save();

        res.json({ message: "Employee restored successfully", employees });

    } catch {
        res.status(404).json({ message: "user not found" });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const User = await user.findById(req.params.id);

        if (!User) return res.status(404).json({ message: "User Not Found" });

        if (!User.isDeleted) return res.status(404).json({ message: "User Active" });

        User.isDeleted = false;
        User.restoredAt = new Date();

        await User.save();

        res.json({ message: "User restored successfully", User });

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

exports.empPerRole = async (req, res) => {
    try {
        const report = await user.aggregate([
            { $group: { _id: "$role", count: { $sum: 1 } } }
        ]);
        res.json(report);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

exports.updateUser = async (req, res) => {
    const { name, email, phoneNumber } = req.body;
    try {
        const users = await user.findByIdAndUpdate(req.params.id, { name, email, phoneNumber }, { new: true });
        res.json(users)
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}