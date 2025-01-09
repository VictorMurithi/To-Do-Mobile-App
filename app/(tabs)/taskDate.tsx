import React from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function TaskDate() {
    const tasks = [
        { id: '1', title: 'Task 1' },
        { id: '2', title: 'Task 2' },
        { id: '3', title: 'Task 3' },
    ];

    return (
        <View style={styles.container}>
            {/* Show the current date and add task button on the left */}
            <View style={styles.dateContainer}>
                <Text style={styles.text}>Current Date</Text>
                <TouchableOpacity style={styles.addButton}>
                    <Ionicons name="add-circle" size={32} color="#0D47A1" />
                    <Text style={styles.addText}>Add Task</Text> {/* Added text label */}
                </TouchableOpacity>
            </View>
            {/* Show the list of tasks on the day */}
            <View style={styles.taskListContainer}>
                <FlatList
                    data={tasks}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.taskCard}>
                            <Text style={styles.text}>{item.title}</Text>
                        </View>
                    )}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E3F2FD',
    },
    dateContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        width: '100%',
    },
    taskListContainer: {
        flex: 1,
        width: '100%',
    },
    text: {
        color: '#0D47A1',
        textAlign: 'center',
        fontSize: 20,
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
    },
    addText: {
        marginLeft: 8,
        color: '#0D47A1',
        fontSize: 16,
    },
    taskCard: {
        padding: 16,
        backgroundColor: '#BBDEFB',
        marginVertical: 4,
        borderRadius: 4,
    }
});
