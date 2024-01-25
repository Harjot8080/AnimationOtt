const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const verify = require("../verifyToken");
//UPDATE
router.put("/:id", verify , async (req,res) => {
    if(req.user.id === req.params.id || req.user.isAdmin){
        if(req.body.password){
            req.body.password = CryptoJS.AES.encrypt(
                req.body.password,
                process.env.SECRET_KEY
            ).toString();
        }

        try{
            const updateedUser = await User.findByIdAndUpdate(req.params.id, {$set:req.body},{ new: true });
            res.status(200).json(updateedUser);
        }catch(err){
            res.status(500).json(err);
        }
    }
    else{
        res.status(500).json("You can update only your account");
    }
})

//Delete
router.delete("/:id", verify , async (req,res) => {
    if(req.user.id === req.params.id || req.user.isAdmin){
        try{
            const updateedUser = await User.findByIdAndDelete(req.params.id);
            res.status(200).json("User deleted");
        }catch(err){
            res.status(500).json(err);
        }
    }
    else{
        res.status(500).json("You can delete only your account");
    }
})

//Get User
router.get("/find/:id", verify , async (req,res) => {
        try{
            const user= await User.findById(req.params.id);
            const { password, ...info } = user._doc;
            res.status(200).json(info);
        }catch(err){
            res.status(500).json(err);
        }
    }
)

//Get all
router.get("/", verify , async (req,res) => {
        const query = req.query.new;
        try{
            const users = await User.find();
            res.status(200).json(users);
        }catch(err){
            res.status(500).json(err);
        }
    })

    //Get all
router.get("/new", async (req,res) => {
    try{
        const users = await User.find().limit(5);
        res.status(200).json(users);
    }catch(err){
        res.status(500).json(err);
    }
})

//Get user stats
router.get("/stats", async (req, res) => {
    const today = new Date();
  const latYear = today.setFullYear(today.setFullYear() - 1);
  const monthsArray = ["January", "February", "March", "April", "May", "June", "July", "September", "October", "November", "December"];
  try {
    const data = await User.aggregate([
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

router.get("/count", async(req,res) => {
    const today= new Date();
    const lastMonth= today.setMonth(today.setMonth()-1);
    try{
        const count = await User.count();
        const monthCount= await User.aggregate([
            {$project: {month: {$month: '$createdAt'}}},
            {$match: {month: 7}}
          ]);
        const diff = count - monthCount.length;
        res.status(200).json([count, diff]);
    }catch(error){
        res.status(500).json(error);
    }
})

module.exports = router;