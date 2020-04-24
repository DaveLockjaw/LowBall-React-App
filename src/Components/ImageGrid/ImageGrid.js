/*
References for the LowBall Project and learning the React framwork:
https://blog.logrocket.com/building-a-custom-dropdown-menu-component-for-react-e94f02ced4a1/
https://react-select.com/home#getting-started
https://reactjsexample.com/tag/gallery/
https://reactjsexample.com/photo-gallery-using-react-js/
https://medium.com/@pateldhara248/flex-direction-justify-content-align-items-
https://www.tutorialspoint.com/css/css_positioning.htm
https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.NodeJs.04.html
https://www.youtube.com/watch?v=l6nmysZKHFU
*/

import React from 'react';
import './ImageGrid.css';

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
        clothingitem.designer,
        clothingitem.category,
        clothingitem.size,
        clothingitem.price])
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
        <span>{listingdata[1]}</span>
        <span>{listingdata[2]}</span>
        <span>{listingdata[3]}</span>
        <span>{listingdata[4]}</span>
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