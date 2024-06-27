import React, { useContext, useEffect, useState } from "react";
import { View, SafeAreaView, Button, Alert, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import InputText from "../component/InputText";
import ButtonTouchableOpacity from "../component/ButtonTouchableOpacity";
import axios from "axios";
import { NotesContext } from "../context/NotesContext";
import { api } from "../services/api";

const EditNoteScreen = ({ route, navigation }) => {
  const { note, index } = route.params;
  console.log("🚀 ~ EditNoteScreen ~ note:", note.id);
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const { notes, setNotes } = useContext(NotesContext);
  const handleSave = async () => {
    if (!title || !content) {
      Alert.alert("Validation Error", "Title and content cannot be empty");
      return;
    }
    api
      .put(`/posts/${note.id}`, {
        id: note.id,
        title: title,
        content: content,
        date: new Date(),
      })
      .then((res) => {
        console.log(res);
        const tempNote = notes.find((tempNote) => tempNote.id === note.id);
        setNotes([
          {
            ...tempNote,
            title: title,
          },
          ...notes.filter((oldNote) => oldNote.id !== note.id),
        ]);
        navigation.goBack();
      })
      .catch((err) => console.log(err));
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
