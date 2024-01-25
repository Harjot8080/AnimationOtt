const router = require("express").Router();
const { query } = require("express");
const Movie = require("../models/Movie");
const verify = require("../verifyToken");
var mongoose = require('mongoose');


//Add
router.post("/", verify , async (req,res) => {
    const newMovie = new Movie(req.body);
   try{
        const savedMovie = await newMovie.save();
        res.json(savedMovie);
    }catch(err){
        res.status(500);
    }
   });

//Update
router.put("/:id", verify , async (req,res) => {
   if(req.users.isAdmin){
    try{
        const updatedMovie = await Movie.findByIdAndUpdate(
            req.params.id, {$set: req.body}, {new: true}
        );
        res.status(200).json(updatedMovie)
    }catch(err){
        res.status(500).json(err);
    }
   }else{
    res.status(403).json("You are not allowed!");
   }
});

//delete
router.delete("/:id", verify , async (req,res) => {
    try{
        await Movie.findByIdAndDelete(req.params.id);
        res.status(200).json("Movie deleted");
    }catch(err){
        res.status(500).json(err);
    }
});

//Search
router.get("/search/:name" , async (req,res) => {
  let query = req.params.name ;
    
    try{
        const movie= await Movie.find({
          // "title": {$regex: /^N/i}
          "title": {$regex: new RegExp(`^${query}`,'i')}

        });
        res.status(200).json(movie);
    }catch(err){
        res.status(500).json(err);
}});

//Get all
router.get("/" , async (req,res) => {
    try{
        const movie= await Movie.find();
        res.status(200).json(movie);
    }catch(err){
        res.status(500).json(err);
}});

router.get("get/:type/:genre", async (req, res) => {
  let type = false;
   if (req.params.type == "series"){
    type = true;
   }
   console.log(type+ " "+req.params.type);
  let genre = req.params.genre;
  try{
    const movie= await Movie.find({
      "isSeries": type , 
      "genre": genre  },
    );
    res.status(200).json(movie);
  }catch(err){
    res.status(500).json(err);

    }
} )

//Get by id
router.get("/id/:id" , async (req,res) => {
    try{
        const movie= await Movie.findById(req.params.id);
        res.status(200).json(movie);
    }catch(err){
        res.status(500).json(err);
    }
});


//GET RANDOM
router.get("/random", async (req, res) => {
  const type = req.query.type;
  console.log(type);
  let movie;
  try {
    if (type === "series") {
      movie = await Movie.aggregate([
        { $match: { isSeries: true } },
        { $sample: { size: 1 } },
      ]);
    } else {
      movie = await Movie.aggregate([
        { $match: { isSeries: false } },
        { $sample: { size: 1 } },
      ]);
    }
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/movieCount", async(req,res) => {
  const today= new Date();
  const lastMonth= today.setMonth(today.setMonth()-1);
  try{
      const count = await Movie.count();
      const monthCount= await Movie.aggregate([
          {$project: {month: {$month: '$createdAt'}}},
          {$match: {month: 7}},
          {$match: {isSeries: false}}
        ]);
      const diff = count - monthCount.length;
      res.status(200).json([count, diff]);
  }catch(error){
    res.status(500).json(error);
  }
})

router.get("/seriesCount", async(req,res) => {
  const today= new Date();
  const lastMonth= today.setMonth(today.setMonth()-1);
  try{
      const count = await Movie.count({isSeries: true});
      const monthCount= await Movie.aggregate([
          {$project: {month: {$month: '$createdAt'}}},
          {$match: {month: 7}},
          {$match: {isSeries: true}}
        ]);
      const diff = count - monthCount.length;
      res.status(200).json([count, diff]);
  }catch(error){
      res.status(500).json(error);
  }
})


//Get movie stats
router.get("/movieStats", async (req, res) => {
  const today = new Date();
const latYear = today.setFullYear(today.setFullYear() - 1);
const monthsArray = ["January", "February", "March", "April", "May", "June", "July", "September", "October", "November", "December"];
try {
  const data = await Movie.aggregate([
    {$match: {isSeries: false}},
    {
      $project: {
        month: { $month: "$createdAt" },
      },
    },

    {
      $group: {
        _id: "$month",
        total: { $sum: 1 },
      },
    },
  ]);
  res.status(200).json(data);
} catch (err) {
  res.status(500).json(err);
}
})


//Get series stats
router.get("/seriesStats", async (req, res) => {
  const today = new Date();
const latYear = today.setFullYear(today.setFullYear() - 1);
const monthsArray = ["January", "February", "March", "April", "May", "June", "July", "September", "October", "November", "December"];
try {
  const data = await Movie.aggregate([
    {
      $project: {
        month: { $month: "$createdAt" },
        isSeries: true
      },
    },
    {
      $group: {
        _id: "$month",
        total: { $sum: 1 },
      },
    },
  ]);
  res.status(200).json(data);
} catch (err) {
  res.status(500).json(err);
}
})

module.exports = router;