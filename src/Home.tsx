import React, {useState} from 'react';
import {
  ActivityIndicator,
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
import CustomPicker from './components/CustomPicker';

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

  const typeData = [
    {label: 'Select Type', value: ''},
    {label: 'Cardio', value: 'cardio'},
    {label: 'Olympic Weightlifting', value: 'olympic_weightlifting'},
    {label: 'Plyometrics', value: 'plyometrics'},
    {label: 'Powerlifting', value: 'powerlifting'},
    {label: 'Strength', value: 'strength'},
    {label: 'Stretching', value: 'stretching'},
    {label: 'Strongman', value: 'strongman'},
  ];

  const muscleData = [
    {label: 'Select Muscle', value: ''},
    {label: 'Abdominals', value: 'abdominals'},
    {label: 'Abductors', value: 'abductors'},
    {label: 'Adductors', value: 'adductors'},
    {label: 'Biceps', value: 'biceps'},
    {label: 'Calves', value: 'calves'},
    {label: 'Chest', value: 'chest'},
    {label: 'Forearms', value: 'forearms'},
    {label: 'Glutes', value: 'glutes'},
    {label: 'Hamstrings', value: 'hamstrings'},
    {label: 'Lats', value: 'lats'},
    {label: 'Lower Back', value: 'lower_back'},
    {label: 'Middle Back', value: 'middle_back'},
    {label: 'Neck', value: 'neck'},
    {label: 'Quadriceps', value: 'quadriceps'},
    {label: 'Traps', value: 'traps'},
    {label: 'Triceps', value: 'triceps'},
  ];

  const difficultyData = [
    {label: 'Select Difficulty', value: ''},
    {label: 'Beginner', value: 'beginner'},
    {label: 'Intermediate', value: 'intermediate'},
    {label: 'Expert', value: 'expert'},
  ];

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
        <CustomPicker
          selectedValue={type}
          onValueChange={itemValue => setType(itemValue)}
          data={typeData}
        />
        <CustomPicker
          selectedValue={muscle}
          onValueChange={itemValue => setMuscle(itemValue)}
          data={muscleData}
        />
        <CustomPicker
          selectedValue={difficulty}
          onValueChange={itemValue => setDifficulty(itemValue)}
          data={difficultyData}
        />
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
