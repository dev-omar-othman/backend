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
app.use(express.static("../JSON")); // exposes index.html, per below
app.get('/getUnfulfilledOrders',function(req,res){
  req.headers['mode'] = 'no-cors',
  require('./routes/getUnfulfilledOrders').req;
  res.send("orders fetched!");
});
app.get('/setParcel', function(req,res){
  req.headers['mode'] = 'no-cors';
  async function getMyLabel(){
    await require('./routes/testPrcel').setPostData(req.query.data);
    res.body = global.shippingLabel;
    res.send({body: global.shippingLabel})
    console.log("setinv from setparcel"+global.shippingLabel)
  }
  getMyLabel();
});
//start
app.get('/updateData', function(req,res){
  req.headers['mode'] = 'no-cors';
  require('./routes/testPrcel').setPostData(req.query.data);
  setTimeout(() => {
    res.body = global.shippingLabel;
   res.send({body: global.shippingLabel})
   console.log("setinv"+global.shippingLabel)
  }, 2500);
});
//end
app.get("/fulfillSheets", async (req , res) =>{
  require('./routes/setInventory').setSheets(req.query.data);
  res.send("sheet updated");
});
server.listen(port,(req,res) => console.log(`running on ${port}`));
