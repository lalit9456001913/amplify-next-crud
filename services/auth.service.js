import axios from 'axios';
const ApiUrl = process.env.NEXT_PUBLIC_API_URL;

export const loginUser = async (credentials) => {
    try {
        const response = await axios.post(`${ApiUrl}/auth/login`, credentials);
        console.log("response", response);
        return response.data;  // Return the successful login response
    } catch (error) {
        // Handle error based on the response status
        if (error.response) {
            // Server responded with a status other than 2xx
            if (error.response.status === 401) {
                console.error('Incorrect credentials. Please try again.');
                return { error: 'Incorrect credentials. Please check your username and password.' };
            } else {
                console.error('Login failed:', error.response.data.message || error.response.statusText);
                return { error: 'Login failed. Please try again later.' };
            }
        } else if (error.request) {
            // No response was received from the server
            console.error('No response from the server.');
            return { error: 'No response from server. Please check your connection.' };
        } else {
            // Something went wrong setting up the request
            console.error('Error setting up request:', error.message);
            return { error: 'Unexpected error occurred. Please try again.' };
        }
    }
}
