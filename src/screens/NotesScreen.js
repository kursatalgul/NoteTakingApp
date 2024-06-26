import React, { useState } from "react";
import { View, SafeAreaView, AsyncStorage } from "react-native";
import Modal from "react-native-modal";
import ButtonTouchableOpacity from "../component/ButtonTouchableOpacity";
import Label from "../component/Label";
import NoteModal from "./NoteModal"; // Önceki örnekteki NoteModal bileşeni

const NotesScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [savedNotes, setSavedNotes] = useState([]);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleSaveNote = async (note) => {
    // AsyncStorage'de notları depola
    const notes = [...savedNotes, note];
    await AsyncStorage.setItem("notes", JSON.stringify(notes));
    setSavedNotes(notes);
    toggleModal(); // Modalı kapat
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#ffd700", flex: 1}}>
      <View style={{ flex: 1 }}>
        {savedNotes.map((note, index) => (
          <View key={index}>
            <Label text={`Başlık: ${note.title}`} />
            <Label text={`Metin: ${note.content}`} />
          </View>
        ))}
      </View>
      <NoteModal
        isVisible={modalVisible}
        onClose={toggleModal}
        onSave={handleSaveNote}
      />
      <View
        style={{
          alignItems: "flex-end",
          justifyContent: "flex-end",
          flexDirection: "row",
          marginBottom:10,
          marginRight:5
        }}
      >
        <ButtonTouchableOpacity
          text="ADD"
          width={110}
          height={60}
          onPress={toggleModal}
        />
      </View>
    </SafeAreaView>
  );
};

export default NotesScreen;
