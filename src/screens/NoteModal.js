import React, { useState } from "react";
import { View, Text, Button, TextInput, AsyncStorage } from "react-native";
import Modal from "react-native-modal";

const NoteModal = ({ isVisible, onClose, onSave }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSave = async () => {
    // Verileri AsyncStorage'e kaydet
    const note = { title, content };
    await AsyncStorage.setItem("note", JSON.stringify(note));

    // Kaydedildikten sonra modalı kapat ve onSave callback'ini çağır
    onSave();
  };

  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <TextInput
          placeholder="Başlık"
          value={title}
          onChangeText={(text) => setTitle(text)}
          style={{ marginBottom: 10, borderBottomWidth: 1, borderBottomColor: "#ccc", width: "80%" }}
        />
        <TextInput
          placeholder="Metin"
          value={content}
          onChangeText={(text) => setContent(text)}
          multiline
          numberOfLines={4}
          style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: "#ccc", width: "80%" }}
        />
        <Button title="Kaydet" onPress={handleSave} />
      </View>
    </Modal>
  );
};

export default NoteModal;
