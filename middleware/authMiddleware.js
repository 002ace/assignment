const jwt =  require("jsonwebtoken");
const User  =  require("../model/user");
require("dotenv").config();


function stringToSlug(str){
    if (!str || typeof str !== "string") return str; 
    return str.toLowerCase().replace(/ /g, "-");
}


const authenticateToken = async(req, res, next)=> {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    
    if (!token) {
        return res.status(401).json({
            message: "Access denied. No token provided.",
        });
    }
     
    try {
        // Verify the token and extract the payload
    
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.token = token;
        req.user = decoded;

        const { role } = decoded;
        const user = await User.findOne({ token });
        if (!user) {
            return res.status(401).json({ message: "Invalid token or user not found." });
        }
        req.user = user;
        req.role = role;
        next();
    } catch (err) {
        console.log(err);   
        if (err.name === "TokenExpiredError") {
            return res.status(403).json({
                message: "Access denied. Token has expired.",
            });
        }
        return res.status(403).json({
            message: "Access denied. Invalid token.",
        });
    }
}

const authoriseRole = (req, res, next) => {
    let urlRole = req.originalUrl.split("/")[2];
    const role = req.user?.role;
    const token = req.token;

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    if (urlRole===stringToSlug(role)) {
        next();
    } else {
        return res.status(403).json({
            message: "Insufficient permissions. Your role does not have access to this API.",
        });
    }
};

module.exports = { authenticateToken,authoriseRole};