
// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region
AWS.config.update({region: 'us-east-2'});

var docClient = new AWS.DynamoDB.DocumentClient();

var params = {
  ExpressionAttributeValues: {
    ':designer': {S: 'Maison Margiela'},
    ':category': {S: 'Shoes'},
    ':size' : {N: 12},
    ':price' : {N: 150}
  },
  ProjectionExpression: 'designer, category, size, price',
  FilterExpression: 'designer = :designer, category = :category, size = :size, price = :price',
  TableName: 'listings'
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