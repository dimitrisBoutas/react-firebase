import { Button, Code } from '@mantine/core';
import { useAuthStore } from '../store/auth.store';
import { useSignOut } from 'react-firebase-hooks/auth';
import { auth } from '../main';
import { useNavigate } from 'react-router-dom';


export const UserInfo = () => {
    const user = useAuthStore(state => state.user)
    const navigate = useNavigate()
    const [signOut] = useSignOut(auth)
    const logout = () => {
        signOut().then(() => {
            navigate("/login")
        })
    }
    return (
        <>
            <Code block>
                {JSON.stringify(user, null, 2)}
            </Code>
            <Button onClick={logout}>Log out</Button>
        </>
    )
}
