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

app.get('/test', function(req,res){
req.headers['mode'] = 'no-cors';
require('./getSheetData').getSheets();
});

app.get('/runApp', function(req,res){
  req.headers['mode'] = 'no-cors';
  try{
    require('./getUnfulfilledOrders').getOrders();
    require('./getSheetData').getSheets();
  } 
  catch(e){
    console.log("error:" + e);
  }
  finally{
    setTimeout(() => {
      require('./newFiltering').filterMe();
    }, 2000);
    
  }
});

app.get('/updateData', function(req,res){
  req.headers['mode'] = 'no-cors';
  require('./testPrcel').setPostData(req.query.data);
  setTimeout(() => {
    res.body = global.shippingLabel;
   res.send({body: {
     label :global.shippingLabel,
     url : global.trackingUrl,
     trackingNo : global.trackingNo,    
    }
  })
  }, 2500);
});
app.get("/fulfillSheets", async (req , res) =>{
  require('./setInventory').setSheets(JSON.parse(req.query.data));
  res.send("sheet updated");
});

app.get("/fulfillShopify", async (req , res) =>{
  require('./shopifyFulfillment').shopifyFulfillment(req.query.orderid , req.query.trackingUrl,req.query.trackingNo);
  res.send("order Fulfilled!");
});

server.listen(port,() => console.log(`running on ${port}`));
