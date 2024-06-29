import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import NotesScreen from "../screens/NotesScreen";
import NoteDetailScreen from "../screens/NoteDetailScreen";
import AddNoteScreen from "../screens/AddNoteScreen";
import EditNoteScreen from "../screens/EditNoteScreen";
import { NotesProvider } from "../context/NotesContext";
import { AuthProvider } from "../context/AuthContext";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <AuthProvider>
      <NotesProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
            initialRouteName="Login"
          >
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Notes" component={NotesScreen} />
            <Stack.Screen name="NoteDetail" component={NoteDetailScreen} />
            <Stack.Screen name="AddNote" component={AddNoteScreen} />
            <Stack.Screen name="EditNote" component={EditNoteScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </NotesProvider>
    </AuthProvider>
  );
};

export default AppNavigator;
