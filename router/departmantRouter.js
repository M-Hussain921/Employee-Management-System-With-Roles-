const express=require('express');
const router=express.Router();

const {authMiddleware,isAdminOrhr,isAdmin}=require('../middleware/authMiddleware.js');
const {createDepartment,getDepartment,getDepbyId,searchBydepartment,getPublicDepartment,deleteDepartment,updateDepartment}=require('../controller/departmentController');

router.get('/all-department',authMiddleware,getDepartment);
router.get('/public-department',getPublicDepartment);
router.post('/create-department',authMiddleware,isAdminOrhr,createDepartment);
router.get('/:id',authMiddleware,isAdminOrhr,getDepbyId);
router.get('/', authMiddleware, isAdminOrhr, searchBydepartment);
router.delete('/:id',authMiddleware,isAdmin,deleteDepartment);
router.put('/:id',authMiddleware,isAdminOrhr,updateDepartment);

module.exports=router;