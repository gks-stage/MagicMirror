# MMM-PushBullet Configurable Notification Mirroring
Displays and alerts mirror users on new phone notifications which are configurable.
This module is heavily based on [phone-notification-mirror](https://github.com/ronny3050/phone-notification-mirror) by [ronny3050](https://github.com/ronny3050).

Notifications can be split into two parts, SMS and app notifications. In a country like INDIA, we get a lot of SMS rather than app notifications. Hence the division.
Number of entries in both types are configurable.


## Getting Started
Firstly, a [Pushbullet](https://www.pushbullet.com/) app is required on the phone. After downloading and installing the application on your phone, get a Pushbullet Access Token from your Account Settings.

## Installing the module
[ws - WebSocket](https://www.npmjs.com/package/ws)
To install the module, just clone this repository to your __modules__ folder: `git clone https://github.com/prasanthsasikumar/MMM-PushBullet.git`.
Then run `cd MMM-PushBullet` and `npm install` which will install the dependencies.

## Using the module

To use this module, add it to the modules array in the `config/config.js` file:
````javascript
modules: [
	{
		    module: 'MMM-PushBullet',
            position: 'top_left',
            header: 'Phone Notifications',
            config:{
							accessToken: '',
					    displayNotificationIcon: true,
					    alertOnNotification: true,
					    fade: true,
					    maxCharacters: 50,
					    filterJunkMsg: true,
					    msgLimit: 4,
					    genLimit: 4,
					    hideIfNoNotification: false,
					    msgType: 'sms_changed',
					    mirrorType: 'mirror'
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
			<td>Your Pushbullet Access Token https://www.pushbullet.com/#settings<br>
			</td>
		</tr>
		<tr>
			<td><code>displayNotificationIcon</code></td>
			<td>Display the icon of incomming notification<br>
				<br><b>Possible values:</b> <code>true</code> or <code>false</code>
				<br><b>Default value:</b> <code>true</code>
				<br>If set to false, no icons will be displayed aganist notifications.
			</td>
		</tr>
		<tr>
			<td><code>alertOnNotification</code></td>
			<td>Show a brief popup when notification arrives<br>
				<br><b>Possible values:</b> <code>true</code> or <code>false</code>
				<br><b>Default value:</b> <code>true</code>
			</td>
		</tr>
		<tr>
			<td><code>fade</code></td>
			<td>Enable a fade effect to the list<br>
				<br><b>Possible values:</b> <code>true</code> or <code>false</code>
				<br><b>Default value:</b> <code>true</code>
			</td>
		</tr>
		<tr>
			<td><code>maxCharacters</code></td>
			<td>Configure the maximum charectors that needs to be displayed in the screen<br>
				<br><b>Default value:</b> <code>50</code>
			</td>
		</tr>
		<tr>
			<td><code>filterJunkMsg</code></td>
			<td>Checks if the receipent is a valid entity.
			<br>In India, junk sms usually comes like XX-XXXXXXX.There will be a - in between. This will ignore such messages<br>
				<br><b>Possible values:</b> <code>true</code> or <code>false</code>
				<br><b>Default value:</b> <code>true</code>
			</td>
		</tr>

		<tr>
			<td><code>msgLimit</code></td>
			<td>Number of recent sms notifications to be displayed<br>
				<br><b>Default value:</b> <code>4</code>
			</td>
		</tr>
		<tr>
			<td><code>genLimit</code></td>
			<td>Number of recent app notifications to be displayed <br>
				<br><b>Default value:</b> <code>4</code>
			</td>
		</tr>
		<tr>
			<td><code>hideIfNoNotification</code></td>
			<td> True :Hides the module if no notification is present <br>
				   False : Shows message : "No new Notifications"<br>
			</td>
		</tr>

	</tbody>
</table>

## For Developers
Though I've tried my best, code seems not very structured. Good luck! :D
