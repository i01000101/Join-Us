import React, { useState } from 'react'
import { Text, View, TouchableOpacity, TextInput, Image, Alert } from 'react-native'

import styles from './style'

import Slider from '@react-native-community/slider'

import HMSMap, { MapTypes, Gravity, HMSCircle, HMSMarker } from "@hmscore/react-native-hms-map"

import HMSLocation from '@hmscore/react-native-hms-location'

import { LogBox } from 'react-native'
LogBox.ignoreLogs(['ViewPropTypes will be removed from React Native.', 'EventEmitter.removeListener'])


export default function CreateEvent({ navigation }) {

    const [mapView, setMapView] = useState(null)
    const [radius, setRadius] = useState(0)
    const [uniqueId, setUniqueId] = useState("id1234")
    const [address, setAddress] = useState("Adress")
    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)


    const currentCircle = (
        <HMSCircle
            center={{ latitude, longitude }}
            radius={radius}
            clickable={true}
            strokeColor={[122,255,0,0]}
            fillColor={[25,80,110,250]}
            strokeWidth={8}
            visible={true}
            zIndex={2}
        />
    )

    const marker = (
        <HMSMarker
        coordinate={{ latitude, longitude }}
        icon={{
            uri: Image.resolveAssetSource(
              require("../../assets/event.png")
            ).uri,
            width: 130,
            height: 130,
        }}
      />
    )

    React.useEffect(() => {
        
        const unsubscribe = navigation.addListener('focus', () => {
            
            setEventCenterCurrentLocation()
            
        })

        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe
    }, [navigation])

    function setEventCenterCurrentLocation(){
        HMSLocation.FusedLocation.Native.getLastLocation()
            .then((pos) => {
                setLatitude(pos.latitude)
                setLongitude(pos.longitude)
                mapView.setCoordinates(
                    {
                        latitude,
                        longitude
                    }
                )
                getAddress() 
        }).catch((err) => console.log(err.message));
    }

    function getAddress(){

        let address = ''

        const getFromLocationRequest = {
            longitude,
            latitude,
            maxResults: 1
        }

        HMSLocation.Geocoder.Native.getFromLocation(getFromLocationRequest, {
            language: "en",
            country: "us"
        })
            .then((hwLocationList) => {
                if(hwLocationList.length > 0){
                    let result = hwLocationList[0]
                    addToAddress(result.street + ' ')
                    addToAddress(result.county + ' ')
                    addToAddress(result.state + '/')
                    addToAddress(result.countryName + ' ')

                    setAddress(address)
                }else{
                    console.log('There is no address ' + JSON.stringify(hwLocationList,null,4))
                }
            })
            .catch((err) => console.log('Error: ' + err.message));

        function addToAddress(part){
            if(!part.includes('undefined') && !part.includes('null') && part.substring(0,3) != 'No '
                && part.includes(part)){
                address += part
            }
        }
    }

    function createGeofence() {

        const geofence = {
            longitude,
            latitude,
            radius,
            uniqueId,
            conversions: 1,
            validContinueTime: 3600000.0,
            dwellDelayTime: 10,
            notificationInterval: 0,
        }
        const geofenceRequest = {
            geofences: [geofence],
            conversions: 1,
            coordinate: 1,
        }
        let requestId = 1288941;
        HMSLocation.Geofence.Native.createGeofenceList(
            requestId, 
            geofenceRequest.geofences,
            geofenceRequest.conversions,
            geofenceRequest.coordinate,
        )
       .then(res => {
            console.log(res)
            Alert.alert("Hey you have an event!")
        })
        .catch(err => {
            console.log(err);
        })

    }
    

    return (
        <View style={{ height: '100%' }}>
            
            <HMSMap
                style={{ height: '50%' }}
                mapType={MapTypes.TERRAIN}
                liteMode={false}
                camera={{
                    target: {
                    latitude: 41.02155220194891,
                    longitude: 29.0037998967586
                    },
                    zoom: 12,
                }}
                myLocationEnabled={true}
                myLocationButtonEnabled={true}
                logoPosition={Gravity.TOP | Gravity.START}
                logoPadding={{ paddingStart: 10, paddingTop: 10, paddingBottom: 0, paddingEnd: 0 }}
                ref={(e) => {
                    setMapView(e)
                }}
                onMyLocationButtonClick={() =>
                    setEventCenterCurrentLocation()
                }
                onMapLongClick={
                    (e) => {
                        setLatitude(e.nativeEvent.coordinate.latitude);
                        setLongitude(e.nativeEvent.coordinate.longitude);
                        getAddress()
                    }
                }
            >
                {currentCircle}
                {marker}

            </HMSMap>

            

            <View style={styles.geofenceArea}>
                <Text style={styles.text}>Event</Text>
                <TextInput
                    style={styles.input}
                    value={uniqueId}
                    placeholder="Unique ID"
                    placeholderTextColor="#fff" 
                    keyboardType="default"
                    onChangeText ={(value) => setUniqueId(value)}
                />
                <View style={styles.positionInputs}>
                    <TextInput
                        style={styles.shortInput}
                        value={latitude.toFixed(8).toString()}
                        placeholder="Latitude"
                        placeholderTextColor="#fff" 
                        keyboardType="numeric"
                        onChangeText ={(value) => {setLatitude(parseFloat(value)); getAddress()}}
                    />
                    <TextInput
                        style={styles.shortInput}
                        value={longitude.toFixed(8).toString()}
                        placeholder="Longitude"
                        placeholderTextColor="#fff" 
                        keyboardType="numeric"
                        onChangeText ={(value) => {setLongitude(parseFloat(value)); getAddress()}}
                    />
                </View>
                <View style={styles.radiusView}>
                    <Text style={styles.text}>Radius</Text>
                    <TextInput
                        style={[styles.shortInput, {borderWidth: 0}]}
                        value={radius.toString()}
                        placeholder="Radius"
                        placeholderTextColor="#fff" 
                        keyboardType="numeric"
                        onChangeText={(value) => setRadius(value != '' ? parseInt(value) : 0)}
                    />
                </View>
                
                <Slider
                    style={{width: '100%'}}
                    minimumValue={0}
                    maximumValue={5000}
                    value={radius}
                    step={1}
                    thumbTintColor="#FFFFFF"
                    minimumTrackTintColor="#FFFFFF"
                    maximumTrackTintColor="#000000"
                    onValueChange={(value) => setRadius(value)}
                />

                <Text style={styles.address}>{address}</Text>
                
                <TouchableOpacity
                onPress={() => {console.log('Event yarat');createGeofence()}}
                style = {styles.createEventButton}
                >
                    <Text style={styles.buttonText}>Create Event</Text>
                </TouchableOpacity>

                <View>
                    
                </View>
            </View>
            
        </View>
    )
}