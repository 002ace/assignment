const  express =  require("express");
const  router  =  express.Router();

const  auth =  require("../controller/auth");
const authenticateToken =  require("../middleware/authMiddleware");

router.post("/user" ,authenticateToken.authenticateToken , authenticateToken.authoriseRole , auth.forUser);

module.exports = router ;