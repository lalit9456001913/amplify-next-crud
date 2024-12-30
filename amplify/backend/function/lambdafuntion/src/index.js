exports.handler = async (event) => {
    // Sample code
    const { email, phone, firstName, lastName } = event.arguments || {};
  
    // Your custom logic here, e.g., creating a user, querying DynamoDB, etc.
    const user = {
      id: '123', // Sample data for testing
      email: email || 'test@example.com',
      phone: phone || '1234567890',
      firstName: firstName || 'John',
      lastName: lastName || 'Doe',
    };
  
    // Return the result back to AppSync
    return user;
};