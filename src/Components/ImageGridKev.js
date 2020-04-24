import React, { useState, useEffect } from 'react';
import './ImageGrid.css';

// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region
AWS.config.update({accessKeyId: 'AKIAIOQISPXCU4ZTULGA', secretAccessKey: '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', region: 'us-east-2'});

var docClient = new AWS.DynamoDB.DocumentClient();

const Text = ({data}) => {
  /*const ItemData = [{
      id: 1,
      Brand: "Brand",
      Description: "Description",
      Size: "Size",
      Price: "Price"
  }]*/
    return(
    <div className="text">
      <span>{`${data.designer}: `}</span>
      <span>{`${data.category}: `}</span>
      <span>{`${data.size}: `}</span>
      <span>{`${data.price}: `}</span>
    </div>
    )
}

const Tile = ({data}) => {
return (
  <div className="tile">
      <img
          src={data.image}
          alt={data.name}
          style={{width: '10vw', height: '10vw'}}
      />
      <Text data={data}/>
  </div>
)
}

const ImageData = (props) => {
  const [params, setParams] = useState({
    TableName: 'listings',
    ProjectionExpression: 'designer, category, size, price',
    /*FilterExpression: 'designer = :designer and category = :category and size = :size and price = :price',
    ExpressionAttributeValues: {
      ':designer': 'Maison Margiela',
      ':category': 'Shoes',
      ':size' : 12,
      ':price' : 150
    }*/
  })

  const [listings, setListings] = useState([]);
  const [data, setData] = useState({});

  useEffect(() => {
    docClient.scan(params, onScan);
  }, [])

  useEffect(() => {
    // continue scanning if we have more items, because
    // scan can retrieve a maximum of 1MB of data
    if(typeof data.LastEvaluatedKey !== undefined){
      setParams({...params, ExclusiveStartKey: data.LastEvaluatedKey});
      docClient.scan(params, onScan);
    }
  }, [data])

  function onScan(err, data) {
    if (err) {
      console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
      const items = data.Items.map(item => ([
        item.designer + ": ",
        item.category + ": ",
        item.size + ": ",
        item.price + ": "
      ]))
      setData(data)
      setListings(items);
    }
  }

  return(
    <div className="tiles">
      {props.data.map((d) => {
          return <Tile data={d} key={d.id} />
      })}
      </div>
    )
}

export default ImageData;