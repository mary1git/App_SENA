import { any } from 'prop-types';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
  Modal,
  TouchableHighlight,
} from 'react-native';

const notesInitialState = [
  { id: '1', title: 'Note 1', content: 'This is note 1' },
  { id: '2', title: 'Note 2', content: 'This is note 2' },
  { id: '3', title: 'Note 3', content: 'This is note 3' },
];

export default function App() {
  const [notes, setNotes] = useState(notesInitialState);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  const addNote = (title, content) => {
    const newNote = {
      id: Date.now().toString(),
      title,
      content,
    };
    setNotes([...notes, newNote]);
    setModalVisible(false);
  };

  const editNote = (title, content) => {
    const updatedNotes = notes.map((note) =>
      note.id === selectedNote.id ? { ...note, title, content } : note
    );
    setNotes(updatedNotes);
    setModalVisible(false);
  };

  const deleteNote = (id) => {
    const filteredNotes = notes.filter((note) => note.id !== id);
    setNotes(filteredNotes);
  };

  const renderItem = ({ item }) => (
    <TouchableHighlight onPress={() => setSelectedNote(item)}>
      <View style={styles.noteContainer}>
        <Text style={styles.noteTitle}>{item.title}</Text>
      </View>
    </TouchableHighlight>
  );

  return (
    <View style={styles.container}>
      <Button title="Add Note" onPress={() => setModalVisible(true)} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              placeholder="Title"
              value={selectedNote ? selectedNote.title : ''}
              onChangeText={(title) =>
                selectedNote ? setSelectedNote({ ...selectedNote, title }) : null
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Content"
              value={selectedNote ? selectedNote.content : ''}
              onChangeText={(content) =>
                selectedNote ? setSelectedNote({ ...selectedNote, content }) : null
              }
            />
            <View style={styles.buttonContainer}>
              {selectedNote ? (
                <>
                  <Button
                    title="Save Changes"
                    onPress={() =>
                      selectedNote
                        ? editNote(selectedNote.title, selectedNote.content)
                        : null
                    }
                  />
                  <Button
                    title="Delete Note"
                    color="red"
                    onPress={() => deleteNote(selectedNote.id)}
                  />
                </>
              ) : (
                <Button title="Add Note" onPress={() => addNote('', '')} />
              )}
              <Button title="Cancel" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </View>
      </Modal>
      <FlatList
        data={notes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },})
  {
    '#f2f2f2',
    padding}