import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import NotesScreen from "../screens/NotesScreen";
import NoteDetailScreen from "../screens/NoteDetailScreen";
import AddNoteScreen from "../screens/AddNoteScreen";
import EditNoteScreen from "../screens/EditNoteScreen";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Notes">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Notes" component={NotesScreen} />
        <Stack.Screen name="NoteDetail" component={NoteDetailScreen} />
        <Stack.Screen name="AddNote" component={AddNoteScreen} />
        <Stack.Screen name="EditNote" component={EditNoteScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
