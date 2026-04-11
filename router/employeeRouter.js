const express = require('express');
const router = express.Router();
const { authMiddleware, isAdmin, isAdminOrhr } = require('../middleware/auth.middleware.js');
const { deleteUser,  updateEmp, getemployeebyid, getallemployee, createEmployee, searchByrole,filterbyage,totalemployees,empPerDepartment,empPerRole,updateUser,deleteEmployee, getUserbyId, editUser,createEmpFull} = require('../controller/employeeController');

router.post('/create-employee', authMiddleware, isAdminOrhr, createEmployee);
router.post('/create-employee-full',authMiddleware,isAdminOrhr,createEmpFull)
router.get('/all-employee', authMiddleware,getallemployee);
router.get('/employee-role', authMiddleware, isAdminOrhr, searchByrole);
router.get('/employee-age',authMiddleware,isAdminOrhr,filterbyage);
router.get('/total-employees',authMiddleware,isAdminOrhr,totalemployees);
router.get('/employees-per-department',authMiddleware,isAdminOrhr,empPerDepartment);
router.get('/employees-per-role',authMiddleware,isAdminOrhr,empPerRole);
router.get('/:id',authMiddleware,getUserbyId);
router.get('/employee/:id', authMiddleware, getemployeebyid);
router.put('/update-employee/:id', authMiddleware, isAdminOrhr, updateEmp);
router.put('/update/:id', authMiddleware,updateUser);
router.delete("/delete-employee/:id", authMiddleware, isAdmin, deleteEmployee);
router.delete("/delete-user/:id", authMiddleware, isAdmin, deleteUser);
router.put('/edit-user/:id',authMiddleware,editUser);

module.exports = router;