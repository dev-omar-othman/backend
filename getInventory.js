const express = require("express");
const {google} = require("googleapis");
const app = express();

app.get("/", async (req , res) =>{
  const auth = new google.auth.GoogleAuth({
    keyFile:"credentials.json",
    scopes:"https://www.googleapis.com/auth/spreadsheets"
  });


  //client instance

  const client =  await auth.getClient();

  // googlesheets instance

  const googleSheets = google.sheets({version: "v4", auth:client});
  const spreadsheetId = "1hKPmIob8qWIFeLOQokY70aDeDlJBCLcaChQiwo7L1JM";
  
  // get metadata about spreadsheet
  const metaData = await googleSheets.spreadsheets.get({
    auth,
    spreadsheetId,

  });

  //read rows from spreadsheet
  const getRows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "Butter Retriever Collar!L:L",
  });


const barcodes = getRows.data.values;
  res.send(barcodes.forEach(barcode=>{
    if(barcode == "9120109773702"){
      let index = barcodes.indexOf(barcode);
      console.log(index+1)
    }
  }))

});
app.listen(3030,(req,res) => console.log("running on 3030"));