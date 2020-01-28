import 'react-app-polyfill/ie9';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import $ from 'jquery'

$(document).ready(function () {
    let pageName = window.location.pathname.split("/")

    if (pageName[pageName.length - 1] === 'Home.aspx') {
        $("#DeltaPlaceHolderMain").append("<div id='app-root'></div>")
    }

    var head = document.getElementsByTagName('head')[0]
    var vdrStyle = document.createElement('link')
    vdrStyle.type = 'text/css'
    vdrStyle.rel = 'stylesheet'
    vdrStyle.href = '../SiteAssets/css/vdr.css'
    head.appendChild(vdrStyle)

    ReactDOM.render(<App value='test' />, document.getElementById('app-root'));

    // If you want your app to work offline and load faster, you can change
    // unregister() to register() below. Note this comes with some pitfalls.
    // Learn more about service workers: https://bit.ly/CRA-PWA
    serviceWorker.unregister();
});
