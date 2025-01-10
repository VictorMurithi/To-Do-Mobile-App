import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();
  // Static data for tasks
  const tasks = [
    { id: "1", title: "Complete React Native Project", dueDate: "Jan 10, 2025", status: "Pending" },
    { id: "2", title: "Review Pull Requests", dueDate: "Jan 11, 2025", status: "Completed" },
    { id: "3", title: "Prepare Presentation", dueDate: "Jan 12, 2025", status: "Pending" },
  ];

  // Static data for categories
  const categories = [
    { id: "1", name: "To-do", icon: "checkmark-circle-outline" },
    { id: "2", name: "Pending", icon: "time-outline" },
    { id: "3", name: "Completed", icon: "checkmark-done-circle-outline" },
  ];

  return (
    <View style={styles.container}>
      {/* Greeting Section */}
      <View style={styles.greetingContainer}>
        <Text style={styles.greetingText}>Hello,</Text>
        <Text style={styles.subGreetingText}>Welcome to TaskLister!</Text>
      </View>

      {/* Task Overview Section */}
      <View style={styles.taskOverview}>
        <Text style={styles.sectionTitle}>My Tasks</Text>
        {/* Display tasks in a scrollable list */}
        <FlatList
          data={tasks} // Data source for the list
          keyExtractor={(item) => item.id} // Unique key for each item
          renderItem={({ item }) => (
            <View style={styles.taskCard}>
              {/* Task header with title and status */}
              <View style={styles.taskCardHeader}>
                <Text style={styles.taskTitle}>{item.title}</Text>
                <Text
                  style={[
                    styles.taskStatus,
                    item.status === "Completed" && styles.taskStatusCompleted, // Style change based on status
                  ]}
                >
                  {item.status}
                </Text>
              </View>
              {/* Task due date */}
              <Text style={styles.taskDueDate}>Due: {item.dueDate}</Text>
            </View>
          )}
          showsVerticalScrollIndicator={false} // Hide scroll indicator
        />
      </View>

      {/* Categories Section */}
      <View style={styles.categoriesContainer}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <FlatList
          horizontal
          data={categories} // Data source for the list
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.categoryCard}>
              <Ionicons name={item.icon as "checkmark-circle-outline" | "time-outline" | "checkmark-done-circle-outline"} size={24} color="#0D47A1" />
              <Text style={styles.categoryText}>{item.name}</Text>
            </TouchableOpacity>
          )}
          showsHorizontalScrollIndicator={false} // Hide scroll indicator
        />
      </View>

      <TouchableOpacity
        style={styles.add}
        onPress={() => router.push("/addTask")}
        >
        <Ionicons name="add" size={32} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  // Overall container styling
  container: {
    flex: 1,
    backgroundColor: "#E3F2FD",
    padding: 20,
  },
  // Greeting section styling
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
  // Task overview section styling
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
    color: "#FF5722", // Orange color for "Pending" tasks
  },
  taskStatusCompleted: {
    color: "#4CAF50", // Green color for "Completed" tasks
  },
  taskDueDate: {
    marginTop: 5,
    fontSize: 14,
    color: "#757575", // Gray color for due date text
  },
  // Categories section styling
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
  // Floating action button styling
  add: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#0D47A1", // Blue background for the button
    width: 60,
    height: 60,
    borderRadius: 30, // Circular shape
    alignItems: "center",
    justifyContent: "center",
    elevation: 5, // Shadow effect
  },
});
