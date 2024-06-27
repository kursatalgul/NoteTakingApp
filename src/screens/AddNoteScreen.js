import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  SafeAreaView,
  StyleSheet,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import ButtonTouchableOpacity from "../component/ButtonTouchableOpacity";

const AddNoteScreen = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigation = useNavigation();

  const handleSaveNote = async () => {
    if (!title || !content) {
      Alert.alert("Both fields are required");
      return;
    }

    const newNote = {
      title,
      content,
      date: new Date().toISOString(),
    };

    try {
      const existingNotes = await AsyncStorage.getItem("notes");
      const notes = existingNotes ? JSON.parse(existingNotes) : [];
      notes.push(newNote);
      await AsyncStorage.setItem("notes", JSON.stringify(notes));
      navigation.goBack();
    } catch (error) {
      console.error("Error saving note", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Content"
        value={content}
        onChangeText={setContent}
        style={styles.input}
      />
      <View style={{ alignItems: "flex-end" }}>
        <ButtonTouchableOpacity
          text="Save Note"
          width={110}
          height={60}
          onPress={handleSaveNote}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#ffd700",
  },
  input: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
});

export default AddNoteScreen;
