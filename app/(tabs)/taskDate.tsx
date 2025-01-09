import React, { useState } from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Calendar } from 'react-native-calendars';

export default function TaskDate() {
    // State for the currently selected date
    const [selectedDate, setSelectedDate] = useState(new Date());

    // State for the list of tasks with their corresponding dates
    const [tasks, setTasks] = useState([
        { id: '1', title: 'Task 1', date: '2025-01-10' },
        { id: '2', title: 'Task 2', date: '2025-01-10' },
        { id: '3', title: 'Task 3', date: '2025-01-11' },
    ]);

    // Format the selected date to 'YYYY-MM-DD' for easier comparison
    const currentDate = selectedDate.toISOString().split('T')[0];

    return (
        <View style={styles.container}>
            {/* Calendar Section */}
            <View style={styles.calendarContainer}>
                <Calendar
                    style={styles.calendar}
                    // Update the selected date when a day is pressed
                    onDayPress={(day: any) => setSelectedDate(new Date(day.dateString))}
                    // Highlight the currently selected date on the calendar
                    markedDates={{
                        [currentDate]: { selected: true, selectedColor: '#0D47A1' }
                    }}
                />
            </View>

            {/* Task List Section */}
            <View style={styles.taskListContainer}>
                {/* Show tasks for the selected date, or display a message if no tasks are available */}
                {tasks.filter(task => task.date === currentDate).length > 0 ? (
                    <FlatList
                        data={tasks.filter(task => task.date === currentDate)}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <View style={styles.taskCard}>
                                <Text style={styles.text}>{item.title}</Text>
                            </View>
                        )}
                    />
                ) : (
                    <Text style={styles.noTasksText}>No tasks available</Text>
                )}
            </View>

            {/* Add Task Button */}
            <TouchableOpacity style={styles.addButton}>
                <Ionicons name="add-circle" size={40} color="#0D47A1" />
                <Text style={styles.addText}>Add Task</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    // Main container style
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E3F2FD',
        padding: 20,
    },

    // Calendar container style
    calendarContainer: {
        width: '100%',
        padding: 16,
    },
    calendar: {
        borderRadius: 4,
        elevation: 5,
    },

    // Task list container style
    taskListContainer: {
        flex: 1,
        width: '90%',
    },

    // Task card style
    taskCard: {
        padding: 16,
        backgroundColor: '#BBDEFB',
        marginVertical: 4,
        borderRadius: 4,
    },

    // No tasks text style
    noTasksText: {
        color: '#0D47A1',
        textAlign: 'center',
        fontSize: 18,
    },

    // General text style
    text: {
        color: '#0D47A1',
        textAlign: 'center',
        fontSize: 20,
    },

    // Add task button style
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        elevation: 5,
        marginBottom: 20,
    },
    addText: {
        marginLeft: 8,
        color: '#0D47A1',
        fontSize: 20,
        fontWeight: 'bold',
    },
});
