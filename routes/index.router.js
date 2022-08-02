// Routes
const express = require('express');
const router = express.Router();
module.exports = router;

// contollers
const index = require("../controllers/index.controller.js")

// Public
router.get("/", (req, res) =>{ res.send("index"); });
