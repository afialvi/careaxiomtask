var express = require('express');
var router = express.Router();

var RequestParser = require('../Toolbox/RequestParser');
var Utils = require('../Toolbox/Utils');
var parser = new RequestParser();
var util = new Utils();
/* GET home page. */
router.get('/I/want/title/', function(req, res, next) {
  addresses = parser.getAddresses(req);
  console.log("addresses "+ addresses);
  util.getTitlesUsingBacon(addresses, function(addressTitleInfos){
  		console.log("InfosTask 2: "+ JSON.stringify(addressTitleInfos));
  		res.render('addressTitles.html', {"titlesInfos": addressTitleInfos});
  		
	});
  
});

module.exports = router;
