import React, { useContext, useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  Button,
  Alert,
  StyleSheet,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import InputText from "../component/InputText";
import ButtonTouchableOpacity from "../component/ButtonTouchableOpacity";
import axios from "axios";
import { NotesContext } from "../context/NotesContext";
import { api } from "../services/api";
import Header from "../component/Header";

const EditNoteScreen = ({ route, navigation }) => {
  const { note, index } = route.params;
  console.log("🚀 ~ EditNoteScreen ~ note:", note.id);
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const { notes, setNotes } = useContext(NotesContext);
  const handleSave = async () => {
    console.log(content, title);
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
        const tempNote = notes.find((tempNote) => tempNote.id === note.id);
        setNotes([
          {
            ...tempNote,
            title: title,
            content: content,
            date: new Date(),
          },
          ...notes.filter((oldNote) => oldNote.id !== note.id),
        ]);
        navigation.goBack();
      })
      .catch((err) => console.log(err));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} route={route} />
      <View style={styles.contentContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
            style={styles.input}
          />
          <TextInput
            placeholder="Content"
            value={content}
            multiline
            onChangeText={setContent}
            style={[
              styles.input,
              {
                flexGrow: 1,
                textAlignVertical: "top",
              },
            ]}
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
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffd700",
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
});

export default EditNoteScreen;
