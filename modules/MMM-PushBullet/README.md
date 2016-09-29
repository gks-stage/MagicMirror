# MMM-PushBullet Configurable Notification Mirroring
Displays and alerts mirror users on new phone notifications which are configurable.
This module is heavily based on ![phone-notification-mirror](https://github.com/ronny3050/phone-notification-mirror) by ![ronny3050](https://github.com/ronny3050).

![Phone Visualization](https://github.com/ronny3050/phone-notification-mirror/blob/master/.github/full_preview.png)

## Getting Started
Firstly, a [Pushbullet](https://www.pushbullet.com/) app is required on the phone. After downloading and installing the application on your phone, get a Pushbullet Access Token from your Account Settings.

## Installing the module
This module has no dependencies !! :D
To install the module, just clone this repository to your __modules__ folder: `git clone https://github.com/prasanthsasikumar/MMM-PushBullet.git`.
Then run `cd phone_notification` and `npm install` which will install the dependencies.

## Using the module

To use this module, add it to the modules array in the `config/config.js` file:
````javascript
modules: [
	{
		    module: 'MMM-PushBullet',
            position: 'bottom_left',
            header: 'Phone Notifications',
            config:{
							accessToken: '',
							numberOfNotifications: 5,
							displayNotificationIcon: true,
							displayMessage: true,
							displayCount: false,
							alertOnNotification: true,
							fade: true,
							maxCharacters: 50,
							msgType: 'sms_changed',
							mirrorType: 'mirror',
							filterJunk: true,
							msgLimit: 4,
							genLimit: 4,
							hideIfNoNotification: false
            },
	}
]
````

## Configuration options

The following properties can be configured:

<table width="100%">
	<!-- why, markdown... -->
	<thead>
		<tr>
			<th>Option</th>
			<th width="100%">Description</th>
		</tr>
	<thead>
	<tbody>
		<tr>
			<td><code>accessToken</code></td>
			<td>Your Pushbullet Access Token<br>
			</td>
		</tr>
		<tr>
			<td><code>numberOfNotifications</code></td>
			<td>Number of notifications to display at a time<br>
				<br><b>Default value:</b> <code>5</code>
				<br>If set to 0, no notification messages will be displayed.
			</td>
		</tr>
		<tr>
			<td><code>displayNoticiationIcon</code></td>
			<td>Display app icon that generated the notification<br>
				<br><b>Possible values:</b> <code>true</code> or <code>false</code>
				<br><b>Default value:</b> <code>true</code>
			</td>
		</tr>
		<tr>
			<td><code>displayMessage</code></td>
			<td>Display body of the notification<br>
				<br><b>Possible values:</b> <code>true</code> or <code>false</code>
				<br><b>Default value:</b> <code>true</code>
				<br><img src="https://github.com/ronny3050/phone-notification-mirror/blob/master/.github/message.png" width="50%" height="0.1%"></img>
			</td>
		</tr>
		<tr>
			<td><code>displayCount</code></td>
			<td>Display notification count<br>
				<br><b>Possible values:</b> <code>true</code> or <code>false</code>
				<br><b>Default value:</b> <code>true</code>
				<br><img src="https://github.com/ronny3050/phone-notification-mirror/blob/master/.github/count.png" width="50%" height="0.1%"></img>
			</td>
		</tr>
		<tr>
			<td><code>alert</code></td>
			<td>Show alerts on new notification<br>
				<br><b>Possible values:</b> <code>true</code> or <code>false</code>
				<br><b>Default value:</b> <code>true</code>
				<br>Please note that this requires the alert module to be present in the config file. For instance,
				<code>modules: [
	{
		widget: 'alert'
	}
]</code>
		<br><img src="https://github.com/ronny3050/phone-notification-mirror/blob/master/.github/alert.png" width="50%" height="2%"></img>

			</td>
		</tr>

		<tr>
			<td><code>fade</code></td>
			<td>Fade older notifications to black. (Gradient)<br>
				<br><b>Possible values:</b> <code>true</code> or <code>false</code>
				<br><b>Default value:</b> <code>true</code>
			</td>
		</tr>
		<tr>
			<td><code>maxCharacters</code></td>
			<td>Number of characters to display per notification body<br>
				<br><b>Default value:</b> <code>50</code>
			</td>
		</tr>

	</tbody>
</table>
