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
import './Toolbar.css';

const toolbar = props => (
    <header className="toolbar">
        <nav className="toolbar_navigation">
            <div></div>
            <div className="toolbar_logo"><a href="/">LowBall</a></div>
            <div className="spacer" />
            <form className="search-form">
                <input className="search-bar" type = "text"/>
                <button className="search-button" type = "submit"><FontAwesome name="search" size="2x"/></button>
            </form>
            <div className="spacer" />
            <div className="toolbar_navigation_items">
                <ul>
                    <li><a href="/">Categories</a></li>
                    <li><a href="/">Designers</a></li>
                </ul>
            </div>
        </nav>
    </header>
)

export default toolbar;