const { Schema,Model, model}=require('mongoose');


const blogSchema=new Schema({
title:{
    type:String,
    required:true,
},
body:{
    type:String,
    required:true,
},
coverImageURL:{
    type:String,
    requird:false,
},
createdby:{
    type:Schema.Types.ObjectId,
    ref:"user",
  
},
},
{timestamps:true}
)

const Blog=model("blogs",blogSchema);

module.exports=Blog;