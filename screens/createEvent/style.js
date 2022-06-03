import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
    geofenceArea: {
        backgroundColor: '#234',
        height: '50%',
        minHeight: Dimensions.get('screen').height / 2,
        padding: '10%',
        justifyContent: "space-around",
    },
    createEventButton: {
        backgroundColor: '#ff0066',
        height: '15%',
        maxHeight: 50,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: "bold"
    },
    text: {
        color: '#fff',
        fontWeight: "bold"
    },
    address: {
        color: '#fff',
    },
    input: {
        color: '#fff',
        height: '15%',
        maxHeight: 50,
        borderWidth: 1,
        borderColor: '#fff',
        
        padding: 10,
    },
    shortInput: {
        color: '#fff',
        height: '100%',
        maxHeight: 50,
        borderWidth: 1,
        borderColor: '#fff',
        
        padding: 10,
    },
    positionInputs: {
        width: '100%',
        height: '15%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        //backgroundColor: '#ff0066'
    },
    radiusView: {
        width: '100%',
        height: '15%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
});

export default styles