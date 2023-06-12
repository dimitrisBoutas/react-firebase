import { ApplicationRouter } from './routes/Router';
import { MantineProvider } from '@mantine/core';
import { useAuthStore } from './store/auth.store';
import { auth } from './main';
import { useAuthState } from 'react-firebase-hooks/auth';


// @ts-ignore
const FirebaseAuthenticatedApplication = ({ children }) => {
    const setUser = useAuthStore(state => state.setUser)
    // @ts-ignore
    const [user, loading, error] = useAuthState(auth, { onUserChanged: (u) => setUser(u)})

    return { ...children }
}


function App() {

    return (
        <MantineProvider theme={{ colorScheme: 'dark', defaultRadius: 0 }} withGlobalStyles withNormalizeCSS>
            <FirebaseAuthenticatedApplication>
                <ApplicationRouter/>
            </FirebaseAuthenticatedApplication>
        </MantineProvider>
    )
}

export default App
