//pic1.js

const fs = require('fs');
const colors = require('colors/safe');
const util = require("util");
const path = require('path');
const url = require('url'); 
const request = require('request-promise');
const express = require('express');
const app = express();

const parentDir = path.normalize(__dirname + "/..");


const testFolder = './public/pic1';

app.get('/listfiles', function(req, res) {
	fs.readdir(testFolder, (err, files) => {
		/*
	  files.forEach(file => {
	    console.log(colors.green(`${file}`));
	  });
	  */
	  res.status(200).send(files);	  
	});
})

module.exports = app;