import React, { useContext, useState } from "react";
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
import axios from "axios";
import { NotesContext } from "../context/NotesContext";
import { api } from "../services/api";
import Header from "../component/Header";

const AddNoteScreen = ({ route, navigation }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { notes, setNotes } = useContext(NotesContext);
  const handleSaveNote = async () => {
    if (!title || !content) {
      Alert.alert("Both fields are required");
      return;
    }
    console.log("girdi");
    const newNote = {
      id: Math.floor(Math.random() * 100000) + 1,
      title: title,
      content: content,
      date: new Date(),
    };
    api
      .post("/posts", newNote)
      .then((res) => {
        console.log(res);
        setNotes([res.data, ...notes]);
        navigation.goBack();
      })
      .catch((err) => console.log(err));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header route={route} navigation={navigation} />
      <View style={styles.contentContainer}>
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
        <View style={{ alignItems: "flex-end" }}>
          <ButtonTouchableOpacity
            text="Save Note"
            width={110}
            height={60}
            onPress={handleSaveNote}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffd700",
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  input: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
});

export default AddNoteScreen;
