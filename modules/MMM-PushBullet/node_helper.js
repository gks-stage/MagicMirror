/**
 * Created by debayan on 7/25/16.
 */

var WebSocket = require('ws');
var NodeHelper = require('node_helper');
//TODO check if any issue for not closing
//TODO allignment and cssanimations
//TODO prevent multile entries that are same
var msg = {
  "type": "push",
  "push": {
    "type": "sms_changed",
    "source_device_iden": "ujCdIlzqcUKsjAbG9SO9ts",
    "notifications": [{
      "thread_id": "515",
      "title": "My Idea",
      "body": "61",
      "timestamp": 1475084803
    }]
  }
}

var obj = {
  "type": "push",
  "targets": ["stream"],
  "push": {
    "type": "mirror",
    "source_device_iden": "ujCdIlzqcUKsjAbG9SO9ts",
    "source_user_iden": "ujCdIlzqcUK",
    "client_version": 268,
    "dismissible": true,
    "icon": "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",
    "title": "PRASANTH S",
    "body": "143prasanths@gmail.com\nTomorrow\nIt is confirmed!.Get Ready and Pack up. Well be waiting......................................\n",
    "application_name": "Inbox",
    "package_name": "com.google.android.apps.inbox",
    "notification_id": "0",
    "notification_tag": "143prasanths@gmail.com",
    "actions": [{
      "label": "Done",
      "trigger_key": "com.google.android.apps.inbox_0_143prasanths@gmail.com_Done"
    }, {
      "label": "Reply",
      "trigger_key": "com.google.android.apps.inbox_0_143prasanths@gmail.com_Reply"
    }]
  }
}

var app = {
  "type": "push",
  "targets": ["stream"],
  "push": {
    "type": "mirror",
    "source_device_iden": "ujCdIlzqcUKsjAbG9SO9ts",
    "source_user_iden": "ujCdIlzqcUK",
    "client_version": 268,
    "dismissible": true,
    "icon": "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",
    "title": "Facebook",
    "body": "Kannan Parthasarathi is live now: \"IBS cricket league prize distribution...\nD-Company won the...\".\n",
    "application_name": "Facebook",
    "package_name": "com.facebook.katana",
    "notification_id": "0",
    "notification_tag": "c3Rvcnk6MTAwMDAxMjI3ODE1MDgxOjE0NzUxNTIwNzM1Njc4NDg6NDUxNzYxNzExNTI2Njg3"
  }
}

var call = {
  "type": "push",
  "targets": ["stream"],
  "push": {
    "type": "mirror",
    "source_device_iden": "ujCdIlzqcUKsjAbG9SO9ts",
    "source_user_iden": "ujCdIlzqcUK",
    "client_version": 268,
    "dismissible": true,
    "icon": "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",
    "title": "Incoming call",
    "body": "Amma",
    "application_name": "Pushbullet",
    "package_name": "com.pushbullet.android",
    "notification_id": "6",
    "actions": [{
      "label": "End call",
      "trigger_key": "com.pushbullet.android_6_null_End call"
    }]
  }
}

var another = {
  "type": "push",
  "targets": ["stream"],
  "push": {
    "type": "mirror",
    "source_device_iden": "ujCdIlzqcUKsjAbG9SO9ts",
    "source_user_iden": "ujCdIlzqcUK",
    "client_version": 268,
    "dismissible": true,
    "icon": "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",
    "title": "Bitcoin and Cryptocurrency Technologies Course Team",
    "body": "143prasanths@gmail.com\nWelcome to Bitcoin and Cryptocurrency Technologies\nHi Prasanth Prashu! Welcome to the MOOC on Bitcoin and Cryptocurrency Technologies where we cut through the hype and get to the core of what makes Bitcoin and i\n",
    "application_name": "Inbox",
    "package_name": "com.google.android.apps.inbox",
    "notification_id": "0",
    "notification_tag": "143prasanths@gmail.com",
    "actions": [{
      "label": "Done",
      "trigger_key": "com.google.android.apps.inbox_0_143prasanths@gmail.com_Done"
    }, {
      "label": "Reply",
      "trigger_key": "com.google.android.apps.inbox_0_143prasanths@gmail.com_Reply"
    }]
  }
}

var youtube = {
  "type": "push",
  "targets": ["stream"],
  "push": {
    "type": "mirror",
    "source_device_iden": "ujCdIlzqcUKsjAbG9SO9ts",
    "source_user_iden": "ujCdIlzqcUK",
    "client_version": 268,
    "dismissible": true,
    "icon": "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",
    "title": "YouTube",
    "body": "Take it offline. New video from HardwareCanucks: Logitech Prodigy Gaming Mouse & Keyboard - Simple Yet Sexy\n",
    "application_name": "YouTube",
    "package_name": "com.google.android.youtube",
    "notification_id": "0",
    "notification_tag": "TzLRZUgelatKZ4nyIKcAbg",
    "actions": [{
      "label": "Save Offline",
      "trigger_key": "com.google.android.youtube_0_TzLRZUgelatKZ4nyIKcAbg_Save Offline"
    }, {
      "label": "Options",
      "trigger_key": "com.google.android.youtube_0_TzLRZUgelatKZ4nyIKcAbg_Options"
    }]
  }
}



module.exports = NodeHelper.create({
  start: function() {
    console.log(this.name + ' helper started ...');
    //this.testCall();
    //this.testApp();
  },

  testCall: function() {
    var self = this;
    setTimeout(function() {
      console.log("Calling");
      self.sendSocketNotification('DATA_RECEIVED', call);
    }, 5000)
  },

  testApp: function() {
    var self = this;
    msg.push.notifications[0].body++;
    self.sendSocketNotification('DATA_RECEIVED', msg);
    self.sendSocketNotification('DATA_RECEIVED', youtube);
    setTimeout(function() {
      self.testApp();
    }, 2000);
  },

  socketNotificationReceived: function(notification, payload) {
    if (notification === "CONFIG") {
      this.config = payload;
      var ws = new WebSocket('wss://stream.pushbullet.com/websocket/' +
        this.config.accessToken);
      var self = this;
      ws.on('message', function(data, flags) {
        var msg = JSON.parse(data);
        console.log(msg.type);
        console.log(JSON.stringify(msg));

        if (msg.type === "push") {
          self.sendSocketNotification('DATA_RECEIVED', msg);
        }

      });
    }
  }
});
