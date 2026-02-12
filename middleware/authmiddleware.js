const jwt = require('jsonwebtoken');

exports.authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer"))
        return res.status(401).json({ message: "No Token Provided" })
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.User = decoded;
        next();
    } catch {
        res.status(401).json({ message: "Invalid or expried token" });
    }
};

exports.isAdmin=(req,res,next)=>{
    if(req.User.role!=="admin"){
        return res.status(403).json({message:"only admin can delete users"});
    }
    next();
};

exports.isAdminOrhr=(req,res,next)=>{
    if(req.User.role!=="admin"&&req.User.role!=="hr"){
        return res.status(403).json({message:"only admin and hr can update user"});
    }
    next();
};