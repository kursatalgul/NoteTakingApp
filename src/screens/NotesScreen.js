import React, { useContext, useEffect, useState } from "react";
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
import { NotesContext } from "../context/NotesContext";
import axios from "axios";
import { api } from "../services/api";
import { AuthContext } from "../context/AuthContext";
import Header from "../component/Header";

const NotesScreen = ({ navigation, route }) => {
  const { notes, setNotes } = useContext(NotesContext);
  const { auth } = useContext(AuthContext);
  console.log("🚀 ~ NotesScreen ~ auth:", auth);
  const handleDeleteNote = async (noteId) => {
    api
      .delete(`/posts/${noteId}`)
      .then((response) => {
        setNotes(notes.filter((note) => note.id !== noteId));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  const renderItem = ({ item, index }) => {
    console.log("🚀 ~ renderItem ~ item:", item);
    return (
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
            <TouchableOpacity onPress={() => handleDeleteNote(item.id)}>
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text numberOfLines={3} style={styles.noteContent}>
          {item.content}
        </Text>
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
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header route={route} navigation={navigation} />
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
    width: "100%",
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
