import React, { useState } from "react";
import { View, SafeAreaView, Button, Alert, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import InputText from "../component/InputText";
import ButtonTouchableOpacity from "../component/ButtonTouchableOpacity";

const EditNoteScreen = ({ route, navigation }) => {
  const { note, index } = route.params;
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  const handleSave = async () => {
    if (!title || !content) {
      Alert.alert("Validation Error", "Title and content cannot be empty");
      return;
    }

    try {
      const existingNotes = await AsyncStorage.getItem("notes");
      const notes = existingNotes ? JSON.parse(existingNotes) : [];
      notes[index] = { title, content };
      await AsyncStorage.setItem("notes", JSON.stringify(notes));
      Alert.alert("Success", "Note updated successfully");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "An error occurred while updating the note");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <InputText
          placeholder="Title"
          onChangeText={(text) => setTitle(text)}
          value={title}
        />
        <InputText
          placeholder="Content"
          onChangeText={(text) => setContent(text)}
          value={content}
        />
      </View>
      <View style={{ alignItems: "flex-end" }}>
        <ButtonTouchableOpacity
          text="Save Note"
          width={110}
          height={60}
          onPress={handleSave}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffd700",
    flex: 1,
    padding: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
});

export default EditNoteScreen;
