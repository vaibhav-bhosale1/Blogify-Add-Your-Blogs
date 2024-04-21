const {validateToken}=require('../services/authentication')
function checkforauthentication(cookiename){
 return(req,res,next)=>{
    const tokencookievalue=req.cookies[cookiename];
    if(!tokencookievalue){
        return next();
    }
    try{
        const userpayload=validateToken(tokencookievalue);
        req.user=userpayload;
    }
    catch(error){ }
    return next();
 }
}

module.exports={
    checkforauthentication,
}