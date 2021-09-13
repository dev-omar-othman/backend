var https = require('follow-redirects').https;
var fs = require('fs');
let  finalOrders = []
function getOrders(){
var options = {
  'method': 'GET',
  'hostname': 'mollyandstitchus.myshopify.com',
  'path': '/admin/api/2021-07/orders.json?fulfillment_status=unshipped',
  'headers': {
    'Authorization': 'Basic OTJjOWE3NDdmMjZmODgzNjM4OGM4NDFhMDYzZjMwZDI6c2hwcGFfNDg4NDNmNTNjNDYyZmI5OGRiY2U2ZjI2NDBlNzE2MjY='
  },
  'maxRedirects': 20
};
function Items (barcode,qty){
  this.barcode = barcode;
  this.qty = qty;
};
var req = https.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end",async function (chunk) {
    var body = Buffer.concat(chunks);
    var orders = JSON.parse(body.toString());
    for(var i = 0; i < orders.orders.length; i++){
        
        let orderData = {
            orderNumber : orders.orders[i].id,
            orderTotalPrice : orders.orders[i].total_price,
            orderId: orders.orders[i].name,
            destination1: orders.orders[i].shipping_address.address1 ,
            destination2: orders.orders[i].shipping_address.address2 ,
            postalCode : orders.orders[i].shipping_address.zip,
            countryCode : orders.orders[i].shipping_address.country_code,
            state : orders.orders[i].shipping_address.province_code,
            customer: orders.orders[i].shipping_address.name,
            itemsSku:[],
            itemsQuantity:[],
            orderDescription:[],
            orderDate : new Date (orders.orders[i].updated_at),
            
        }
        for(var j = 0; orders.orders[i].line_items.length > j ; j++){
          for(var quantityCounter = 0; quantityCounter < orders.orders[i].line_items[j].quantity; quantityCounter++ ){
            orderData.orderDescription.push (orders.orders[i].line_items[j].title +" "+ orders.orders[i].line_items[j].variant_title);
            orderData.itemsSku.push(orders.orders[i].line_items[j].sku);
            orderData.itemsQuantity.push(new Items(orders.orders[i].line_items[j].sku,orders.orders[i].line_items[j].quantity))
          }
            
        }
        finalOrders.push(orderData);
    
    }
    fs.writeFile('../JSON/unfulfilledOrders.json', JSON.stringify(finalOrders,null,2), err => {
      if (err) {
       console.log('Error writing file', err)
     } else {
       console.log('fetched unfulfilled orders')
       }
     })
     finalOrders = [];
  });

  res.on("error", function (error) {
    console.error(error);
  });
});

req.end();
}
module.exports.getOrders = getOrders;
module.exports.finalOrders = finalOrders;