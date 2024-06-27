import React, { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  FlatList,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import ButtonTouchableOpacity from "../component/ButtonTouchableOpacity";

const NotesScreen = ({ navigation }) => {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    try {
      const existingNotes = await AsyncStorage.getItem("notes");
      const notes = existingNotes ? JSON.parse(existingNotes) : [];
      setNotes(notes);
    } catch (error) {
      console.error("Error fetching notes from AsyncStorage", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchNotes();
    }, [])
  );

  const handleDeleteNote = async (index) => {
    const newNotes = [...notes];
    newNotes.splice(index, 1);
    setNotes(newNotes);
    await AsyncStorage.setItem("notes", JSON.stringify(newNotes));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.noteContainer}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.noteTitle}>{item.title}</Text>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("EditNote", { note: item, index })
            }
          >
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDeleteNote(index)}>
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.noteContent}>{item.content}</Text>
      {item.dateModified && (
        <Text style={styles.noteDate}>
          Last modified: {formatDate(item.dateModified)}
        </Text>
      )}
      {!item.dateModified && (
        <Text style={styles.noteDate}>Created: {formatDate(item.date)}</Text>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={notes}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContent}
      />
      <View style={styles.addButtonContainer}>
        <ButtonTouchableOpacity
          text="ADD"
          width={110}
          height={60}
          onPress={() => navigation.navigate("AddNote")}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffd700",
    flex: 1,
  },
  listContent: {
    padding: 16,
  },
  noteContainer: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  noteContent: {
    fontSize: 16,
    marginBottom: 8,
  },
  noteDate: {
    fontSize: 14,
    color: "grey",
  },
  addButtonContainer: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },
  editText: {
    color: "blue",
    marginRight: 10,
  },
  deleteText: {
    color: "red",
  },
});

export default NotesScreen;
