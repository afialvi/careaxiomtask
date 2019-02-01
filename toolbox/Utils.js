var express = require('express');
var http = require('http');
var promise = require('promise');
const cheerio = require('cheerio')


class Utils{
	constructor(){


	};


	fetchTitleFromUrlUsingPromise(url){
			var options = {
 	 			host: url,
  				port: 80
			};
		return new Promise(function(resolve, reject){
				http.get(options, function(res) {

					res.setEncoding('utf8');
      		let body = ''; 
     		 res.on('data', chunk => body += chunk);
      		res.on('end', () => {
  				const $ = cheerio.load(body);
  					var title = $("title").text();
  					console.log(url+" "+ $.text());
  					if(title.length <= 0){
  						title = " NO RESPONSE"
  						resolve({"address": url, "title": " NO RESPONSE"});
  					}
  					else{
  					resolve({"address": url, "title": "\""+title+"\""});
  					}
  			});
			}).on('error', function(e) {
  				console.log("Got error: " + e.message);
  				reject({"address": url, "title": " NO RESPONSE"});
			});
		})
		
	}


	fetchTitlesUsingPromise(urls, callback){
	
		var promises = [];
		urls.forEach(function(url){
			promises.push(this.fetchTitleFromUrlUsingPromise(url));
		}.bind(this));
		Promise.all(promises).then(function(items) {
  			items.forEach(function(item){
  				console.log("Item: "+ JSON.stringify(item));
  			});
  			callback(items);
		});

	
	}

	getTitlesUsingPromises(adresses, callback) {
		if(adresses.length > 0){

			this.fetchTitlesUsingPromise(adresses,function(items){
				callback(items);	
			});
			
		}
		else{
			callback([]);
		}
	};
}
	

module.exports = Utils;