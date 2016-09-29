/**
 *Created by PSK 27/09/16
 * based on debayan's
 */

/**
Approach:  There are two queues : One for messages and one for the rest of the notifications.
*/

Module.register("MMM-PushBullet", {
  defaults: {
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

  payload: [],

  start: function() {
    Log.info('Starting module: ' + this.name);
    this.initialize();
    this.sendSocketNotification('CONFIG', this.config);
  },

  socketNotificationReceived: function(notification, payload) {
    var push = payload.push;
    if (notification === 'DATA_RECEIVED') {
      if (payload) {
        //console.log(JSON.stringify(payload));
        if (this.isMsg(push)) {
          this.msgQueue.push(push);
          var notifications = push.notifications[0];
          if (this.config.alertOnNotification) {
            this.showNotification(notifications.title, notifications.body);
          }
          this.lastNotificationTimeStamp = notifications.timestamp;
          this.updateDom();
        } else if (this.isCall(push)) {
          if (this.config.alertOnNotification && !this.busy) {
            this.showAlert(push.body, push.title);
            this.busy = true;
            this.busyStart = Date.now();
          }
        } else if (this.isApp(push)) {
          this.genQueue.push(push);
          if (this.config.alertOnNotification) {
            this.showNotification(push.title, push.body);
          }
          this.lastNotificationBody = push.body;
          this.updateDom();
        } else if (this.busy && push.type === 'dismissal') {
          this.sendNotification("HIDE_ALERT");
          this.busy = false;
        }
      }
    }
  },

  getDom: function() {
    var self = this;
    var wrapper = document.createElement("table");
    wrapper.className = "small bright";
    if (self.isNotificationPresent()) {
      //console.log("Notificaitions present!");
      if (self.msgQueue && self.msgQueue.length > 0) {
        var notification = self.getRequiredEntries(self.msgQueue, self.config
          .msgLimit);
        wrapper.appendChild(notification);
      }
      if (self.genQueue && self.genQueue.length > 0) {
        var notification = self.getRequiredEntries(self.genQueue,
          self.config
          .genLimit);
        wrapper.appendChild(notification);
      }
      return wrapper;
    } else if (self.hideIfNoNotification) {
      wrapper.innerHTML = this.translate("No new notifications");
      wrapper.className = "small dimmed";
      return wrapper;
    }

    return wrapper;
  },



  /*---------------------------------------------------------------
                      UTILITY METHODS
  ----------------------------------------------------------------*/



  getRequiredEntries: function(queue, limit) {
    var self = this;
    var content = null;
    this.count = 0;
    //console.log(JSON.stringify(queue));
    var msg = document.createElement("div");
    for (i = queue.length - 1;
      (i >= 0) && (queue.length - i <= limit); i--
    ) {
      var row = document.createElement("tr");
      var data = document.createElement("td");
      var textnode = null;
      if (queue[i].type === this.config.msgType) {
        var notifications = queue[i].notifications[0];
        content = notifications.title + ": " + notifications.body;
        textnode = document.createTextNode(content.substring(0,
          this.config.maxCharacters));
        data.appendChild(textnode);
      }
      if (queue[i].type === this.config.mirrorType) {
        content = queue[i].title + ": " + this.extractBody(queue[i].body);
        textnode = document.createTextNode(content);
        if (this.config.displayNotificationIcon) {
          var icon = document.createElement("img");
          icon.src = "data:image/png;base64," + queue[i].icon;
          icon.height = "25";
          icon.width = "25";
          data.appendChild(icon);
        }
        data.appendChild(textnode);
      }
      this.getFadeEffect(data, queue, limit);
      row.appendChild(data);
      msg.appendChild(row);
    }
    return msg;
  },

  showAlert: function(title, body) {
    this.sendNotification("SHOW_ALERT", {
      type: "alert",
      title: title + ": " + body
    });
  },

  showNotification: function(title, body, time) {
    this.sendNotification("SHOW_ALERT", {
      type: "notification",
      timer: time,
      title: title + ": " + body
    });
  },



  isMsg: function(push) {
    if (push.type === this.config.msgType && push.notifications[
        0] && this.lastNotificationTimeStamp !==
      push.notifications[0].timestamp && !this.isJunk(push)) {
      if (this.config.filterJunkMsg) {
        return !this.isJunk(push);
      }
      return true;
    }
    return false;
  },

  isApp: function(push) {
    if (push.type === this.config.mirrorType && (this.lastNotificationBody !==
        push.body)) {
      return true;
    }
    return false;
  },

  isCall: function(push) {
    if (push.type === this.config.mirrorType && push.title !==
      'undefined' && push.title === 'Incoming call') {
      return true;
    }
    return false;
  },

  //Returns true if there is an entry in either one of the queues
  isNotificationPresent: function() {
    var self = this;
    if (self.msgQueue && self.msgQueue.length > 0) {
      return true;
    } else if (self.genQueue && self.genQueue.length > 0) {
      return true;
    }
    return false;
  },

  /**Checks if the receipent is a valid entity. In India, junk sms usually comes like XX-XXXXXXX.
  There will be a - in between. This will ignore such messages**/
  isJunk(push) {
    var title = push.notifications[0].title;
    if (title.indexOf('-') !== -1) {
      return true;
    }
    return false;
  },

  //Extracts the portion of the data that needs to be displayed to the screen
  extractBody(body) {
    return body.substring(body.indexOf('\n'), this.config.maxCharacters);
  },

  // Create fade effect if configured so
  getFadeEffect: function(data, queue, limit) {
    if (this.config.fade) {
      var startingPoint = queue.slice(0, limit)
        .length * 0.25;
      var steps = queue.slice(0, limit)
        .length - startingPoint;
      if (this.count >= startingPoint) {
        var currentStep = this.count - startingPoint;
        data.style.opacity = 1 - (1 / steps *
          currentStep);
      }
    }
    this.count++;
  },

  /*
  This is a safety function. Just in case the connection to phone drops before the "dismissal" command is send,
  In that case, this function clears the alert after a set time period- say 30 seconds      */
  autoClearAlert: function() {
    var self = this;
    setTimeout(function() {
      var now = Date.now();
      if (self.busy && now - self.busyStart > 30000) {
        self.sendNotification("HIDE_ALERT");
        self.busy = false;
      }
      self.autoClearAlert();
    }, 1000);
  },


  initialize: function() {
    this.msgQueue = [];
    this.genQueue = [];
    this.lastNotificationTimeStamp = null;
    this.lastNotificationBody = null;
    this.busy = false;
    this.busyStart = 0;
    this.count = 0;
    this.autoClearAlert();
  }

});
