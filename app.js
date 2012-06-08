var url = require('url'),
  querystring = require('querystring'),
  http = require('http'),
  scraper = require('scraper');

var hotspots = {
  cartel: {
    check: function ($) {
      if ($("title").html().toLowerCase().indexOf("cartel") != -1) {
        return true;
      }
      return false;
    },
    credentials: {
      auth_user: "cartel",
      auth_pass: "cartel",
      redirurl: "http://google.com/",
      accept: "Continue"
    },
    postOptions: {
      path: "/"
    }
  }
};

function checkForRedirect () {
  var checkOptions = {
  	host: "s3.amazonaws.com",
  	path: "/brianshaler/status.json",
  	method: "GET"
  };
  http.request(checkOptions, isThisARedirect).on('error', onError).end();
}

function isThisARedirect (res) {
	if (res.statusCode == 301 || res.statusCode == 302) { 
	  console.log("Redirect? HOW SUSPICIOUS.");
		redirecting(res);
	}
}

function redirecting (res) {
	var _url = url.parse(res.headers.location);
	
	console.log("Scrape: "+res.headers.location);
  scraper(res.headers.location, function(err, $) {
      if (err) {throw err}
      var found = false;
      for (var k in hotspots) {
        if (!found && hotspots[k].check($)) {
          console.log(k.toUpperCase()+" WANTS YOU TO LOG IN");
          connectToNetwork(hotspots[k].credentials, mergeObjects(_url, hotspots[k].postOptions));
          return;
        }
      }
      console.log("Unrecognized login form");
  });
}

function connectToNetwork (loginFormData, loginFormOptions) {
  
  loginFormData = querystring.stringify(loginFormData);
  
	loginFormOptions.method = "POST",
	loginFormOptions.headers = {
	  'Content-Type': 'application/x-www-form-urlencoded',
	  'Content-Length': loginFormData.length
  };
	
  // Set up the request
  var post_req = http.request(loginFormOptions, function(res) {
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        //console.log('Response: ' + chunk);
    });
    res.on('error', onError);
    res.on('close', function () {
      console.log("Logged in!");
    });
  });
  
  post_req.on('error', onError);
  
  // post the data
  post_req.write(loginFormData);
  post_req.end();
}

function onError (e) {
	console.log(e);
}

function mergeObjects (obj1, obj2) {
  obj = {};
  for (k in obj1) {
    obj[k] = obj1[k];
  }
  for (k in obj2) {
    obj[k] = obj2[k];
  }
  return obj;
}

setInterval(checkForRedirect, 10000);
checkForRedirect();
