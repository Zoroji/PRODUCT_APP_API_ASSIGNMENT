const express = require("express");
const users = require("../models/userSchema");
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

router.post("/register", async(req, res) => {
    
    try {
           const {username,password} = req.body;

           const prevUser = await users.findOne({username});
           if(prevUser){
            return res.json({messgae:"username already exist"})
           }

           const hashpassword = await bcrypt.hash(password,10);

           await users.create({ username,
            password:hashpassword});

            res.status(200).json({message:"user registered succesfully"});

    } catch (error) {
        console.log(error);
        res.status(500).json({messgae:"internal server error"})
    }
    
});
/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Username of the user
 *               password:
 *                 type: string
 *                 description: Password of the user
 *             required:
 *               - username
 *               - password
 *     responses:
 *       '200':
 *         description: User registered successfully
 *       '400':
 *         description: Bad request
 *       '409':
 *         description: Username already exists
 *       '500':
 *         description: Internal server error
 */


router.post("/login",async(req,res)=>{

    try {
        
        const {username,password} = req.body;
        
        const validUser = await users.findOne({username});

        if(!validUser){
         return   res.status(401).json({message:"Invalid username"})
        }

        const validPassword = await bcrypt.compare(password,validUser.password);

        if(!validPassword)
        {
            return res.status(401).json({message:"Incorrect credentials"})
        }

        const token = jwt.sign({username:users.username},"A-very-secret-key-do-not-share")

        res.status(200).json({messgae:"Login successfully",token})


    } catch (error) {
        console.log(error);
        res.status(500).json({messgae:"internal server error"})
    }

})
/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: User login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Username of the user
 *                 default: kingKong
 *               password:
 *                 type: string
 *                 description: Password of the user
 *                 default: 123456
 *             required:
 *               - username
 *               - password
 *     responses:
 *       '200':
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login successfully
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImtpbmdLb25nIiwiaWF0IjoxNjkyNTM0ODc0fQ.SJbGcduGUpTmEq9jUBMT0iWYNShI5Jz7l6bs3pjjOkE
 *       '401':
 *         description: Invalid username or incorrect credentials
 *       '500':
 *         description: Internal server error
 */




module.exports = router;
