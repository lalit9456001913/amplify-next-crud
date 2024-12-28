// graphql/queries.js


export const getUserByEmail = /* GraphQL */ `
  query GetUserByEmail($email: String!) {
    usersByEmail(email: $email) {
      items {
        id
        email
        phone
        firstName
        lastName
        profilePhoto
        addresses {
          items {
            id
            house
            city
            pincode
            isActive
          }
        }
      }
    }
  }
`;

// Query to get a single user by ID
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      email
      phone
      firstName
      lastName
      profilePhoto
      addresses {
        items {
          id
          house
          city
          pincode
          isActive
        }
      }
    }
  }
`;

// Query to get all users (this is a list query)
export const listUsers = /* GraphQL */ `
  query ListUsers {
    listUsers {
      items {
        id
        email
        phone
        firstName
        lastName
        profilePhoto
        addresses {
          items {
            id
            house
            city
            pincode
            isActive
          }
        }
      }
    }
  }
`;

// Mutation to create a new user (customCreateUser from schema)
export const customCreateUser = /* GraphQL */ `
  mutation CustomCreateUser($email: String!, $phone: String, $firstName: String, $lastName: String, $profilePhoto: String) {
    customCreateUser(email: $email, phone: $phone, firstName: $firstName, lastName: $lastName, profilePhoto: $profilePhoto) {
      id
      email
      phone
      firstName
      lastName
      profilePhoto
      addresses {
        items {
          id
          house
          city
          pincode
          isActive
        }
      }
    }
  }
`;

// Mutation to update an existing user details
export const updateUser = /* GraphQL */ `
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      id
      email
      phone
      firstName
      lastName
      profilePhoto
    }
  }
`;




// Mutation to delete a user
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
      email
      phone
      firstName
      lastName
      profilePhoto
    }
  }
`;

// graphql/queries.js

export const createUser = /* GraphQL */ `
  mutation CreateUser($id: ID!, $email: String!, $phone: String, $firstName: String, $lastName: String, $profilePhoto: String) {
    createUser(input: { id: $id, email: $email, phone: $phone, firstName: $firstName, lastName: $lastName, profilePhoto: $profilePhoto }) {
      id
      email
      phone
      firstName
      lastName
      profilePhoto
    }
  }
`;

export const loginUser = /* GraphQL */ `
  query LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      id
      email
      phone
      firstName
      lastName
      profilePhoto
    }
  }
`;
