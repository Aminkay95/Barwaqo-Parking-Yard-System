// imports
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import asyncHandler from "express-async-handler"
import { User } from "../models/indexModel.js"



//Log in User
const logInUser = asyncHandler( async(req, res) =>{
    const { email, password } = req.body;

    // fetch details of the user from the db
    const user = await User.findOne({
        where: { email }
    })

    // No user or Incorrect Password
    if(!user || !(await bcrypt.compare(password, user.hashedPassword))){

        const error = new Error('Invalid Credentials')

        error.statusCode = 400;

        throw error
    }

    

    const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '24h'})

    res.json({ 
        success: true,
        token 
    })
})

//Create User
const createUser = asyncHandler( async(req, res) => {
    
    const {firstName, lastName, phone, email, role,  password } = req.body;



    // checking if its a valid email
    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if(!isValidEmail(email)){

        const error = new Error('Invalid Email format')
        error.statusCode = 400;
        throw error
        
    }

    // check if user exists

    const userExists = await User.findOne({
        where: {
            email: email.trim()
        }
    })

    if(userExists){

        const error = new Error('User exsts under that email')
        error.statusCode = 400;
        throw error

       
    }

    // Creating the user to the Db

    //Harshing the password

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        role: role,
        hashedPassword
    })

    res.status(201).json({
        success: true,
        message: "User created successfully"
    })

})

//Get all Users


//Get User by Id


//Update User Details


//Delete User





export {
    logInUser,
    createUser
}
