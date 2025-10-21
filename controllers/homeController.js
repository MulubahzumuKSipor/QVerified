const mongodb = require("../database/database");
const homeCont = {};
const ObjectId = mongodb.ObjectId;

homeCont.buildHome = async function (req, res) {
  res.render("home", { title: "Lorem Ipsum" });
};

// Controller to handle users-related requests
homeCont.getAllServices = async function (req, res) {
  try {
    const services = await mongodb.getDb().collection("services").find().toArray();
    console.log("Fetched Services (SUCCESS):", services);
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(services);
  } catch (err) {
    console.error("Error fetching services (CATCH BLOCK):", err); // This is crucial for errors
    res.status(500).json({ error: err.message });
  }
};

homeCont.getAllProjects = async function (req, res) {
  try {
    const projects = await mongodb
      .getDb()
      .collection("projects")
      .find()
      .toArray();
    // console.log("Fetched Skills (SUCCESS):", skills);
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(projects);
    console.log(projects);
  } catch (err) {
    console.error("Error fetching skills (CATCH BLOCK):", err); // This is crucial for errors
    res.status(500).json({ error: err.message });
  }
};



module.exports = homeCont;
