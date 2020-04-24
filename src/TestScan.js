// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region

AWS.config.update({accessKeyId: 'DUMMY', secretAccessKey: 'DUMMY', region: 'us-east-2'});

var docClient = new AWS.DynamoDB.DocumentClient();

var listingdata = [[]];

var params = {
  TableName: 'listing_table',
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
      listingdata.push([
        clothingitem.designer + ": ",
        clothingitem.category + ": ",
        clothingitem.size + ": ",
        clothingitem.price + ": "])
     });

     /*
     for (let i = 0; i < data.Items.length; i++) {
      listingdata.push([
        data.designer + ": ",
        data.category + ": ",
        data.size + ": ",
        data.price + ": "])
     };*/

     console.log(listingdata[1][0])
     console.log(listingdata[1][1])
     console.log(listingdata[1][2])
     console.log(listingdata[1][3])
     console.log(listingdata[1])
     console.log(listingdata[2])
     console.log(listingdata[3])
     console.log(listingdata[4])
     console.log(listingdata[5])
     console.log(listingdata[6])


     // continue scanning if we have more items, because
     // scan can retrieve a maximum of 1MB of data
     if (typeof data.LastEvaluatedKey != "undefined") {
         console.log("Scanning for more...");
         params.ExclusiveStartKey = data.LastEvaluatedKey;
         docClient.scan(params, onScan);
        }
    }
}
