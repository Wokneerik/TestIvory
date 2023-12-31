import React, {FC} from 'react';
import {ScrollView, Text, View} from 'react-native';

import styles from './styles';

interface ResultPageProps {
  data: {
    id: number;
    name: string;
    type: string;
    muscle: string;
    difficulty: string;
  }[];
  error: Error | null;
}

const ResultPage: FC<ResultPageProps> = ({data, error}) => {
  if (error) {
    return (
      <View>
        <Text style={{color: '#fff'}}>Error: {error.message}</Text>
      </View>
    );
  }

  if (!data.length) {
    return (
      <View>
        <Text>No results found.</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        {data.map((result, index) => (
          <View style={styles.resultContainer} key={result.id}>
            <Text style={styles.text}>Name: {result.name}</Text>
            <Text style={styles.text}>Type: {result.type}</Text>
            <Text style={styles.text}>Muscle: {result.muscle}</Text>
            <Text style={styles.text}>Difficulty: {result.difficulty}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default ResultPage;
