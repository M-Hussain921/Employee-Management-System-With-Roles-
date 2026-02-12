const express=require('express');
const router=express.Router();

const {authMiddleware,isAdminOrhr}=require('../middleware/authMiddleware');
const {createDepartment,getDepartment,getDepbyId,searchBydepartment}=require('../controller/departmentController');

router.get('/all-department',authMiddleware,isAdminOrhr,getDepartment);
router.post('/create-department',authMiddleware,isAdminOrhr,createDepartment);
router.get('/:id',authMiddleware,isAdminOrhr,getDepbyId);
router.get('/', authMiddleware, isAdminOrhr, searchBydepartment);

module.exports=router;