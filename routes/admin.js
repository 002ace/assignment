const  express =  require("express");
const  router  =  express.Router();

const  auth =  require("../controller/auth");
const authenticateToken =  require("../middleware/authMiddleware");


//protected route for admin
router.get("/details" ,authenticateToken.authenticateToken ,authenticateToken.authoriseRole,auth.getAllUser);

module.exports = router ;

