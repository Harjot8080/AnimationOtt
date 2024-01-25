const router = require("express").Router();
const List = require("../models/List");
const verify = require("../verifyToken");

//Add
router.post("/", verify , async (req,res) => {
   if(req.user.isAdmin){
    const newList = new List(req.body);
    try{
        const savedList = await newList.save();
        res.status(201).json(savedList);
    }catch(err){
        res.status(500).json(err);
    }
   }else{
    res.status(403).json("You are not allowed!");
   }
});

//Update
router.put("/:id", verify , async (req,res) => {
   if(req.user.isAdmin){
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
router.put("/:id", verify , async (req,res) => {
   if(req.user.isAdmin){
    try{
        await Movie.findByIdAndDelete(req.params.id);
        res.status(200).json("Movie deleted");
    }catch(err){
        res.status(500).json(err);
    }
   }else{
    res.status(403).json("You are not allowed!");
   }
});


//Get all
router.get("/all" , async (req,res) => {
    try{
        let list = [];
        list= await List.find();
        res.status(200).json(list);
    }catch(err){
        res.status(500).json(err);
    }
});

router.get("/", verify, async (req, res) => {
    const typeQuery = req.query.type;
    const genreQuery = req.query.genre;
    let list = [];
    try {
      if (typeQuery) {
        if (genreQuery) {
          list = await List.aggregate([
            { $sample: { size: 10 } },
            { $match: { type: typeQuery, genre: genreQuery } },
          ]);
        } else {
          list = await List.aggregate([
            { $sample: { size: 10 } },
            { $match: { type: typeQuery } },
          ]);
        }
      } else {
        list = await List.aggregate([{ $sample: { size: 10 } }]);
      }
      res.status(200).json(list);
    } catch (err) {
      res.status(500).json(err);
    }
  });


module.exports = router;