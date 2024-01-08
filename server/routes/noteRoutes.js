const express = require("express");
const router = express.Router();
const {
  getNotes,
  emptynotes,
} = require("../controller/notecontrol");

router.route("/quotes").get(getNotes); 
router.route(emptynotes); 

module.exports = router;