import React, {useState} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';

import styles from './styles';

import {CustomPicker, ResultModal} from '@components';
import {difficultyData, muscleData, typeData} from '@constants';
import {useExerciseSearch} from '@hooks';

function Home() {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [muscle, setMuscle] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);

  const {searchResult, error, loading, handleSearch} = useExerciseSearch();

  const isSearchDisabled = !name && !type && !muscle && !difficulty;

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleSearchClick = () => {
    handleSearch(name, type, muscle, difficulty);
    toggleModal();
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.header}>Exercise Search</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <CustomPicker
          selectedValue={type}
          onValueChange={setType}
          data={typeData}
        />
        <CustomPicker
          selectedValue={muscle}
          onValueChange={setMuscle}
          data={muscleData}
        />
        <CustomPicker
          selectedValue={difficulty}
          onValueChange={setDifficulty}
          data={difficultyData}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={handleSearchClick}
          disabled={isSearchDisabled}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>

        {loading ? (
          <ActivityIndicator size="large" color="#232323" />
        ) : (
          <Modal isVisible={isModalVisible}>
            <View style={styles.modalContent}>
              <Text style={styles.modalHeaderText}>Search Results</Text>
              <ResultModal data={searchResult} error={error} />
              <TouchableOpacity
                style={styles.closeButton}
                onPress={toggleModal}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        )}
      </ScrollView>
    </View>
  );
}

export default Home;
