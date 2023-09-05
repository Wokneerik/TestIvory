import {Picker} from '@react-native-picker/picker';
import React, {FC} from 'react';
import {Platform, StyleSheet} from 'react-native';

const IS_IOS = Platform.OS === 'ios';

interface CustomPickerProps {
  data: {label: string; value: string}[];
  onValueChange: (itemValue: string, itemIndex: number) => void;
  selectedValue: string;
}

const CustomPicker: FC<CustomPickerProps> = ({
  selectedValue,
  onValueChange,
  data,
}) => {
  return (
    <Picker
      style={IS_IOS ? styles.inputIOS : styles.input}
      selectedValue={selectedValue}
      onValueChange={onValueChange}>
      {data.map((item, index) => (
        <Picker.Item key={index} label={item.label} value={item.value} />
      ))}
    </Picker>
  );
};

const styles = StyleSheet.create({
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
});

export default CustomPicker;
