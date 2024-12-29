import { generateClient } from 'aws-amplify/api';
import { getCurrentUser } from 'aws-amplify/auth';
import { fetchAuthSession } from '@aws-amplify/core';
import { getUser, listUsers, createUser, updateUser, deleteUser } from '../queries/user-query';
import { createAddress, listAddressesByUser, updateAddress, deleteAddress } from '../queries/address-query';

// Utility function to get session, current user, and API client
const getSessionUserAndAPI = async () => {
    const session = await fetchAuthSession();
    if (!session) throw new Error("No session found");

    const currentUser = await getCurrentUser();
    if (!currentUser) throw new Error("No current user found");

    const API = generateClient();

    return { session, currentUser, API };
};

// Fetch user data
export const fetchUserData = async () => {
    try {
        const { session, currentUser, API } = await getSessionUserAndAPI();

        const userData = await API.graphql({
            query: getUser,
            variables: { id: currentUser.userId },
            authMode: 'AMAZON_COGNITO_USER_POOLS',
            authToken: session.tokens.idToken.toString(),
        });

        console.log("userData in amplify file--", userData);
        return userData;
    } catch (error) {
        console.error("Error fetching user data:", error);
        throw new Error('Error fetching user data');
    }
};

// Fetch users data
export const fetchUsersData = async () => {
    try {
        const { session, API } = await getSessionUserAndAPI();

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

// Create user data
export const createUsersData = async (body) => {
    try {
        const { session, currentUser, API } = await getSessionUserAndAPI();

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

// Create user address
export const createUsersAddress = async (body) => {
    try {
        const { session, currentUser, API } = await getSessionUserAndAPI();

        const addressInput = {
            house: body.house,
            street: body.street,
            city: body.city,
            state: body.state,
            country: body.country,
            pincode: body.pincode,
            userID: currentUser.userId,
            isActive: true,
        };

        const userAddress = await API.graphql({
            query: createAddress,
            variables: addressInput,
            authMode: 'AMAZON_COGNITO_USER_POOLS',
            authToken: session.tokens.idToken.toString(),
        });

        console.log("Address created successfully:", userAddress);
        return userAddress;
    } catch (error) {
        console.error("Error creating user address:", error);
        throw new Error('Error creating user address');
    }
};

// Get user addresses
export const getUserAddresses = async () => {
    try {
        const { session, currentUser, API } = await getSessionUserAndAPI();

        const userAddresses = await API.graphql({
            query: listAddressesByUser,
            variables: { userID: currentUser.userId },
            authMode: 'AMAZON_COGNITO_USER_POOLS',
            authToken: session.tokens.idToken.toString(),
        });

        console.log("userAddresses----", userAddresses);
        return userAddresses?.data?.listAddresses?.items || [];
    } catch (error) {
        console.error("Error fetching user addresses:", error);
        throw new Error('Error fetching user addresses');
    }
};

// Update user profile
export const updateUserProfile = async (body) => {
    try {
        const { session, API } = await getSessionUserAndAPI();

        const input = {
            id: body.id,
            email: body.email,
            phone: body.phone,
            firstName: body.firstName,
            lastName: body.lastName,
            profilePhoto: body.profilePhoto,
        };

        const userData = await API.graphql({
            query: updateUser,
            variables: { input },
            authMode: 'AMAZON_COGNITO_USER_POOLS',
            authToken: session.tokens.idToken.toString(),
        });

        console.log("User profile updated successfully:", userData);
        return userData;
    } catch (error) {
        console.error("Error updating user profile:", error);
        throw new Error('Error updating user profile');
    }
};

// Update address by ID
export const updateAddressById = async (addressId, body) => {
    try {
        const { session, API } = await getSessionUserAndAPI();

        const addressInput = {
            id: addressId,
            house: body.house,
            street: body.street,
            city: body.city,
            state: body.state,
            country: body.country,
            pincode: body.pincode,
            userID: body.userID,
            isActive: body.isActive,
        };

        const updatedAddress = await API.graphql({
            query: updateAddress,
            variables: addressInput,
            authMode: 'AMAZON_COGNITO_USER_POOLS',
            authToken: session.tokens.idToken.toString(),
        });

        console.log("Address updated successfully:", updatedAddress);
        return updatedAddress;
    } catch (error) {
        console.error("Error updating address:", error);
        throw new Error('Error updating address');
    }
};


export const deleteAddressById = async (addressId) => {
    try {
        const { session, API } = await getSessionUserAndAPI();
        const input = { id: addressId };

        const condition = null;

        const response = await API.graphql({
            query: deleteAddress,
            variables: {
                input,
                condition
            },
            authMode: 'AMAZON_COGNITO_USER_POOLS',
            authToken: session.tokens.idToken.toString(),
        });
        return response;
    } catch (error) {
        console.error("Error deleting address:", error);
        throw new Error('Error deleting address');
    }
};


export const deleteUserFromDatabase = async (userId) => {
    try {
        
        const allAddresses = await getUserAddresses();

        // Assuming the response contains a list of addresses:
        for (const address of allAddresses) {
            await deleteAddressById(address.id)
        }

        const { session, API } = await getSessionUserAndAPI();

        const response = await API.graphql({
            query: deleteUser,  // Your mutation for deleting the user
            variables: { input: { id: userId } },
            authMode: 'AMAZON_COGNITO_USER_POOLS',
            authToken: session.tokens.idToken.toString(),
        });

        return response;
    } catch (error) {
        console.error("Error deleting user:", error);
        throw new Error('Error deleting user');
    }
};
