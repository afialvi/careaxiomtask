var express = require('express');
class RequestParser{
	constructor(){


	};

	getAddresses(request){
		var addresses = request.query.address;
		if(addresses != undefined){
			if(Array.isArray(addresses)){
				return addresses
			}
			return [addresses]
		}
		return []
	}
}

module.exports = RequestParser