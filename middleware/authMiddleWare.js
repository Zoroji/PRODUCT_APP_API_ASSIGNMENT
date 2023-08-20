const jwt  = require("jsonwebtoken");


const authMiddleWare = (req,res,next)=>{

        const token = req.headers.authorization;
       
          console.log("token in header:"+token);
        if(!token){ return res.status(401).json({message:"token not avaliable "})}

      try {

        const decodedToken = jwt.verify(token.split(" ")[1],"A-very-secret-key-do-not-share");
     
        req.user = decodedToken;

        next();
        
      } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
      }
}

module.exports = authMiddleWare;

