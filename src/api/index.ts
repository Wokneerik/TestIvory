export const searchExercises = async (
  queryParams: Record<string, string>,
  apiKey: string,
): Promise<any> => {
  const queryString = new URLSearchParams(queryParams).toString();

  try {
    const response = await fetch(
      `https://api.api-ninjas.com/v1/exercises?${queryString}`,
      {
        method: 'GET',
        headers: {
          'X-Api-Key': apiKey,
        },
      },
    );

    if (!response.ok) {
      console.error('Response Status:', response.status);
      console.error('Response Text:', await response.text());
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
