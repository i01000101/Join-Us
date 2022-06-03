import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    mainView: {
        backgroundColor: '#333',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        
    },
    centerView: {
        height: '40%',
        width: '100%',
        display: "flex",
        flexDirection: "column",
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    buttonView: {
        width: '100%',
        display: "flex",
        flexDirection: "row",
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    box: {
        width: '30%',
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        backgroundColor: '#222',
    },
    logoBox: {
        borderRadius: 30,
        width: '90%', 
        alignItems: 'center',
        backgroundColor: '#222',
    },
    createEventButton: {
        backgroundColor: '#fff',
        height: '30%',
        width: '90%',
        maxHeight: 50,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title : {
        color: '#fff',
        fontWeight: "bold",
        fontSize: 75,
    },
    subTitle : {
        color: '#fff',
        fontWeight: "bold",
        textAlign: "center"
    },
    buttonText: {
        color: '#000',
        fontWeight: "bold"
    },
});

export default styles