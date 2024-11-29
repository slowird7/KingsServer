/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var pathArray = document.location.pathname.split('/');
pathArray.pop(); // Remove the last element to get the parent path
var parentPath = pathArray.join('/');
var wsUri = "ws://" + document.location.host + parentPath + "/endpoint";
//var wsUri = "ws://localhost:8080/kingserver/endpoint";
var websocket = new WebSocket(wsUri);

websocket.onerror = function(evt) { onError(evt); };

function onError(evt) {
    writeToScreen('<span style="color: red;">ERROR:</span> ' + evt.data);
}

// For testing purposes
var output = document.getElementById("output");
websocket.onopen = function(evt) { onOpen(evt); };

function writeToScreen(message) {
    output.innerHTML += message + "<br>";
}

function onOpen() {
    writeToScreen("Connected to " + wsUri);
}

websocket.onmessage = function(evt) { onMessage(evt) };

function sendText(json) {
    console.log("sending text: " + json);
    websocket.send(json);
}
                
function onMessage(evt) {
    console.log("received: " + evt.data);
    updateView(evt.data);
}

