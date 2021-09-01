var https = require('follow-redirects').https;
var fs = require('fs');

var options = {
  'method': 'POST',
  'hostname': 'sandbox.sendle.com',
  'path': '/api/orders',
  'headers': {
    'Origin': '',
    'Authorization': 'Basic U0FOREJPWF9vbWFyX3JlYmVsbWFya2V0aW5nYzpzYW5kYm94X2dCZlJDR1d0dzJ2V25RU1RXeUZ0ZEp5Zw==',
    'Content-Type': 'application/json'
  },
  'maxRedirects': 20
};

var req = https.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function (chunk) {
    var body = Buffer.concat(chunks);
    global.shippingLabel = JSON.parse(body.toString()).labels[0].url;
  });

  res.on("error", function (error) {
    console.error(error);
  });
});

var postData = JSON.stringify({
  "pickup_date": "2021-11-24",
  "first_mile_option": "pickup",
  "description": "Kryptonite",
  "weight": {
    "value": "1",
    "units": "kg"
  },
  "volume": {
    "value": "0.01",
    "units": "m3"
  },
  "customer_reference": "SupBdayPressie",
  "metadata": {
    "your_data": "XYZ123"
  },
  "sender": {
    "contact": {
      "name": "Lex Luthor",
      "phone": "0412 345 678",
      "company": "LexCorp"
    },
    "address": {
      "address_line1": "123 Gotham Ln",
      "suburb": "Sydney",
      "state_name": "NSW",
      "postcode": "2000",
      "country": "Australia"
    },
    "instructions": "Knock loudly"
  },
  "receiver": {
    "contact": {
      "name": "Clark Kent",
      "email": "clarkissuper@dailyplanet.xyz",
      "company": "Daily Planet"
    },
    "address": {
      "address_line1": "80 Wentworth Park Road",
      "suburb": "Glebe",
      "state_name": "NSW",
      "postcode": "2037",
      "country": "Australia"
    },
    "instructions": "Give directly to me"
  }
});

/*
function setPostData(newData){
postData = newData;
console.log(postData);
}
*/
req.write(postData);

req.end();
module.exports.req = req;
//module.exports.setPostData = setPostData;
//module.exports.postData = postData;