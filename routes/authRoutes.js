const  express  =  require("express");

const  router  =  express.Router();

const  auth =  require("../controller/auth");
const authenticateToken =  require("../middleware/authMiddleware")

router.post("/signup" , auth.signup);
router.post("/signin" ,auth.signin );
router.post("/logout" ,authenticateToken.authenticateToken , auth.logout);

//user details
router.get("/user" ,authenticateToken.authenticateToken , auth.getUserDetails);




module.exports =  router ; 