import React from 'react';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { useAuthStore } from '../store/auth.store';
import { Login } from '../components/Login';
import { SignUp } from '../components/SignUp';
import { UserInfo } from '../components/UserInfo';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../main';
import { Center, Loader } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';


const PrivateRoute = () => {
    const { height, width } = useViewportSize()
    const [firebaseUser, loading] = useAuthState(auth)

    if (loading) {
        return (
            <Center w={width} h={height}>
                <Loader size="xl" variant="dots"/>
            </Center>
        )
    }
    return !!firebaseUser ? <Outlet/> : <Navigate to="/login"/>
}

export const ApplicationRouter = () => {
    return <BrowserRouter>
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/" element={<PrivateRoute/>}>
                <Route path={"/userinfo"} element={<UserInfo/>}/>
            </Route>
        </Routes>
    </BrowserRouter>
}
