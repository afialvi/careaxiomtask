var express = require('express');
var http = require('http');
var promise = require('promise');
const cheerio = require('cheerio')
var async = require("async");
var network = require('../Toolbox/network');
var networkManager = new network();

class Utils{
	constructor(){

	};



	getTitleFromWebPage(body){
		const $ = cheerio.load(body);
  		var title = $("title").text();
  		return title;
	}


//////////////////// Task 1 functions////////////////////////////////

	fetchTitleFromUrl(url, callback){

			networkManager.fetchWebPage(url, function(error, body){
					var title = this.getTitleFromWebPage(body);
					if(title.length <= 0){
  						callback(" NO RESPONSE");
  					}
  					else{
  						callback(title);
  					}
			}.bind(this));
	}

	
	

	

	 fetchTitles(index, urls, addTitleDict, callback){
		if(index >= 0 && index < urls.length){
			this.fetchTitleFromUrl(urls[index], function(title){
					addTitleDict.push({"address": urls[index], "title": title});
					this.fetchTitles(index + 1, urls, addTitleDict, callback);
					console.log("Here Dict: "+ JSON.stringify(addTitleDict));
					
			}.bind(this));
		}
		else{
			callback();
		}
			
		
	}

	getTitles(adresses, callback) {
		console.log("Fetching Title Using Simple Http ........ ")
		if(adresses.length > 0){
			var addTitleDictArray = [];
			
			
			this.fetchTitles(0, adresses, addTitleDictArray, function(){
				console.log("Titles: "+ JSON.stringify(addTitleDictArray));
				callback(addTitleDictArray)
			});

			
		}
		else{
			callback([]);
		}

	}
//////////////////// Task 2 functions////////////////////////////////
getTitlesUsingAsync(addresses, callback){
			
			console.log("Fetching Title Using Async ........ ")
			async.map(addresses, function(url, cb){
					networkManager.fetchWebPage(url, function(error, body){
						if(error){
							cb(null, {"address": urls[index], "title": " NO RESPONSE"});
						}
						var title = this.getTitleFromWebPage(body);
						if(title.length <= 0){
		  					cb(null, {"address": url, "title": " NO RESPONSE"});
		  				}
		  				else{
		  					cb(null, {"address": url, "title": title});
		  				}
					}.bind(this));

					}.bind(this), function(err, results) {
		    				if(err){
		    					console.log("Error: "+JSON.stringify(err));
		    				}
		    				console.log("Results: "+results);
  							callback(results);
		    				
						});
    		
	}

//////////////////// Task 3 functions////////////////////////////////

	fetchTitleFromUrlUsingPromise(url){


		return new Promise(function(resolve, reject){

		networkManager.fetchWebPage(url, function(error, body){
			if(error){
				reject({"address": url, "title": " NO RESPONSE"});
				return
			}
			var title = this.getTitleFromWebPage(body);
			if(title.length <= 0){
  						title = " NO RESPONSE"
  			}
  			resolve({"address": url, "title": title});
  		

		}.bind(this));
		}.bind(this));
	}



	getTitlesUsingPromises(adresses, callback) {
		console.log("Fetching Title Using Promise ........ ")
		if(adresses.length > 0){

			var promises = [];
			adresses.forEach(function(url){
				promises.push(this.fetchTitleFromUrlUsingPromise(url));
			}.bind(this));
			Promise.all(promises).then(function(items) {
  				items.forEach(function(item){
  				console.log("Item: "+ JSON.stringify(item));
  			});
  				callback(items);
			});
			
		}
		else{
			callback([]);
		}
	};
}
	

module.exports = Utils;