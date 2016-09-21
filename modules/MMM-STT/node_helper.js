/* Magic Mirror
 * Module: MMM-SST
 *
 * By PSK https://github.com/prasanthsasikumar/
 *
 * MIT Licensed.
 */

const NodeHelper = require("node_helper");
var vcapServices = require('vcap_services'),
    extend = require('util')._extend,
    watson = require('watson-developer-cloud'),
    Socket = require("./socket.js");;

var token = 'Nothing';
module.exports = NodeHelper.create({

	start: function() {
		console.log("Starting node helper for: " + this.name);
   	this.config = [];
	},

  getToken: function(){
    var self = this;
    var params = extend({
      version: this.config.version,
      url: 'https://stream.watsonplatform.net/speech-to-text/api',
      username: this.config.username,
      password: this.config.password
    }, vcapServices.getCredentials('speech_to_text'));
    var authService = watson.authorization(params);
    var token = authService.getToken({url: params.url}, function(err, token) {
      if (err)
        console.error(err);
      else
        self.sendSocketNotification("TOKEN_RECEIVED", token);
    });
  },

	socketNotificationReceived: function(notification, payload) {
		if(notification === 'CONFIG'){
       this.config.username=payload.username;
       this.config.password=payload.password;
       this.config.version=payload.version;
  	   this.getToken();
		} else if (notification === 'MSG_RECEIVED') {
      var baseString ='';
      //this.formatMessage(payload,baseString);
      if (payload.results && payload.results.length > 0) {
        var alternatives = payload.results[0].alternatives;
        console.log('Got '+alternatives.length+' Alternative sets.');
        for (var i in alternatives ){
          console.log(JSON.stringify(alternatives[i].transcript));
        }
      }
		}
	},

  formatMessage: function(msg, baseString) {
    if (msg.results && msg.results.length > 0) {
    //  var alternatives = msg.results[0].alternatives;
        var text = msg.results[0].alternatives[0].transcript || '';

        // apply mappings to beautify
        text = text.replace(/%HESITATION\s/g, '');
        //text = text.replace(/([^*])\1{2,}/g, '');   // seems to be getting in the way of smart formatting, 1000101 is converted to 1101
        console.log('* ' + text);
        if (msg.results[0].final) {
          console.log('-> ' + text);
        }
        text = text.replace(/D_[^\s]+/g,'');

        // if all words are mapped to nothing then there is nothing else to do
        if ((text.length == 0) || (/^\s+$/.test(text))) {
          return baseString;
        }

        // capitalize first word
        // if final results, append a new paragraph
        /*if (msg.results && msg.results[0] && msg.results[0].final) {
          text = text.slice(0, -1);
          text = text.charAt(0).toUpperCase() + text.substring(1);
          text = text.trim() + '. ';
          baseString += text;
        }
        else {
              text = text.charAt(0).toUpperCase() + text.substring(1);
        }*/
    }
    return baseString;
  }

});
