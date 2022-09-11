import axios from "axios";
import {AppUser} from "../model/AppUser";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {UserDetails} from "../model/UserDetails";

export default function useUser() {

    const [appUser, setAppUser] = useState<AppUser[]>();
    const [loggedInUserDetails, setLoggedInUserDetails] = useState<UserDetails>();

    useEffect(() => {
        getAllUser()
    }, [])

    useEffect(() => {
        getLoggedInUserDetails();
    }, []);

    const getAllUser = () => {
        axios.get("/api/users")
            .then((response) => response.data)
            .then(setAppUser)
    }

    const addNewUser = (newUser: AppUser) => {
        return axios.post("/api/users", newUser)
            .then((response) => {
                    return response.data
                }
            )
            .then(getAllUser);
    }

    const login = (username: string, password: string) => {
        axios.get("api/users/login", {auth: {username, password}})
            .then(response => response.data)
            .then(setLoggedInUserDetails)
            .catch(() => toast.error("Login fehlgeschlagen"))
    }

    const getLoggedInUserDetails = () => {
        axios.get("api/users/me")
            .then((response) => response.data)
            .then(setLoggedInUserDetails)
            .catch(() => setLoggedInUserDetails(undefined));
    }

    const logout = () => {
        axios.get("api/users/logout")
            .then(() => setLoggedInUserDetails(undefined));
    }

    return {appUser, loggedInUserDetails, addNewUser, getLoggedInUserDetails, login, logout}
}
