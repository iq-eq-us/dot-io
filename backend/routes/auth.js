import userModel from "../models/user.js";
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import otpModel from "../models/verificationCode.js";

const router = express.Router();

router.post('/login',async (request, response) => {
    try {
        const {email, password } = request.body
        if(!email || !password) {
            return response.status(400).json({
                message: "Please Provide the correct username and password combination."
            });
        } 
        const user = await userModel.findOne({email})
        if(!user){
            return response.status(404).json({
                message: "Email not found"
            });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(!isPasswordValid){
            return response.status(401).json({
                message: "Wrong password"
            });
        }
        const token = jwt.sign({userId: user._id}, 'secretkey', '7d');
        return response.status(200).json({
            message: "Login Successful", token
        });

    } catch (error) {
        return response.status(400).json({
            message: error.message
        });
    }
    
})

router.post('/register',async (request, response) => {
    try {
        const {email, password, userName, firstName, lastName } = request.body
        if(!email || !password || !userName) {
            return response.status(400).json({
                message: "Please Provide the correct email, username and password combination."
            });
        } 
        const user = await userModel.findOne({email})
        if(user){
            return response.status(404).json({
                message: "Email already exist"
            });
        }
        const salt = await bcrypt.genSalt(10);
        const hasedPassword = await bcrypt.hash(password, salt);
        const newUser = await userModel.create({
            email, firstName, lastName, userName, password: hasedPassword
        })
        const token = jwt.sign({userId: newUser._id}, 'secretkey', '7d');
        return response.status(200).json({
            message: "You're now Registered!",
            token
        });


    } catch (error) {
        return response.status(400).json({
            message: error.message
        });
    }
    
})
router.post('/resetPassword',async (request, response) => {
    try {
        const {email} = request.body
        if(!email) {
            return response.status(400).json({
                message: "Please enter a valid email address"
            });
        } 
        const user = await userModel.findOne({email})
        if(!user){
            return response.status(404).json({
                message: "No user exist with the given email."
            });
        }
        const random = Math.floor(Math.random() * 899999) + 100000;
        const salt = await bcrypt.genSalt(10);
        const hashedOtp = await bcrypt.hash(random, salt)

        console.log('send OTP to the user :' + random)

        //need to use a service sendGrid 
        const newOTP = await otpModel.create({userId: user._id, otp:  hashedOtp} )
        return response.status(200).json({
            message: "OTP has been sent to your email"
        });

    } catch (error) {
        return response.status(400).json({
            message: error.message
        });
    }
    
})

router.post('/retrieveNewPassword',async (request, response) => {
    try {
        const {email, newPassword, otp} = request.body
        if(!email || !newPassword || !otp) {
            return response.status(400).json({
                message: "Please provide all required fields"
            });
        } 
        const user = await userModel.findOne({email})
        if(!user){
            return response.status(404).json({
                message: "No user exist with the given email."
            });
        }
        //Checking if the OTP exist in the verification table
        const findOtp = await otpModel.findOne({userId: user._id})
        if(!findOtp){
            return response.status(400).json({
                message: "Session expired"
            });
        }
        //If otp exisit we are comparing the string stored in the db to the string sent to us
        const isOtpValid = await bcrypt.compare(otp, findOtp.otp)
        if(!isOtpValid) {
            return response.status(400).json({
                message: "Incorrect Otp"
            });
        }
        const salt = await bcrypt.genSalt(10);
        //Hasing the new password
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        //Here we are updating the password in the db to the new password and return the updated object
        const updatedUser = await userModel.findByIdAndUpdate(user._id, {password: hashedPassword}, {new: true})
        return response.status(200).json({
            message: "Password updated Successfully!"
        });
       
    } catch (error) {
        return response.status(400).json({
            message: error.message
        });
    }
    
})

export default router

