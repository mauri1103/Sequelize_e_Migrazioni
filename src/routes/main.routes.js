const customEnv = require('custom-env');
customEnv.env(true);
const express = require('express');
const {findAllByFilter} = require('../controllers/student.controller');

const router = express.Router();

router.get('/v1/ranking', findAllByFilter);


/*
* TODO: Curl per post man
*  curl --location 'http://localhost:3000/api/v1/ranking'
* */
module.exports = router;
