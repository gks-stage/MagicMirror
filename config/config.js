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
		}, {
			module: 'MMM-Temperature-Humidity',
			position: 'bottom_right',
			config: {
				refreshInterval: 50000, //Time before successive readings
				temperaturePrefix: "Room temperature: ",
				temperatureSuffix: "°C",
				humidityPrefix: "Humidity: ",
				humiditySuffix: "%"
			}
		},
		/*{
			module: 'phone_notification',
			position: 'bottom_right',
			header: 'Phone Notifications',
			config: {
				accessToken: 'o.85OuVS4o2mlOZ21hymEhjiSJmkLK8ttA',
				numberOfNotifications: 5,
				displayNotificationIcon: true,
				displayMessage: true,
				displayCount: false,
				alert: false,
				fade: true,
				maxCharacters: 50
			},
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
