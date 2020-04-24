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
import FontAwesome from 'react-fontawesome'
import './DropDownMenu.css';

class Dropdown extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        listOpen: false,
        headerTitle: this.props.title,
        timeOut: null
      }
    }

  handleClickOutside(){
      this.setState({
        listOpen: false
      })
    }

  selectItem(title, id, stateKey){
    this.setState({
      headerTitle: title,
      listOpen: false
    }, this.props.resetThenSet(id, stateKey))
  }

  toggleList(){
    this.setState(prevState => ({
      listOpen: !prevState.listOpen
    }))
  }

  render(){
    const{list} = this.props
    const{listOpen, headerTitle} = this.state
    return(
      <div className="dd-wrapper">
        <div className="dd-header" onClick={() => this.toggleList()}>
          <div className="dd-header-title">{headerTitle}</div>
          {listOpen
            ? <FontAwesome name="angle-up" size="2x"/>
            : <FontAwesome name="angle-down" size="2x"/>
          }
        </div>
        {listOpen && <ul className="dd-list" onClick={e => e.stopPropagation()}>
          {list.map((item)=> (
            <li className="dd-list-item" key={item.id} onClick={() => this.selectItem(item.title, item.id, item.key)}>{item.title} {item.selected && <FontAwesome name="check"/>}</li>
          ))}
        </ul>}
      </div>
    )
  }
}

export default Dropdown;