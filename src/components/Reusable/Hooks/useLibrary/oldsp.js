'use strict';

var appWebUrl, hostWebUrl;

$(document).ready(function ()
{

    // Check for FileReader API (HTML5) support.
    if (!window.FileReader) {
        alert(' FileReader API does not support Your Current Browser.');
    }

    // Get the app web and host web URLs.
    appWebUrl = decodeURIComponent(getQueryStringParameter("SPAppWebUrl"));
    hostWebUrl = decodeURIComponent(getQueryStringParameter("SPHostUrl"));
});

// Upload the file.
// You can upload files up to 2 GB with the REST API.
function uploadFile()
{

    // Define the folder path for this example.
    var serverRelativeUrlToFolder = '/sites/apps/shared documents';

    // Get test values from the file input and text input page controls.
    // The display name must be unique every time you run the example.
    var fileInput = $('#getFile');
    var newName = $('#displayName').val();





}


// Get parameters from the query string.
// For production purposes you may want to use a library to handle the query string.
function getQueryStringParameter(paramToRetrieve)
{
    var params = document.URL.split("?")[1].split("&");
    for (var i = 0; i < params.length; i = i + 1) {
        var singleParam = params[i].split("=");
        if (singleParam[0] == paramToRetrieve) return singleParam[1];
    }
}