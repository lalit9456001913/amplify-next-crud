import '../styles/globals.css'; // Import global CSS here

function MyApp({ Component, pageProps }) {
    return (
        // <AuthProvider>
            <Component {...pageProps} />
        // </AuthProvider>
    );
}

export default MyApp;

