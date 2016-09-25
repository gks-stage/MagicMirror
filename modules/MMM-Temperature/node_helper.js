'use strict';

/* Magic Mirror
 * Module: SpotifyConnectUI
 *
 * By Cato Antonsen
 * MIT Licensed.
 */

var NodeHelper = require('node_helper');
var http = require('http');
var ds18b20 = require("ds18b20");

module.exports = NodeHelper.create({
	log: function(message) {
		console.log("[" + this.name + "] " + message);
	},

	error: function(message) {
		console.log("[" + this.name + "] " + message);
	},
	
	debug: function(message) {
		if (this.config.DebugGettingTemperature) {
			console.log("[" + this.name + "] " + message)
		}
	},
	
    start: function () {
		var self = this;
        self.started = false;
        self.config = null;
		self.sensor = null;
		
		ds18b20.sensors(function(err, ids) {
			self.log("Found sensor with id " + ids[0])
			self.sensor = ids[0]
		});
    },
	
	startPolling: function() {
		var self = this;
		var interval = self.config.RefreshInterval;
		self.log("Setting refresh interval to " + interval + " ms");
		setInterval(function() {
				self.getTemperature();
			}, interval
		);
	},
	
	getTemperature: function() {
		var self = this;
		
		self.debug("Getting temperature from sensor with id " + self.config.Id);
		
		ds18b20.temperature(self.config.Id, function(err, value) {
		
		  self.debug('Current temperature is ' + value);
		  self.sendSocketNotification("Temperature", value);
		});
	},

	socketNotificationReceived: function (notification, config) {
		var self = this;
        self.log("Notification received: " + notification);
        if (notification === 'CONFIG' && !self.started) {
            self.config = config;
			
			if (self.config.Id === null) {
				self.config.Id = self.sensor;
			}

            self.started = true;
			self.getTemperature();
			self.startPolling();
		}
    }
});
	


