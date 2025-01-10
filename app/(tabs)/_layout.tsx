import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#0D47A1',
        headerStyle: {
          backgroundColor: '#E3F2FD',
        },
        headerShadowVisible: false,
        headerTintColor: '#0D47A1',
        tabBarStyle: {
          backgroundColor: '#E3F2FD',
        }
      }}
    >
      {/* Home Screen */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} size={24} color={color} />
          ),
        }}
      />

      {/* Task/Date Screen */}
      <Tabs.Screen
        name="taskDate"
        options={{
          title: 'Task and Date',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'calendar' : 'calendar-outline'} size={24} color={color} />
          ),
        }}
      />

      {/* Completed Screen */}
      <Tabs.Screen
        name="completeTasks"
        options={{
          title: 'Completed Tasks',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'checkmark-circle' : 'checkmark-circle-outline'} size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
