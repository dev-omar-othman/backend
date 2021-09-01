 async function setSheets(passedSku){ //client instance
  passedSku = passedSku.replace('[',"");
  passedSku = passedSku.replace(']',"");
  passedSku = passedSku.replace(/",/g,"],");
  passedSku = passedSku.replace(/,"/g,",[");
  passedSku = passedSku.replace(/'/g,"");
  passedSku = passedSku.replace(`'"`,"[");
  passedSku = passedSku.replace(`"'`,"]");

  const {google} = require("googleapis");
  const auth = new google.auth.GoogleAuth({
    keyFile:"credentials.json",
    scopes:"https://www.googleapis.com/auth/spreadsheets"
  });

  const client =  await auth.getClient();

  // googlesheets instance

  const googleSheets = google.sheets({version: "v4", auth:client});
  const spreadsheetId = "1hKPmIob8qWIFeLOQokY70aDeDlJBCLcaChQiwo7L1JM";
  
  // get metadata about spreadsheet
  const metaData = await googleSheets.spreadsheets.get({
    auth,
    spreadsheetId,

  });
  var sku=passedSku.split(",");
  for(var counter = 0; counter < sku.length; counter++){
  }
  //write row(s) to spreadsheet
 await googleSheets.spreadsheets.values.append({
    auth,
    spreadsheetId,
    range:"Out",
    valueInputOption:"RAW",
    resource:{
      values:[["123123"],["123123"]]
    }
  })
  console.log('set Sheets')
  console.log(sku)
}
module.exports.setSheets = setSheets;
