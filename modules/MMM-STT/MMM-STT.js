/* Magic Mirror
 * Module: MMM-STT Speech to Text using IBM Watson
 *
 * By PSK https://github.com/prasanthsasikumar/
 *
 * MIT Licensed.
 */
Module.register("MMM-STT",{

	start: function() {
		Log.info("Starting module: " + this.name);
		this.sendSocketNotification('CONFIG', this.config);
	},
	getScripts: function() {
		return ["handlemicrophone.js", "Microphone.js", "utils.js", "socket.js"];
	},
	// Override socket notification handler.
	socketNotificationReceived: function(notification, payload) {
		if(notification === 'TOKEN_RECEIVED'){
			  console.log('TokenRECEIVED');
				this.getMicrophone(payload);
		}
	},
  getMicrophone: function(token){
		var self= this;
		var micOptions = {
		bufferSize: 8192
		};
		var mic = new Microphone(micOptions);
		var currentModel = 'en-US_BroadbandModel';
		handleMicrophone(token, currentModel, mic, function(err,msg) {
          if (err) {
            var msg = 'Error: ' + err.message;
            console.log(msg);
            //running = false;
          } else {
            console.log('starting mic');
            mic.record();
            running = true;
          }
					if (msg) {
							console.log('Messages Results: '+JSON.stringify(msg.results, null, 2));
							self.sendSocketNotification('MSG_RECEIVED', msg);
					}
        });
	},

	getDom: function() {
		var wrapper = document.createElement("div");
		wrapper.classList.add('small', 'align-left');

		var audio = document.createElement("AUDIO");
		audio.setAttribute("controls", "controls");
		audio.setAttribute("autoplay", "true");
		audio.setAttribute("src", "/synthesize?text=Welcome back Commander!! ");

		//this.sendNotification('MMM-TTS', 'Hey!!');
		return wrapper;
	},

});
