import 'react-app-polyfill/ie9';
import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import $ from 'jquery'
import App from './App';
/**
 * Prepares the host page for the application
 */
$(document).ready(function () {
    const path = window.location.pathname.split("/")
    console.log('index.js'
    )
    if (path[path.length - 1] === 'Home.aspx') {
        $("#DeltaPlaceHolderMain").append("<div id='app-root'></div>")
    }

    ReactDOM.render(<App />, document.getElementById('app-root'));

    // If you want your app to work offline and load faster, you can change
    // unregister() to register() below. Note this comes with some pitfalls.
    // Learn more about service workers: https://bit.ly/CRA-PWA
    serviceWorker.unregister();
});
