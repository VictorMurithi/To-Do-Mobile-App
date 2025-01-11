import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Calendar } from 'react-native-calendars';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Task {
    id: string;
    title: string;
    dueDate: string; // Ensure it's always in YYYY-MM-DD format
    description: string;
    status: string;
}

export default function TaskDate() {
    const router = useRouter();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [tasks, setTasks] = useState<Task[]>([]);

    // Load tasks from AsyncStorage
    const loadTasks = async () => {
        try {
            const storedTasks = await AsyncStorage.getItem('tasks');
            if (storedTasks) {
                setTasks(JSON.parse(storedTasks));
            }
        } catch (error) {
            console.error('Error loading tasks:', error);
        }
    };

    useEffect(() => {
        loadTasks();
    }, []);

    // Format the selected date to 'YYYY-MM-DD' for easier comparison
    const currentDate = selectedDate.toISOString().split('T')[0];

    // Filter tasks based on selected date
    const filteredTasks = tasks.filter(task => task.dueDate === currentDate);

    return (
        <View style={styles.container}>
            {/* Calendar Section */}
            <View style={styles.calendarContainer}>
                <Calendar
                    style={styles.calendar}
                    onDayPress={(day: { dateString: string }) => setSelectedDate(new Date(day.dateString))}
                    markedDates={{
                        [currentDate]: { selected: true, selectedColor: '#0D47A1' }
                    }}
                />
            </View>

            {/* Task List Section */}
            <View style={styles.taskListContainer}>
            <FlatList
                data={filteredTasks}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                <View style={styles.taskCard}>
                    <Text style={styles.text}>{item.title}</Text>
                </View>
                )}
                ListEmptyComponent={
                <View style={styles.noTasksContainer}>
                    <Text style={styles.noTasksText}>No tasks for this day</Text>
                </View>
                }
                contentContainerStyle={{ paddingBottom: 16 }}
            />

            </View>


            {/* Add Task Button */}
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => router.push('/addTask')}
            >
                <Ionicons name="add-circle" size={40} color="#0D47A1" />
                <Text style={styles.addText}>Add Task</Text>
            </TouchableOpacity>
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
    calendarContainer: {
        width: '100%',
        padding: 16,
    },
    calendar: {
        borderRadius: 4,
        elevation: 5,
    },
    taskListContainer: {
        flex: 1,
        width: '90%',
    },
    taskCard: {
        padding: 16,
        backgroundColor: 'white',
        marginVertical: 8,
        marginHorizontal: 8,
        borderRadius: 8,
        elevation: 2,
        borderLeftWidth: 4,
        borderLeftColor: '#0D47A1',
    },    
    text: {
        color: '#0D47A1',
        textAlign: 'center',
        fontSize: 20,
    },
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
    noTasksContainer: {
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E3F2FD',
    },
    noTasksText: {
        fontSize: 18,
        color: '#0D47A1',
        textAlign: 'center',
    },
});
