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