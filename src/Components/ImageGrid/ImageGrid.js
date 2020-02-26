import React from 'react';
import './ImageGrid.css';

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
    const ItemData = [{
        id: 1,
        Brand: "Brand",
        Description: "Description",
        Size: "Size",
        Price: "Price"
    }]

      return(
      <div className="text">
        <span>{ItemData[0].Brand}</span>
        <span>{ItemData[0].Description}</span>
        <span>{ItemData[0].Size}</span>
        <span>{ItemData[0].Price}</span>
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