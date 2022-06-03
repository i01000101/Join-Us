import React, { useState } from 'react'
import { PermissionsAndroid, ToastAndroid, Alert, Text, View, TouchableOpacity, Switch } from 'react-native'

import styles from './style'

import HMSLocation from "@hmscore/react-native-hms-location"

async function requestForPermissons() {
    try {
      const userResponse = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION
      ])
      if (
        userResponse["android.permission.ACCESS_COARSE_LOCATION"] ==
          PermissionsAndroid.RESULTS.DENIED ||
        userResponse["android.permission.ACCESS_COARSE_LOCATION"] ==
          PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN ||
        userResponse["android.permission.ACCESS_FINE_LOCATION"] ==
          PermissionsAndroid.RESULTS.DENIED ||
        userResponse["android.permission.ACCESS_FINE_LOCATION"] ==
          PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN ||
        userResponse["android.permission.ACCESS_BACKGROUND_LOCATION"] ==
          PermissionsAndroid.RESULTS.DENIED ||
        userResponse["android.permission.ACCESS_BACKGROUND_LOCATION"] ==
          PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN
      ) {
        Alert.alert(
          "Permission !",
          "Please allow permissions to use this app")
      }
    } catch(err) {
      console.log(err);
    }
  }



export default function Home({ navigation }) {
    
    const [availablity, setAvailablity] = useState(false)
    const [handleGeofenceEvent, setHandleGeofenceEvent] = useState(null)

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            requestForPermissons()
        })
    
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe
    }, [navigation])

    
    function changeAvailablity(){
        
        if(!availablity) {
            setHandleGeofenceEvent(
              (geo) => {
                ToastAndroid.show(
                    "You have an event!",
                    ToastAndroid.SHORT
                )
              }
            )

            
        HMSLocation.Geofence.Events.addGeofenceEventListener(handleGeofenceEvent)

        } else {
          
            HMSLocation.Geofence.Events.removeGeofenceEventListener(handleGeofenceEvent)
            
        }

        setAvailablity(previousState => !previousState)
        
    }


    return (
        <View style={styles.mainView}>
            <View style={styles.centerView}>
                <View style={styles.logoBox}>
                    <Text style={styles.title}>Join Us!</Text>
                </View>
                <View style={styles.buttonView}>
                    <View style={styles.box}>
                        <Text style={styles.subTitle}>I'm {availablity?'':'not '}looking for events!</Text>
                        <Switch
                        thumbColor="#fff"
                        trackColor={{ false: "#555", true: "#555" }}
                        onValueChange={() => changeAvailablity()}
                        value={availablity}
                        />
                    </View>
                    <View style={styles.box}>
                        <TouchableOpacity
                        onPress={() => {navigation.navigate('CreateEvent')}}
                        style = {styles.createEventButton}
                        >
                            <Text style={styles.buttonText}>Create Event</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}