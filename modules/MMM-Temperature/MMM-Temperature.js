/* global Module */

/* Magic Mirror
 * Module: Temperature
 *
 * By Cato Antonsen
 * MIT Licensed.
 */
 

Module.register("MMM-Temperature",{

	defaults: {
		RefreshInterval: 10000,
		Id: null,
		Prefix: "System temperature: ",
		Suffix: "°",
		DebugGettingTemperature: true
	},

	start: function() {
		this.temperature = null;
		Log.info('Starting module: ' + this.name);
		this.sendSocketNotification('CONFIG', this.config);
	},

	getDom: function() {
		var wrapper = document.createElement("div");
		wrapper.className = "small";
		if (this.temperature != null) {
			var temp = document.createTextNode(this.config.Prefix + this.temperature + this.config.Suffix);
			temp.className = "light";
			wrapper.appendChild(temp);
		} 
		return wrapper;
	},
	
	socketNotificationReceived: function(notification, payload) {
		if (notification === "Temperature"){
			this.temperature = payload;
			this.updateDom(2000);
		}
	}
});
