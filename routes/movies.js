import express from "express";
import { addMovies, deleteMovieById, getAllMovies, getMovieById, UpdateMovieById } from "../helper";

const router = express.Router();

//get movies
router.get("/",async(request,response)=>{    
    if(request.query.rating){
      request.query.rating = +request.query.rating;
    }
    console.log(request.query)
    const movie = await getAllMovies(request);
    response.send(movie);
  })

  //get movies with id
router.get("/:id",async(request,response)=>{
    const {id} = request.params;
    console.log(id)
    const movie = await getMovieById(id)
    console.log(movie)
    movie
    ?  response.send(movie)
    : response.status(404).send({message:"No movie found"});   
})

//insert new movies 
router.post("/",async (request,response)=>{
    const newMovies = request.body;
    console.log(newMovies)
    //db.movies.insertMany(movies)
    const result = await addMovies(newMovies);
    response.send(result)
 })

 //delete a movie id
 router.delete("/:id",async(request,response)=>{
    const {id} = request.params;
    console.log(id)
    const movie = await deleteMovieById(id)
    response.send(movie) 
  })
 
  router.put("/:id",async(request,response)=>{
    const UpdateMovie = request.body;
    console.log(UpdateMovie)
    const result = await UpdateMovieById(id,UpdateMovie)
    response.send(result) 
  })
  
  export const moviesRouter = router;  