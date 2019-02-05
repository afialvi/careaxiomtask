var express = require('express');
var http = require('http');
var promise = require('promise');
const cheerio = require('cheerio')
var async = require("async");

class NetworkManager{
 
	fetchWebPage(url, callback){
		var options = {
 	 			host: url,
  				port: 80
			};

		http.get(options, function(res) {
  			console.log("Got response: " + res.statusCode);
  			res.setEncoding('utf8');
  			let body = ''; 
     		 res.on('data', chunk => body += chunk);
      		res.on('end', () => {
      			callback(null, body);
  			});
			}).on('error', function(e) {
  				console.log("Got error: " + e.message);
  				callback(error, null);
			}
  		);
	}

}
module.exports = NetworkManager;