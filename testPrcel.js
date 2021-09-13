var https = require('follow-redirects').https;
var fs = require('fs');
async function setPostData(newData){
var postData = newData;
var options = {
  'method': 'POST',
  'hostname': 'api.sendle.com',
  'path': '/api/orders',
  'headers': {
    'Origin': '',
    'Authorization': 'Basic ZWR3YXJkX21vbGx5YW5kc3RpdGM6WkZxTjdLdlA0eXBmajYzS3dGNDdXQzVt',
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
    //console.log(JSON.parse(body.toString()).messages.receiver[0].address[0])
    global.shippingLabel = JSON.parse(body.toString()).labels[0].url;
  });
  res.on("error", function (error) {
    console.error(error);
  });
});

req.write(postData);

req.end();

}
module.exports.setPostData = setPostData;
