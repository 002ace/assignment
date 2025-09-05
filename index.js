const express =  require("express");
const dbConnect =  require("./config/dbConnect");

const  app =  express() ;
app.use(express.json()) ; 
const  auth =  require("./routes/authRoutes");
const  admin =  require("./routes/admin");
const  user  =  require("./routes/user")
app.use("/auth" , auth)
app.use("/api/admin" , admin);
app.use("/api/user", user) ;


const  PORT  = 4000 ;

dbConnect()
app.get("/healthcheck", (req, res) => {
  res.status(200).json({ status: "ok" });
})
app.listen(PORT , ()=>{
     console.log("server  started successfully");
})




