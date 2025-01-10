import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

interface Task {
  id: string;
  title: string;
  dueDate: string;
  description: string;
  status: string;
}

export default function AddTask() {
  const [title, setTitle] = useState<string>("");
  const [date, setDate] = useState<Date>(new Date());
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  const router = useRouter();
  const categories = ["To-do", "Pending", "Completed"];

  const saveTask = async () => {
    if (!title || !category) {
      Alert.alert("Error", "Title and category are required.");
      return;
    }

    const newTask: Task = {
      id: Date.now().toString(),
      title,
      dueDate: date.toISOString().split('T')[0],  // Ensuring consistent date format
      description,
      status: category,
    };

    try {
      const existingTasks = await AsyncStorage.getItem("tasks");
      const tasks: Task[] = existingTasks ? JSON.parse(existingTasks) : [];
      tasks.push(newTask);
      await AsyncStorage.setItem("tasks", JSON.stringify(tasks));
      Alert.alert("Success", "Task added successfully!");
      router.push("/");
    } catch (error) {
      Alert.alert("Error", "Failed to save the task.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Title Section */}
      <View style={styles.inputSection}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter task title"
          placeholderTextColor="#757575"
          value={title}
          onChangeText={setTitle}
        />
      </View>

      {/* Date Section */}
      <View style={styles.inputSection}>
        <Text style={styles.label}>Date</Text>
        <TouchableOpacity
          onPress={() => setShowDatePicker(true)}
          style={styles.datePickerButton}
        >
          <Text style={styles.datePickerText}>
            {date.toDateString() || "Select a due date"}
          </Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={(selectedDate: any) => {
              setShowDatePicker(false);
              if (selectedDate) setDate(selectedDate);
            }}
          />
        )}
      </View>

      {/* Description Section */}
      <View style={styles.inputSection}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Enter task description"
          placeholderTextColor="#757575"
          multiline
          value={description}
          onChangeText={setDescription}
        />
      </View>

      {/* Category Section */}
      <View style={styles.inputSection}>
        <Text style={styles.label}>Category</Text>
        <View style={styles.categoryRow}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoryButton,
                category === cat && styles.selectedCategory,
              ]}
              onPress={() => setCategory(cat)}
            >
              <Text
                style={[
                  styles.categoryText,
                  category === cat && styles.selectedCategoryText,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Create Task Button */}
      <TouchableOpacity style={styles.createTaskButton} onPress={saveTask}>
        <Text style={styles.createTaskButtonText}>Create Task</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E3F2FD",
    padding: 20,
  },
  inputSection: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0D47A1",
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 8,
    fontSize: 16,
    color: "#0D47A1",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  datePickerButton: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 8,
  },
  datePickerText: {
    fontSize: 16,
    color: "#757575",
  },
  categoryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  categoryButton: {
    backgroundColor: "#BBDEFB",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  selectedCategory: {
    backgroundColor: "#0D47A1",
  },
  categoryText: {
    fontSize: 16,
    color: "#0D47A1",
  },
  selectedCategoryText: {
    color: "#FFFFFF",
  },
  createTaskButton: {
    backgroundColor: "#0D47A1",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  createTaskButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});
