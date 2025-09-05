const mongoose =  require("mongoose");

require("dotenv").config();

const dbConnect = ()=>{
      mongoose.connect(process.env.MONGODB_URL)
      .then(()=>{console.log("db connected successfully")})
      .catch((error)=>{
        console.log(error) ;
        console.log("failed to connected db")
         
      })
}

module.exports  =  dbConnect ;


