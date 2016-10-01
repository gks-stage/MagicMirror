/* Magic Mirror Config Sample
 *
 * By Michael Teeuw http://michaelteeuw.nl
 * MIT Licensed.
 */

var config = {
	port: 8080,
	hostname: 'localhost',
	language: 'english',
	timeFormat: 12,
	units: 'metric',


	modules: [{
			module: 'alert',
		}, {
			module: 'clock',
			position: 'top_left'
		}, {
			module: 'calendar',
			header: 'Calendar',
			position: 'top_left',
			config: {
				calendars: [{
					symbol: 'calendar-check-o ',
					url: 'webcal://www.calendarlabs.com/templates/ical/India-Holidays.ics'
				}, {
					symbol: 'calendar-check-o ',
					url: 'webcal://www.calendar.prasanthsasikumar.com/birthdays.ics'
				}, {
					symbol: 'calendar-check-o',
					url: 'webcal://calendar.google.com/calendar/ical/143prasanths%40gmail.com/public/basic.ics'
				}]
			}
		}, {
			module: 'compliments',
			position: 'lower_third'
		}, {
			module: 'currentweather',
			position: 'top_right',
			config: {
				location: 'Thiruvananthapuram',
				locationID: '1254163', //ID from http://www.openweathermap.org
				appid: '660d83c3c5f8c97b369a811684ca0e6a'
			}
		}, {
			module: 'weatherforecast',
			position: 'top_right',
			header: 'Weather Forecast',
			config: {
				location: 'Thiruvananthapuram',
				locationID: '1254163', //ID from http://www.openweathermap.org
				appid: '660d83c3c5f8c97b369a811684ca0e6a'
			}
		}, {
			module: 'MMM-Wunderlist',
			position: 'top_right', // This can be any of the regions. Best results in left or right regions.
			header: 'Wunderlist', // This is optional
			config: {
				clientID: '42fe22885424a114719f',
				accessToken: 'fc16dcf7d995f16e8ba6c990ba200df03d92e6a8f9fd38ab95a7672de6e8',
				// See 'Configuration options' for more information.
			}
		}, {
			module: 'MMM-TTS',
			position: 'top_right',
			config: {
				text: 'MMM-TTS',
			}
		},
		/*{
			module: 'MMM-Temperature-Humidity',
			position: 'bottom_right',
			config: {
				refreshInterval: 50000, //Time before successive readings
				temperaturePrefix: "Room temperature: ",
				temperatureSuffix: "°C",
				humidityPrefix: "Humidity: ",
				humiditySuffix: "%"
			}
		}, */
		/*{
			module: 'MMM-Instagram',
			position: 'top_left',
			config: {
				access_token: '3260258452.1677ed0.37ad904838d94d0187a595975485bf80',
				count: 200,
				min_timestamp: 0,
				animationSpeed: 2500,
				updateInterval: 12000
			}
		},*/
		{
			module: 'MMM-PushBullet',
			position: 'top_left',
			header: 'Phone Notifications',
			config: {
				accessToken: 'o.S9y8SnjxGNgCCgLQNT5uz9IQnfDOvvZS',
				numberOfNotifications: 5,
				displayNotificationIcon: true,
				displayMessage: true,
				displayCount: false,
				alert: false,
				fade: true,
				maxCharacters: 50
			},
		}, {
			module: 'MMM-AlarmClock',
			position: 'top_right',
			config: {
				alarms: [{
					time: "02:53",
					days: [2, 4, 6],
					title: "Wake up",
					message: "Get ready for the next phase!"
				}, ],
			}
		},
		/* {
					module: 'voicecontrol',
					position: 'bottom_left',
					config: {
						models: [{
							keyword: "play", // keyword
							description: "Say 'Play' to start playing",
							file: "play.pmdl", // trained model file name
							message: "PLAY" // notification message that's broadcast in the MagicMirror app
						}]
					}
				},*/
		/*{
			module: 'MMM-STT',
			position: 'bottom_left',
			config: {
				version: 'v1',
				username: '8e9cd03f-d61e-4486-b1ef-21e2a70b6aa8',
				password: 'ggtI5QqhfwdT',
				// See 'Configuration options' for more information.
			}
		},*/
		/*{
	        module: 'MMM-PIR-Sensor',
	        config: {
	            // See 'Configuration options' for more information.
	        }
	    },/*
			/*{
		     module: 'MMM-voice',
		     position: 'bottom_bar',
		     config: {
		         microphone: 2,
		         keyword:'mirror',
		     }
		 },*/

		/*{
	          module: 'MMM-GameServers',
	          position: 'top_left',  // This can be any of the regions. Best results in left or right regions.
	          header: 'Game Servers' // This is optional
	    },*/
		/*{
         module: 'MMM-ModuleScheduler'
     },
 		{
         module: 'email',
         position: 'bottom_left',
         header: 'Email',
         config:{
             user: '143prasanths@gmail.com',
             password: 'praveen4',
             host: 'imap.gmail.com',
             port: 993,
             tls: true,
             authTimeout: 10000,
             numberOfEmails: 5,
             fade: true
         },
     },*/
		{
			module: 'newsfeed',
			position: 'bottom_bar',
			config: {
				feeds: [{
					title: "Times of India",
					url: "http://timesofindia.indiatimes.com/rssfeeds/-2128936835.cms"
				}],
				showSourceTitle: true,
				showPublishDate: true
			}
		},
	]

};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== 'undefined') {
	module.exports = config;
}
