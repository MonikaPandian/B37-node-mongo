// const express = require('express');
// const {MongoClient} = require('mongodb')

import express from "express";
import { MongoClient } from "mongodb";
import dotenv from 'dotenv';
import { getAllMovies, addMovies, getMovieById, deleteMovieById,UpdateMovieById} from './helper.js';
import { moviesRouter} from './routes/movies.js';

dotenv.config()

const app= express();
const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

async function createConnection(){
  const client = new MongoClient(MONGO_URL)
  await client.connect();
  console.log("Mongo is connected")
  return client;
}

export const client = await createConnection();

app.use(express.json())

app.get("/",(request,response)=>{
    response.send("Hello Everyone")
})

//specify movie router

app.use('/movies',moviesRouter)

//create a server
app.listen(PORT,()=>console.log("server started on port",PORT));