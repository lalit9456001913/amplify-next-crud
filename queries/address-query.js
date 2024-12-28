export const createAddress = /* GraphQL */ `
  mutation CreateAddress(
    $house: String!
    $street: String
    $city: String!
    $state: String
    $country: String!
    $pincode: String!
    $userID: ID!
    $isActive: Boolean!
  ) {
    createAddress(
      input: {
        house: $house
        street: $street
        city: $city
        state: $state
        country: $country
        pincode: $pincode
        userID: $userID
        isActive: $isActive
      }
    ) {
      id
      house
      street
      city
      state
      country
      pincode
      userID
      isActive
    }
  }
`;

export const listAddressesByUser = /* GraphQL */ `
  query ListAddressesByUser($userID: ID!) {
    listAddresses(filter: { userID: { eq: $userID } }) {
      items {
        id
        house
        street
        city
        state
        country
        pincode
        userID
        isActive
        createdAt
        updatedAt
      }
    }
  }
`;


export const updateAddress = /* GraphQL */ `
  mutation UpdateAddress(
    $id: ID!
    $house: String
    $street: String
    $city: String
    $state: String
    $country: String
    $pincode: String
    $userID: ID!
    $isActive: Boolean
  ) {
    updateAddress(
      input: {
        id: $id
        house: $house
        street: $street
        city: $city
        state: $state
        country: $country
        pincode: $pincode
        userID: $userID
        isActive: $isActive
      }
    ) {
      id
      house
      street
      city
      state
      country
      pincode
      userID
      isActive
    }
  }
`;

export const deleteAddress = /* GraphQL */ `
  mutation DeleteAddress(
    $input: DeleteAddressInput!
    $condition: ModelAddressConditionInput
  ) {
    deleteAddress(input: $input, condition: $condition) {
      id
      house
      street
      city
      state
      country
      pincode
      userID
      isActive
    }
  }
`;

