const express = require('express');
const router = express.Router();

//@ruote  GET api/profiles/test
//@desc   Tests post route
//@access Public
router.get('/test', (req,res) => res.json({msg: "Profile works"}));

module.exports = router;