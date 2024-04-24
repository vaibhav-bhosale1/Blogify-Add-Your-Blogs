require('dotenv').config()
const express=require('express');
const path=require('path');
const mongoose=require('mongoose')
const userRoutes=require('./routers/user');
const BlogRoute=require('./routers/blog');
const  {createwebtokens,validateToken}=require('./services/authentication');
const cookieparser=require('cookie-parser');
const {checkforauthentication} = require('./middleware/authentication');
const Blog=require('./models/blog')
const port=process.env.PORT || 8008
const app=express()


mongoose.connect(process.env.MONGO_URL).
then(e=>console.log("mongodb connected"))



app.use(express.urlencoded({extended:false}));
app.set("view engine",'ejs');
app.set("views",path.resolve("./views"));



app.use("/user",userRoutes)
app.use("/blog",BlogRoute)
app.use(cookieparser());
app.use(checkforauthentication("token"));
app.use(express.static(path.resolve('./public')))

app.get("/",async (req, res)=>{
     const allBlogs=await Blog.find({});
      res.render("home",{
      user : req.user,
      blogs:allBlogs,
     });
     
});

     app.listen(port,()=>(console.log(`server started at port: ${port}`)));

