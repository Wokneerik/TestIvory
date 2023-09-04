import {Picker} from '@react-native-picker/picker';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import ResultPage from './ResultPage';
import {searchExercises} from './api/api';

const IS_IOS = Platform.OS === 'ios';

function Home() {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [muscle, setMuscle] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const isSearchDisabled = !name && !type && !muscle && !difficulty;

  const handleSearch = () => {
    setLoading(true);

    const queryParams = {
      name: name || '',
      type: type || '',
      muscle: muscle || '',
      difficulty: difficulty || '',
    };

    const apiKey = 'GO+9tMpYEv3wtS0F1Iscug==ol7uUiGoNdHzEUTG';

    searchExercises(queryParams, apiKey)
      .then(data => {
        setSearchResult(data);
        setError(null);
      })
      .catch(error => {
        setSearchResult([]);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
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
          onChangeText={text => setName(text)}
        />
        <Picker
          style={IS_IOS ? styles.inputIOS : styles.input}
          selectedValue={type}
          onValueChange={itemValue => setType(itemValue)}>
          <Picker.Item label="Select Type" value="" />
          <Picker.Item label="Cardio" value="cardio" />
          <Picker.Item
            label="Olympic Weightlifting"
            value="olympic_weightlifting"
          />
          <Picker.Item label="Plyometrics" value="plyometrics" />
          <Picker.Item label="Powerlifting" value="powerlifting" />
          <Picker.Item label="Strength" value="strength" />
          <Picker.Item label="Stretching" value="stretching" />
          <Picker.Item label="Strongman" value="strongman" />
        </Picker>
        <Picker
          style={IS_IOS ? styles.inputIOS : styles.input}
          selectedValue={muscle}
          onValueChange={itemValue => setMuscle(itemValue)}>
          <Picker.Item label="Select Muscle" value="" />
          <Picker.Item label="Abdominals" value="abdominals" />
          <Picker.Item label="Abductors" value="abductors" />
          <Picker.Item label="Adductors" value="adductors" />
          <Picker.Item label="Biceps" value="biceps" />
          <Picker.Item label="Calves" value="calves" />
          <Picker.Item label="Chest" value="chest" />
          <Picker.Item label="Forearms" value="forearms" />
          <Picker.Item label="Glutes" value="glutes" />
          <Picker.Item label="Hamstrings" value="hamstrings" />
          <Picker.Item label="Lats" value="lats" />
          <Picker.Item label="Lower Back" value="lower_back" />
          <Picker.Item label="Middle Back" value="middle_back" />
          <Picker.Item label="Neck" value="neck" />
          <Picker.Item label="Quadriceps" value="quadriceps" />
          <Picker.Item label="Traps" value="traps" />
          <Picker.Item label="Triceps" value="triceps" />
        </Picker>

        <Picker
          style={IS_IOS ? styles.inputIOS : styles.input}
          selectedValue={difficulty}
          onValueChange={itemValue => setDifficulty(itemValue)}>
          <Picker.Item label="Select Difficulty" value="" />
          <Picker.Item label="Beginner" value="beginner" />
          <Picker.Item label="Intermediate" value="intermediate" />
          <Picker.Item label="Expert" value="expert" />
        </Picker>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            handleSearch();
            toggleModal();
          }}
          disabled={isSearchDisabled}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>

        {loading ? (
          <ActivityIndicator size="large" color="#232323" />
        ) : (
          <Modal isVisible={isModalVisible}>
            <View style={styles.modalContent}>
              <Text style={styles.modalHeaderText}>Search Results</Text>
              <ResultPage data={searchResult} error={error} />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#232323',
  },
  input: {
    height: 40,
    fontSize: 18,
    backgroundColor: '#edf0f7',
    borderColor: '#777777',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  inputIOS: {
    fontSize: 18,
    backgroundColor: '#edf0f7',
    borderColor: '#777777',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
    backgroundColor: '#3fcc7f',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 22,
    fontWeight: '700',
  },
  modalContent: {
    backgroundColor: '#323232',
    paddingVertical: 42,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  modalHeaderText: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 8,
    color: '#ffff',
  },

  closeButton: {
    marginTop: 16,
    marginBottom: 8,
    backgroundColor: '#5ac8fa',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
  },

  closeButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
});

export default Home;