const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController");

// const { checkExistingEmail } = require("../models/account-model");

router.get("/", homeController.buildHome);

router.get("/services", homeController.getAllServices);

router.get("/projects", homeController.getAllProjects);



module.exports = router;
