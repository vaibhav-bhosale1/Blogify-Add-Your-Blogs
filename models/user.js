const { Schema,Model, model}=require('mongoose');
const { createHmac ,randomBytes} = require('node:crypto');
const {createwebtokens}=require('../services/authentication')



const userSchema=new Schema({
fullname:{
    type:String,
    required:true,
},
email:{
    type:String,
    required:true,
},
salt:{
  
    type:String,
   
},
password:{
    type:String,
    required:true,
},
profilephoto:{
    type:String,
    default:"/images/th.jpeg",
},
role:{
    type:String,
    enum:["USER","ADMIN"],
    default:"USER",
}

},
{timestamps:true},
)

userSchema.pre("save", function (next){
    const user=this;
    if(!user.isModified("password")) return;

      const salt=randomBytes(16).toString()
      const hashed=createHmac('sha256',salt).
                   update(user.password).
                   digest('hex');
                   this.salt=salt;
                   this.password=hashed;
                   next();
})

userSchema.static("MatchPasswordAndGenerateToken",async function(email,password){
    const user=await this.findOne({email});
    if(!user){
        throw new Error("User not found");
    } 
  
    const salt=user.salt;
    const hashedpassword=user.password;
    const userprovidedhash=createHmac('sha256',salt).   
    update(password).
    digest('hex');
    if(hashedpassword !== userprovidedhash){
        throw new Error("Incorrect password");
    }

    const token=createwebtokens(user);
    return token;
})

const User=model("user",userSchema);

module.exports=User;