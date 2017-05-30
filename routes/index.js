var express = require('express');
var router  = express.Router();
var fs 		= require('fs');

router.get('/sodhs/trail', function(request, res) {
	var filename = "./public/trail.geojson";
    fs.readFile(filename, function (err, data) {
		if (err) {console.log("Could not open photos trail"+ err);} 
		else { res.send( data ); };	}); });
		
router.get('/sodhs/trailpath', function(request, res) {
	var filename = "./public/trailpath.geojson";
    fs.readFile(filename, function (err, data) {
		if (err) {console.log("Could not open trailpath"+ err);} 
		else { res.send( data ); };	}); });
		
router.get('/sodhs/map', function(req, res, next) {
	var filename = "./public/Stretton_OS1905.jpg";
	fs.readFile(filename, function (err, data) {
		if (err) {console.log("Could not open 1905 map"+ err); } 
		else { res.send( data ); };});});
		
router.get('/photo', function(request, res) {
	var filename = "./public/photos/" + request.query.id + ".jpg";
    fs.readFile(filename, function (err, data) {
		if (err) {console.log("Could not open photos"+ err);} 
		else {res.send( data );};});});

module.exports = router;
