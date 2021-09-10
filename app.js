const express = require("express");
var fs = require('fs');
var cors = require('cors');
var http = require('http');
const port = process.env.PORT || 8081;
const app = express();
var server = http.createServer(app);
const {google} = require("googleapis");
// use it before all route definitions
app.use(cors({origin: '*'}));
app.use(express.static("../JSON",{etag: false})); // exposes index.html, per below
app.get('/getUnfulfilledOrders',function(req,res){
req.headers['mode'] = 'no-cors';
require('./getUnfulfilledOrders').getOrders();
  res.send("orders fetched!");
});
app.get('/updateData', function(req,res){
  req.headers['mode'] = 'no-cors';
  require('./testPrcel').setPostData(req.query.data);
  setTimeout(() => {
    res.body = global.shippingLabel;
   res.send({body: global.shippingLabel})
   console.log("setinv"+global.shippingLabel)
  }, 2500);
});
app.get("/fulfillSheets", async (req , res) =>{
  require('./setInventory').setSheets(JSON.parse(req.query.data));
  res.send("sheet updated");
});
app.get("/getSheetsData", async (req , res) =>{
  await require('./getSheetData').getSheets();
  res.send('sheet fetched');
});
app.get("/showQty", async (req , res) =>{
  require('./unfulfilledFiltering').filterData();
  req.headers['mode'] = 'no-cors';
  res.send('sheet filtered');
});
app.get("/fulfillShopify", async (req , res) =>{
  require('./shopifyFulfillment').shopifyFulfillment(req.query.data);
  res.send("order Fulfilled!");
});
server.listen(port,() => console.log(`running on ${port}`));
