import { generateClient } from 'aws-amplify/api';
import { getCurrentUser } from 'aws-amplify/auth';
import { fetchAuthSession } from '@aws-amplify/core';
import { getUser, listUsers, createUser } from '../queries/user-query'; // Replace with your actual query

export const fetchUserData = async () => {
    try {
        const API = generateClient();
        const session = await fetchAuthSession();
        console.log("session---", session)
        const userData = await API.graphql({
            query: getUser,
            variables: { id: session?.userSub }, // Pass the ID as a variable
            authMode: 'AMAZON_COGNITO_USER_POOLS', // Use Cognito User Pools for authentication
            authToken: session?.tokens?.idToken?.toString(), // Explicitly pass the token
        });
        return userData;
    } catch (error) {
        console.error("Error fetching user data:", error);
        throw new Error('Error fetching user data');
    }
};

export const fetchUsersData = async () => {
    try {
        const API = generateClient();
        const session = await fetchAuthSession();
        const userData = await API.graphql({
            query: listUsers,
            authMode: 'AMAZON_COGNITO_USER_POOLS',
            authToken: session.tokens.idToken.toString(),
        });
        return userData;
    } catch (error) {
        console.error("Error fetching user data:", error);
        throw new Error('Error fetching user data');
    }
};

export const createUsersData = async (body) => {
    try {

        const API = generateClient();
        const session = await fetchAuthSession();
        console.log("session---", session)
        const currentUser = await getCurrentUser();
        console.log("users----", currentUser)
        const userData = await API.graphql({
            query: createUser,
            variables: { ...body, id: currentUser.userId },
            authMode: 'AMAZON_COGNITO_USER_POOLS',
            authToken: session.tokens.idToken.toString(),
        });
        console.log("User created successfully:", userData);
        return userData;
    } catch (error) {
        console.error("Error creating user data:", error);
        throw new Error('Error creating user data');
    }
};
