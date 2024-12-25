export default function LoginForm({ onSubmit }) {
  const handleSubmit = (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const data = {
          email: formData.get('email'),
          password: formData.get('password'),
      };
      onSubmit(data);
  };

  return (
      <form onSubmit={handleSubmit} className="space-y-4">
          <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
              </label>
              <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full p-4 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your email"
              />
          </div>

          <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
              </label>
              <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  className="w-full p-4 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your password"
              />
          </div>

          <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
              Login
          </button>

      </form>
  );
}
