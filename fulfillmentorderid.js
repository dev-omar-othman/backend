
var https = require('follow-redirects').https;
var fs = require('fs');
function shopifyFulfillmentid(order_id, callback){
var options = {
  'method': 'GET',
  'hostname': 'mollyandstitchus.myshopify.com',
  'path': `/admin/api/2023-07/orders/${order_id}/fulfillment_orders.json`,
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
    let fulfillmentOrderId = JSON.parse(body.toString()).fulfillment_orders[0].id;
    global.fulfillmentOrderId = fulfillmentOrderId;
    callback();
  });

  res.on("error", function (error) {
    console.error(error);
  });
});

req.end();
}
module.exports.shopifyFulfillmentid = shopifyFulfillmentid;