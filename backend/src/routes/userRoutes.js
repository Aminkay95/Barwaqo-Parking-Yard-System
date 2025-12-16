// Imports
import express from "express"
import { logInUser, createUser, getAllUsers, getUserById } from "../controllers/userController.js";
import { authMiddleware, isAdmin } from "../middlewares/authMiddleware.js";

//instantiate router
const router = express.Router()

//login
router.route('/login').post(logInUser)

// '/'
router.route('/')
.get(authMiddleware, isAdmin, getAllUsers ) // Get All users
.post(createUser) // Create User




//Get User Admin
router.route('/:id')
.get(authMiddleware, isAdmin, getAllUsers  ) // Get User by ID 
.patch(authMiddleware, isAdmin, getUserById  ) //Update User 


// Get User Authenticated User
router.route('/me')
.get(authMiddleware, ) //Get User Details
.patch(authMiddleware, ) //Update User Details

//Soft delete User

export default router
