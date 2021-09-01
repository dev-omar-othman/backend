var https = require('follow-redirects').https;
var fs = require('fs');
async function setPostData(newData){
var postData = newData;
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

var req = https.request(options, await function (res) {
  var chunks = [];
  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end",  function (chunk) {
    var body = Buffer.concat(chunks);
    global.shippingLabel = JSON.parse(body.toString()).labels[0].url;
    console.log("test:"+global.shippingLabel)
  });
  res.on("error", function (error) {
    console.error(error);
  });
});

req.write(postData);

req.end();

}
module.exports.setPostData = setPostData;
