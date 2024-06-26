const {Router}=require("express");
const router=Router();
const multer=require('multer')
const Blog=require("../models/blog");
const path=require('path')
const {createwebtokens}=require('../services/authentication')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(`./public/uploads`))
    },
    filename: function (req, file, cb) {
        const fileName=`${Date.now()}-${file.originalname}`
        cb(null,fileName);
    },
  })
  
  const upload = multer({ storage: storage })

router.get("/addblog",(req,res)=>{
    return res.render("addblog",{
        user:req.user,
    })
})

router.get('/:id',async (req,res)=>{
  const blog=await Blog.findById(req.params.id);
  return res.render("blog",{
    user:req.user,
    blog,
  })
});
router.get('/hoke',(req,res)=>{
  return res.render('home1');
})


router.post("/",upload.single("coverImageURL"),async (req,res)=>{
    const {title,body}=req.body;
    console.log(req.body)
    console.log(req.file)
  const blog=await Blog.create({
     body,
     title,
    
     coverImageURL:`/uploads/${req.file.filename}`,

   })

   return res.redirect("/")
})




module.exports=router;