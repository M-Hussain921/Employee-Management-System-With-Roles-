const express = require('express');
const router = express.Router();
const { authMiddleware, isAdmin, isAdminOrhr } = require('../middleware/authMiddleware');
const { deleteuser, updateuser, getemployeebyid, getallemployee, createEmployee, searchByrole} = require('../controller/employeeController');

router.post('/create-employee', authMiddleware, isAdminOrhr, createEmployee);
router.get('/all-employee', authMiddleware, isAdminOrhr, getallemployee);
router.get('/employee/:id', authMiddleware, getemployeebyid);


router.get('/role-employee', authMiddleware, isAdminOrhr, searchByrole);
router.put('/update-user/:id', authMiddleware, isAdminOrhr, updateuser);
router.delete("/delete-user/:id", authMiddleware, isAdmin, deleteuser);

module.exports = router;