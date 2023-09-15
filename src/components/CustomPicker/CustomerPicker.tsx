import {Picker} from '@react-native-picker/picker';
import React, {FC} from 'react';
import {Platform} from 'react-native';

import styles from './styles';

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

export default CustomPicker;
