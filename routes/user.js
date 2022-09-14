import express from "express";
import { genPassword, createUser, getUserByName } from "../helper.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; 

const router = express.Router();

//post method to insert user data to db
router.post("/signup",async (request,response)=>{
    const { username, password } = request.body;
    console.log(username, password);
    //db.movies.insertMany(movies)
    const isUserExist = await getUserByName(username)
    console.log(isUserExist);
    //username already exist
    if (isUserExist){
        response.status(400).send({ message : "Username already taken"});
        return;
    }
    if( !/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@!#%$]).{8,}$/g.test(password)){
        response.status(400).send({message:"password pattern does not match"})
        return;
    }
    const hashedPassword = await genPassword(password);
    const result = await createUser(username,hashedPassword)
    response.send(result)
 })

 router.post("/login",async (request,response)=> {
    const { username, password } = request.body;
    console.log(username,password);
    
    const userFromDB = await getUserByName(username)
    console.log(userFromDB);

    if(!userFromDB){
        response.status(400).send({ message: "Invalid credentials"});
        return;
    }

    const storedPassword = userFromDB.password;
    
    const isPasswordMatch = await bcrypt.compare(password,storedPassword)
    if(!isPasswordMatch){
        response.status(400).send({message: "Invalid credentials"})
        return;
    }

    const token = jwt.sign({id: userFromDB._id},process.env.SECRET_KEY)
    response.send({message: "Successful login",token:token}) 

    response.send(isPasswordMatch)
    // if( !/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@!#%$]).{8,}$/g.test(password)){
    //     response.status(400).send({message:"password pattern does not match"})
    //     return;
    // }

 })

 export const userRouter = router;  