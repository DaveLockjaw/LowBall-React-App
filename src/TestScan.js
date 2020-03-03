var AWS = require("aws-sdk");

AWS.config.getCredentials(function(err){
  if (err) console.log(err.stack){
    console.log("error");
  } else {
    console.log("Access key:", AWS.config.credentials.accessKeyId);
    console.log("Secret access key:", AWS.config.credentials.secretAccessKey);
  }
});

// Set the region
AWS.config.update({region: 'us-east-2'});
var credentialsFile = new AWS.SharedIniFileCredentials();
AWS.config.credentials = credentialsFile;

var docClient = new AWS.DynamoDB.DocumentClient();

var params = {
  TableName: 'listings',
  ProjectionExpression: 'designer, category, size, price',
  /*FilterExpression: 'designer = :designer and category = :category and size = :size and price = :price',
  ExpressionAttributeValues: {
    ':designer': 'Maison Margiela',
    ':category': 'Shoes',
    ':size' : 12,
    ':price' : 150
  }*/
};

console.log("Scanning Clothing Table.");
docClient.scan(params, onScan);

function onScan(err, data) {
  if (err) {
    console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
  } else {
    // print all the items
    console.log("Scan succeeded.");
    data.Items.forEach(function(clothingitem) {
        console.log(
             clothingitem.designer + ": ",
             clothingitem.category + ": ",
             clothingitem.size + ": ",
             clothingitem.price + ": ");
     });

     // continue scanning if we have more items, because
     // scan can retrieve a maximum of 1MB of data
     if (typeof data.LastEvaluatedKey != "undefined") {
         console.log("Scanning for more...");
         params.ExclusiveStartKey = data.LastEvaluatedKey;
         docClient.scan(params, onScan);
        }
    }
}