/**
 * Copyright 2015 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/* global $:false */

'use strict';

// Mini WS callback API, so we can initialize
// with model and token in URI, plus
// start message

// Initialize closure, which holds maximum getToken call count
var Socket = function(options, onopen, onlistening, onmessage, onerror, onclose) {
  var self = this;
  var listening;
  // function withDefault(val, defaultVal) {
  //   return typeof val === 'undefined' ? defaultVal : val;
  // }
  var socket;
  var token = options.token;
  var model = options.model;
  var message = options.message || {'action': 'start'};
  // var sessionPermissions = withDefault(options.sessionPermissions,
  //   JSON.parse(localStorage.getItem('sessionPermissions')));
  // var sessionPermissionsQueryParam = sessionPermissions ? '0' : '1';
  // TODO: add '&X-Watson-Learning-Opt-Out=' + sessionPermissionsQueryParam once
  // we find why it's not accepted as query parameter
  var url = options.serviceURI || 'wss://stream.watsonplatform.net/speech-to-text/api/v1/recognize?watson-token=';
  url += token + '&model=' + model;
  console.log('URL model', model);
  try {
    socket = new WebSocket(url);
  } catch (err) {
    console.error('WS connection error: ', err);
  }
  socket.onopen = function() {
    listening = false;
    socket.send(JSON.stringify(message));
    onopen(socket);
  };
  socket.onmessage = function(evt) {
    var msg = JSON.parse(evt.data);
    if (msg.error) {
      console.log(msg.error);
      return;
    }
    if (msg.state === 'listening') {
      // Early cut off, without notification
      if (!listening) {
        onlistening(socket);
        listening = true;
      } else {
        console.log('MICROPHONE: Closing socket.');
        socket.close();
      }
    }
    onmessage(msg, socket);
  };

  socket.onerror = function(evt) {
    console.log('WS onerror: ', evt);
    console.log('Application error ' + evt.code + ': please refresh your browser and try again');
    onerror(evt);
  };

  socket.onclose = function(evt) {
    console.log('WS onclose: ', evt);
    if (evt.code === 1006) {
      // Authentication error, try to reconnect
      console.log('Authentication error, try to reconnect');
      return false;
    }
    if (evt.code === 1011) {
      console.log('Server error ' + evt.code + ': please refresh your browser and try again');
      return false;
    }
    if (evt.code > 1000) {
      console.log('Server error ' + evt.code + ': please refresh your browser and try again');
      return false;
    }
    onclose(evt);
  };

};

this.exports = Socket;
