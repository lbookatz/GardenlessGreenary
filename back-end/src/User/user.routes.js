const express = require("express");
const { User } = require("./user.model");
const { Plant } = require("../Plant/plant.model");
const { auth } = require("../middleware");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");

userRouter.post("/", async (req, res) => {
  try {
    const token = jwt.sign({ name: req.body.name }, process.env.SECRET);
    let user = await User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      userAdmin: req.body.userAdmin,
      token: token,
    });
    user.save();
    // localStorage.setItem('MyToken', token)
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send("error in the user post function in user.routes");
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const token = jwt.sign({ name: req.body.name }, process.env.SECRET);
    const user = await User.findOne({
      name: req.body.name,
      password: req.body.password,
    });
    if (user != null) {
      user.token = token;
      user.save();
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send({ message: "User not found" });
  }
});

userRouter.post("/logout", async (req, res) => {
  try {
    await User.updateOne(
      { name: req.body.username },
      { $pull: { token: req.body.token } }
    );
    res.status(201).send("loged out");
  } catch (error) {
    res.status(500).send("failed logout");
  }
});

userRouter.post("/usersPlants", async (req, res) => {
  try {
    const usersPlantsid = await User.findOne({ name: req.body.name });
    const userPlants = await Plant.find({ _id: { $in: usersPlantsid.plants } });
    res.status(200).json(userPlants);
  } catch (error) {}
});



userRouter.get("/all", async (req, res) => {
  try {
    user = await User.find();
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ message: "User not found" });
  }
});

userRouter.get("/", auth, async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    res.status(500).send({ message: "User not found" });
  }
});

userRouter.delete("/", async (req, res) => {
  try {
    console.log(req.body.name);
    await User.deleteOne(req.body);
    res.status(200).send({ message: req.body.name + " deleted" });
  } catch (error) {
    res.status(500).send({ message: "User not found" });
  }
});

userRouter.post("/addplant", async (req, res) => {
  try {
    const plant = await Plant.findOne({ name: req.body.plantname });
    if (!plant) {
      res.status(404).send("plant dosn't exsist");
    } else {
      await User.updateOne(
        { name: req.body.username },
        { $addToSet: { plants: plant._id } }
      );
      res.status(201).send("added");
    }
  } catch (error) {}
});


userRouter.post("/addtodo", async (req, res) => {
 try { 
      await User.updateOne(
        { name: req.body.username },
        { $addToSet: { todo: {text:req.body.todo}} }
      );
      const tasks = await User.findOne({name: req.body.username }).select('todo');
    res.status(200).json(tasks);
   } catch (error) {
   
 }
});

userRouter.post("/gettodo", async (req, res) => {
  try {
    const tasks = await User.findOne({name: req.body.username }).select('todo');
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).send({ message: "User not found" });
  }
});

userRouter.post("/removetodo", async (req, res) => {
  try {
    
      await User.updateOne(
        { name: req.body.username },
        { $pull: { todo: {_id:req.body.id} } }
      );
      const tasks = await User.find({name: req.body.username });
    res.status(200).json(tasks);
  } catch (error) {}
});


userRouter.post("/removeplant", async (req, res) => {
  try {
    const plant = await Plant.findOne({ name: req.body.plantname });
    if (!plant) {
      res.status(404).send("plant dosn't exsist");
    } else {
      await User.updateOne(
        { name: req.body.username },
        { $pull: { plants: plant._id } }
      );
    }
    const usersPlantsid = await User.findOne({ name: req.body.username });
    const userPlants = await Plant.find({ _id: { $in: usersPlantsid.plants } });
    res.status(200).json(userPlants);
  } catch (error) {}
});

module.exports = {
  userRouter,
};

