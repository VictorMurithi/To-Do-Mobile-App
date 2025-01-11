import { View, Text, StyleSheet, FlatList } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Task {
    id: string;
    title: string;
    dueDate: string;
    description: string;
    status: string;
}

export default function CompleteTasks() {
    const [tasks, setTasks] = useState<Task[]>([]);

    // Load tasks from AsyncStorage
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const storedTasks = await AsyncStorage.getItem("tasks");
                if (storedTasks) {
                    setTasks(JSON.parse(storedTasks) as Task[]);
                }
            } catch (error) {
                console.error("Error loading tasks:", error);
            }
        };
        fetchTasks();
    }, []); // Added dependency array to avoid multiple fetches

    const completedTasks = tasks.filter(task => task.status === "Completed");
    console.log(completedTasks);

    return (
        <View style={styles.container}>
            {/* Title Section */}
            <View style={styles.header}>
                <Text style={styles.headerText}>Completed Tasks</Text>
            </View>

            {/* List of Completed Tasks */}
            <FlatList
                data={completedTasks}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.taskCard}>
                        <Text style={styles.taskTitle}>{item.title}</Text>
                        <Text style={styles.taskDetail}>Date: {item.dueDate}</Text>
                        <Text style={styles.taskDescription}>{item.description}</Text>
                        <Text style={styles.taskStatus}>Status: {item.status}</Text>
                    </View>
                )}
                ListEmptyComponent={
                    <View style={styles.noTasksContainer}>
                        <Text style={styles.noTasksText}>No completed tasks available</Text>
                    </View>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E3F2FD",
        padding: 20,
    },
    header: {
        marginBottom: 20,
    },
    headerText: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#0D47A1",
        textAlign: "center",
    },
    taskCard: {
        backgroundColor: "white",
        borderRadius: 8,
        padding: 16,
        marginBottom: 12,
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    taskTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#0D47A1",
        marginBottom: 8,
    },
    taskDetail: {
        fontSize: 14,
        color: "#1976D2",
        marginBottom: 4,
    },
    taskDescription: {
        fontSize: 14,
        color: "#424242",
        marginBottom: 4,
    },
    taskStatus: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#2E7D32",
    },
    noTasksContainer: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
    },
    noTasksText: {
        fontSize: 16,
        color: "#757575",
    },
});
