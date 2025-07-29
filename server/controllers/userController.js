import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const registerUser = async (req, res) => {
    try{
        const {name,email,password} = req.body;
        if(!name || !email || !password){
            return res.json({success: false, message : "Missing Credentials"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const userData = {
            name,
            email,
            password : hashedPassword
        }

        const newUser = new userModel(userData)
        const user = await newUser.save()

        const token = jwt.sign({id:user._id},process.env.SECRET_KEY)
        res.json({success:true,token,user:{name:user.name, email:user.email}})
    }
    catch(error){
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

const loginUser = async (req,res) => {
    try {
        const {email, password} = req.body
        const user = await userModel.findOne({email})

        if(!user){
            return res.json({success:false, message:"User does not exist"})
        }

        const isMatch = await bcrypt.compare(password,user.password)

        if(isMatch){
            const token = jwt.sign({id:user._id}, process.env.SECRET_KEY)
            res.json({success:true, token, user:{name:user.name, email:user.email}})
        }
        else{
            return res.json({success:false, message:"Invalid Credentials"})
        }
    } catch (error) {
        console.log(error)
        res.json({success:false, message : error.message})
    }
}

const verifyUser = async (req, res) => {
    try {
        const userId = req.body.userId;
        if (!userId) {
            return res.json({ success: false, message: "User ID not found" });
        }

        const user = await userModel.findById(userId).select('-password');
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        res.json({ 
            success: true, 
            user: { 
                name: user.name, 
                email: user.email 
            } 
        });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export {registerUser, loginUser, verifyUser}