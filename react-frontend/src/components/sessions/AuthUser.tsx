import axios from 'axios';
import { useState } from 'react';
import { useRouter } from "next/router";

export default function AuthUser() {
    const router = useRouter();

    const getToken = () => {
        const tokenString = sessionStorage.getItem('token');
        const userToken = tokenString;
        return userToken;
    }

    const getUser = () => {
        const userString = sessionStorage.getItem('user');
        const user_detail = userString;
        return user_detail;
    }



    // const [token, setToken] = useState(getToken());
    // const [user, setUser] = useState(getUser());

    const saveToken = (user, token) => {
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('user', user);

        // console.log("token:" + sessionStorage.getItem('token'));

        // setToken(token);
        // setUser(user);
        router.push('/profile');
    }

    const logout = () => {
        sessionStorage.clear();
        router.push('/login');
    }

    const http = (tokens: any) => axios.create({
        baseURL: "http://localhost:8000/api",
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${tokens}`
        }
    });

    return {
        setToken: saveToken,
        // token,
        // user,
        getToken,
        http,
        logout
    }
}