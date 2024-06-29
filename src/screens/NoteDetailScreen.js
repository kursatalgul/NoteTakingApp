import React, { useContext } from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import { NotesContext } from "../context/NotesContext";
import Header from "../component/Header";

const NoteDetailScreen = ({ route, navigation }) => {
  const { noteId } = route.params;
  const { notes } = useContext(NotesContext);

  const note = notes.find((note) => note.id === noteId);

  if (!note) {
    return (
      <SafeAreaView style={styles.container}>
        <Header route={route} navigation={navigation} />
        <View style={styles.contentContainer}>
          <Text style={styles.errorText}>Note not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header route={route} navigation={navigation} />
      <View style={styles.contentContainer}>
        <Text style={styles.noteTitle}>{note.title}</Text>
        <Text style={styles.noteContent}>{note.content}</Text>
        {note.dateModified && (
          <Text style={styles.noteDate}>
            Last modified: {new Date(note.dateModified).toLocaleString()}
          </Text>
        )}
        {!note.dateModified && (
          <Text style={styles.noteDate}>
            Created: {new Date(note.date).toLocaleString()}
          </Text>
        )}
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
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginTop: 16,
  },
  noteTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  noteContent: {
    fontSize: 18,
    marginBottom: 16,
  },
  noteDate: {
    fontSize: 14,
    color: "grey",
  },
  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
  },
});

export default NoteDetailScreen;
