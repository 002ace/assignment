const  User =  require("../model/user");
const jwt  =  require("jsonwebtoken");
const bcrypt =  require("bcrypt")
require("dotenv").config();

const signup  =  async(req ,  res) =>{
      try
      {   
           const {email , password ,role} =  req.body ;
           if(!email || !password)
           {
                return res.status(400).json({
                       success:false,
                       message:"all field are required"
                })
           }

           const existingUser  =  await  User.findOne({email})

           if(existingUser)
           {  
                return res.status(409).json({
                       success:false,
                       message:"User is already exist please signin"
                })
             
           }

           const hashPassword  =  await bcrypt.hash(password , 10)

           const  user =  await  User.create({email , password:hashPassword , role}) ;

           return res.status(200).json({
                  success:true,
                  message:"Signup  successfully",
                  data:user

           })

      }
      catch(error){
              return res.status(500).json({
                  success:false,
                  message:"failed to signup",
                  error:error.message
           })

      }
}


const  signin =  async(req , res)=>{
 try {
    let password = req.body.password;
    let email = req.body.email;
    let user = await User.findOne({email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
   

    if (await bcrypt.compare(password , user.password)) {
      let userDetails = user.toObject();
      delete userDetails.token;
      delete userDetails.password;

      const token = jwt.sign(userDetails,process.env.JWT_SECRET, {
        expiresIn:process.env.expiresIn
      });
      user.token = token;
      await user.save();

      return res
        .status(200)
        .json({
          message: "Login succesfully",
          token,
          data: userDetails,
        });
    } else {
      return res.status(400).json({ message: "Password did not match" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ 
        message: "Failed to login", 
        error: err.message 
    });
  }

}


const logout  =  async(req,res)=>{
   try {
    let userId = req.user._id;
    await User.findByIdAndUpdate(userId, { token: null });
    return res.status(200).json({ message: "User logged out successfully" });
  } catch {
    return res
      .status(500)
      .json({ message: "failed to logout", error: err.message });
  }
}

const getUserDetails = async(req, res) => {
  try {
    let userId = req.user._id;
    const details = await User.findById(userId).select(" -token -password");
    if (details.length === 0) {
      return res.status(404).json({ message: "Details not found" });
    }

    return res
      .status(200)
      .json({ message: "UserDetails  fetch successfully", data: details });
  } catch(error) {
    return res.status(500).json({ message: "Failed to get info", error: error.message });
  }
}


const getAllUser  =  async(req , res) =>{
     try
     {  
         const  userDetails  =  await User.find({ role: { $ne: "admin" } }).select("email role");
         return  res.status(200).json({
               success:true,
               message:"User  details  fetch  successfully || This is  protected route for admin",
               data:userDetails
         })

     }
     catch(error)
     {   
        return res.status(500).json({ message: "Failed to get info || this route for admin", error: error.message });
     }
}


const  forUser  =   async(req ,res)=>{
  try{ 
       return res.status(200).json({
             success:true,
             message:"This is protected route for user "
       })

  }
  catch(error)
  {  
       return  res.status(500).json({
            message: "internal server error || this route  for user", 
            error: error.message
       })

  }
}

module.exports = {signin , signup , logout , getUserDetails , getAllUser , forUser};

