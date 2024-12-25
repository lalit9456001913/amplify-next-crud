import axios from 'axios';
const ApiUrl = process.env.NEXT_PUBLIC_API_URL;

export const getTopics = async (token) => {
  const headers = {
    'content-type': 'application/json',
    'authorization': token,
  };
  try {
    const response = await axios.get(
      `${ApiUrl}/topics`,
      { headers }
    );
    if (response?.status) {
      return response.data
    }
  } catch (error) {
    console.error('Error fetching topics:', error);
    throw error;
  }
};


export const getSubTopics = async (token, topicId) => {
  const headers = {
    'content-type': 'application/json',
    'authorization': token,
  };
  try {
    const { data: response } = await axios.get(`${ApiUrl}/topics/${topicId}/subTopics`, { headers });
    return response;
  } catch (error) {
    console.error('Error fetching  subtopics:', error);
    return { data: [] };
  }
};


export const getProblems = async (token, topicId, subTopicId) => {
  const headers = {
    'content-type': 'application/json',
    'authorization': token,
  };
  try {
    const response = await axios.get(`${ApiUrl}/topics/${topicId}/subTopics/${subTopicId}/problems`, { headers });
    return response;
  } catch (error) {
    console.error('Error fetching  subtopics:', error);
    return { data: [] };
  }
};


export const updateTopicProgress = async (token, topicId, isCompleted) => {
  const headers = {
    'content-type': 'application/json',
    'authorization': token,
  };
  try {
    const response = await axios.put(
      `${ApiUrl}/topics/progress/${topicId}`,
      { isCompleted },
      { headers }
    );
    return response;
  } catch (error) {
    console.error('Error updating progress:', error);
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await api.post(`${ApiUrl}/auth/login`, credentials);
    return response.data;
  } catch (error) {
    console.error('Error on Login:', error);
  }
}