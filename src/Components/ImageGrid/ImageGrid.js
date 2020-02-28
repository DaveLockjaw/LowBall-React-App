import React from 'react';
import './ImageGrid.css';

// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region
AWS.config.update({accessKeyId: 'AKIAIOQISPXCU4ZTULGA', secretAccessKey: '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', region: 'us-east-2'});

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
    var listingdata = []
  if (err) {
    console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
  } else {
    // print all the items
    console.log("Scan succeeded.");
    data.Items.forEach(function(clothingitem) {
        listingdata.push = [{
            designer: clothingitem.designer,
            category: clothingitem.category,
            size: clothingitem.size,
            price: clothingitem.price
        }]
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

function ImageData(props) {
    return(
    <Tiles data={props.data}></ Tiles>
    )
  }
  
  function Tiles(props) {
    return(
      <div className="tiles">
                  {props.data.map((data) => {
                      return <Tile data={data} key={data.id} />
                  })}
              </div>
    )
  }

  function Text(props) {
    /*const ItemData = [{
        id: 1,
        Brand: "Brand",
        Description: "Description",
        Size: "Size",
        Price: "Price"
    }]*/

      return(
      <div className="text">
        <span>{listingdata[0].designer}</span>
        <span>{listingdata[0].category}</span>
        <span>{listingdata[0].size}</span>
        <span>{listingdata[0].price}</span>
      </div>
      )
  }
  
  class Tile extends React.Component {
      constructor(props) {
              super(props);
              this.state = {
              };
          }
  
      render() {
          return (
              <div className="tile">
                  <img
                      src={this.props.data.image}
                      alt={this.props.data.name}
                      style={{width: '10vw', height: '10vw'}}
                  />
                  <Text />
              </div>
          );
      }
  }

export default ImageData;