import {Text,View} from 'react-native'
import { StyleSheet } from 'react-native'

export default function TaskDate() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Task and Date</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container :{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E3F2FD',
    },
    text : {
        color: '#0D47A1',
        textAlign: 'center',
        fontSize: 20
    }
  });