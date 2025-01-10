import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";

interface Task {
  id: string;
  title: string;
  dueDate: string;
  description: string;
  status: string;
}

interface Category {
  id: string;
  name: string;
  icon: "checkmark-circle-outline" | "time-outline" | "checkmark-done-circle-outline";
}

export default function Index() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  
  const categories: Category[] = [
    { id: "1", name: "To-do", icon: "checkmark-circle-outline" },
    { id: "2", name: "Pending", icon: "time-outline" },
    { id: "3", name: "Completed", icon: "checkmark-done-circle-outline" },
  ];

  const loadTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem("tasks");
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks) as Task[]);
      }
    } catch (error) {
      console.error("Error loading tasks:", error);
    }
  };

  const handleDelete = async (taskId: string) => {
    try {
      const updatedTasks = tasks.filter((task) => task.id !== taskId);
      await AsyncStorage.setItem("tasks", JSON.stringify(updatedTasks));
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <GestureHandlerRootView>
      <ScrollView>
      <View style={styles.container}>
      <View style={styles.greetingContainer}>
        <Text style={styles.greetingText}>Hello,</Text>
        <Text style={styles.subGreetingText}>Welcome to TaskLister!</Text>
      </View>

      <View style={styles.taskOverview}>
        <Text style={styles.sectionTitle}>My Tasks</Text>
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.taskCard}>
              <View style={styles.taskCardHeader}>
                <Text style={styles.taskTitle}>{item.title}</Text>
                <Text
                  style={[
                    styles.taskStatus,
                    item.status === "Completed" && styles.taskStatusCompleted,
                  ]}
                >
                  {item.status}
                </Text>
              </View>
              <Text style={styles.taskDueDate}>Date: {item.dueDate}</Text>
              <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.id)}>
                <Ionicons name="trash" size={20} color="#D32F2F" />
              </TouchableOpacity>
            </View>
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>

      <View style={styles.categoriesContainer}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <FlatList
          horizontal
          data={categories}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.categoryCard}>
              <Ionicons
                name={item.icon}
                size={24}
                color="#0D47A1"
              />
              <Text style={styles.categoryText}>{item.name}</Text>
            </TouchableOpacity>
          )}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <TouchableOpacity
        style={styles.add}
        onPress={() => router.push("/addTask")}
      >
        <Ionicons name="add" size={32} color="white" />
      </TouchableOpacity>
    </View>
      </ScrollView>
    </GestureHandlerRootView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E3F2FD",
    padding: 20,
  },
  greetingContainer: {
    marginTop: 30,
  },
  greetingText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#0D47A1",
  },
  subGreetingText: {
    fontSize: 18,
    color: "#0D47A1",
    marginTop: 5,
  },
  taskOverview: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0D47A1",
    marginBottom: 10,
  },
  taskCard: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  taskCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0D47A1",
  },
  taskStatus: {
    fontSize: 14,
    color: "#FF5722",
  },
  taskStatusCompleted: {
    color: "#4CAF50",
  },
  taskDueDate: {
    marginTop: 5,
    fontSize: 14,
    color: "#757575",
  },
  categoriesContainer: {
    marginTop: 30,
  },
  categoryCard: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 20,
  },
  categoryText: {
    marginTop: 5,
    fontSize: 15,
    color: "#0D47A1",
  },
  add: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#0D47A1",
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
  deleteButton: {
    backgroundColor: "#FFCDD2",
    borderRadius: 50,
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
    // alignSelf: "flex-end",
    marginTop: 10,
  },
});

