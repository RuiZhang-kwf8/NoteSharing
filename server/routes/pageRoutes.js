const express = require("express");
const router = express.Router();
const {
    controlpages, 
    postpagecontrol, 
    deletepagecontrol
} = require("../controller/pagecontrol");

router.route("/posts/:id").get(controlpages); 
router.route("/pagepost/:id").post(postpagecontrol);
router.route("/deleteditems/:id").delete(deletepagecontrol);

module.exports = router;