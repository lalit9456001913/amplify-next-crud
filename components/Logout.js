function logout({ handleLogout }) {
    return (
        <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-bold">Dashboard</h1>
            <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            >
                Logout
            </button>
        </div>
    )

}
export default logout;