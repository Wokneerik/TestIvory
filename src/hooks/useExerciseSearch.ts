import {searchExercises} from '@api';
import {API_KEY} from '@env';
import {useState} from 'react';

const apiKey = API_KEY;
interface SearchResult {
  id: number;
  name: string;
  type: string;
  muscle: string;
  difficulty: string;
}

const useExerciseSearch = () => {
  const [searchResult, setSearchResult] = useState<SearchResult[]>([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = (
    name: string,
    type: string,
    muscle: string,
    difficulty: string,
  ) => {
    setLoading(true);

    const queryParams = {
      name: name || '',
      type: type || '',
      muscle: muscle || '',
      difficulty: difficulty || '',
    };

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

  return {
    searchResult,
    error,
    loading,
    handleSearch,
  };
};

export default useExerciseSearch;
