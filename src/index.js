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
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'font-awesome/css/font-awesome.min.css';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
