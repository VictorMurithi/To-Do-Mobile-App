import {View, Text} from "react-native";
import {StyleSheet} from "react-native";

export default function CompleteTasks() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Complete Tasks</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E3F2FD',
        padding: 20,
    },
    text:{
        color: '#0D47A1',
        textAlign: 'center',
        fontSize: 20
    }
});