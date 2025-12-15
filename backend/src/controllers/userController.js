// imports
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import asyncHandler from "express-async-handler"
import { Users } from "../models/indexModel.js"



//Log in User
const logInUser = asyncHandler( async(req, res) =>{
    const { email, password } = req.body;

    // fetch details of the user from the db
    const user = await Users.scope('withPassword').findOne({
        where: { email }
    })

    // No user or Incorrect Password
    if(!user || !(await bcrypt.compare(password, user.hashedPassword))){

        const error = new Error('Invalid Credentials')

        error.statusCode = 400;

        throw error
    }

    

    const token = jwt.sign({id: user.id, role: user.role, email: user.email}, process.env.JWT_SECRET, {expiresIn: '24h'})

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

    const userExists = await Users.findOne({
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

    const user = await Users.create({
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
const getAllUsers = asyncHandler(async(req, res) => {

    if(!req.user && req.user.role !== 'admin'){
        return res.status(401).json({
            success: false,
            message: 'Unauthorized'
        })
    }
    let { page = 1, pageSize = 10 } = req.query
    const offset = (page - 1) * pageSize
    
    const whereClause = { isDeleted: 'false'}

    const { count, rows: users } = await Users.findAndCountAll({
        where: whereClause,
        order: [['id', 'ASC']],
        limit: parseInt(pageSize),
        offset: parseInt(offset)
    })

    return res.status(200).json({
        success: true,
        data: {
            totalUsers: count,
            users: users,
            limit: parseInt(pageSize),
            offset: parseInt(offset)
        }
    })
})

//Get User by Id
const getUserById = asyncHandler( async(req, res) => {
    const id = req.params.id;

    const user = await Users.findByPk(id)

    if(!user){
        return res.status(404).json({
            success: false,
            message: 'Resource not found.'
        })
    }

    return res.status(200).json({
        success: true,
        data:{
            user
        }
    })
})

//Update User Details



//Get my Profile

//Update my profile



//Delete User





export {
    logInUser,
    createUser,
    getAllUsers,
    getUserById
}
