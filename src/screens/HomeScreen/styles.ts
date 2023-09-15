import {StyleSheet} from 'react-native';

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

export default styles;
