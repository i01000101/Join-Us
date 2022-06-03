/**
 * @format
 */

import {AppRegistry} from 'react-native'
import App from './App'
import {name as appName} from './app.json'

import HMSLocation from '@hmscore/react-native-hms-location'

import { HmsLocalNotification, HmsPushEvent } from'@hmscore/react-native-hms-push'


const notification = {
    [HmsLocalNotification.Attr.title]: 'You have event invitations!',
    [HmsLocalNotification.Attr.message]: 'Please Join Us!',
    [HmsLocalNotification.Attr.largeIcon]: 'ic_launcher',
    [HmsLocalNotification.Attr.smallIcon]: 'ic_notification',
    [HmsLocalNotification.Attr.bigText]: 'Event!',
    [HmsLocalNotification.Attr.subText]: 'Event Invitation!',
    [HmsLocalNotification.Attr.color]: 'white',
    [HmsLocalNotification.Attr.vibrate]: true,
    [HmsLocalNotification.Attr.vibrateDuration]: 500,
    [HmsLocalNotification.Attr.tag]: 'hms_tag',
    [HmsLocalNotification.Attr.ongoing]: false,
    [HmsLocalNotification.Attr.importance]: HmsLocalNotification.Importance.max,
    [HmsLocalNotification.Attr.dontNotifyInForeground]: false,
    [HmsLocalNotification.Attr.autoCancel]: false,
    [HmsLocalNotification.Attr.actions]: '["Join", "Reject"]'
}


HMSLocation.Geofence.Events.registerGeofenceHeadlessTask((data) =>
    {
        HmsLocalNotification.localNotification(notification)
        .then((result) => {
            console.log("LocalNotification success: " + JSON.stringify(result, null, 3))
        })
        .catch((err) => {
            console.log("LocalNotification error", err)
        })
    }    
)

HmsPushEvent.onNotificationOpenedApp(
    (result) => {
      
        var notification = result.extras.notification
        
        if (notification.action == "Join") {
            
            HmsLocalNotification.cancelAllNotifications()
            .then((result) => {
                console.log("cancelAllNotifications" + result);
            })
            .catch((err) => {
                console.log("[cancelAllNotifications] Error/Exception: " + JSON.stringify(err));
            })
            
        }
    }
);

AppRegistry.registerComponent(appName, () => App);
