import {View, Text, TextInput, TouchableOpacity} from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'

export default function AddTask() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>AddTask</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E3F2FD',
        padding: 20,
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
})