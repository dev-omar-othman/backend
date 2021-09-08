var https = require('follow-redirects').https;
var fs = require('fs');
function shopifyFulfillment(orderId){
var options = {
  'method': 'POST',
  'hostname': 'mollyandstitchus.myshopify.com',
  'path': `/admin/api/2021-07/orders/${orderId}/fulfillments.json`,
  'headers': {
    'Authorization': 'Basic OTJjOWE3NDdmMjZmODgzNjM4OGM4NDFhMDYzZjMwZDI6c2hwcGFfNDg4NDNmNTNjNDYyZmI5OGRiY2U2ZjI2NDBlNzE2MjY=',
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
    console.log(body.toString());
  });

  res.on("error", function (error) {
    console.error(error);
  });
});

var postData = JSON.stringify({
  "fulfillment": {
    "location_id": 61126803622,
    "tracking_number": null
  }
});

req.write(postData);

req.end();
}
module.exports.shopifyFulfillment = shopifyFulfillment;