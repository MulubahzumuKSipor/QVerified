const express = require("express");
const router = express.Router();
const connectController = require("../controllers/hireMeController");
// const { checkExistingEmail } = require("../models/account-model");

router.get("/connect", connectController.buildConnect);

router.get("/admin", connectController.getUser);

router.post("/connected", connectController.createUser);


// connectController.authorized,

module.exports = router;
