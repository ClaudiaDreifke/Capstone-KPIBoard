import axios from "axios";
import {AppUser} from "../model/AppUser";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {UserDetails} from "../model/UserDetails";
import {useNavigate} from "react-router-dom";

export type useUserProps = {
    getAllKpis: () => void,
    getAllKpiOwner: () => void,
}

export default function useUser(props: useUserProps) {

    const navigate = useNavigate()

    const [appUsers, setAppUsers] = useState<AppUser[]>();
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
            .then(setAppUsers)
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
            .then(() => navigate("/welcome"))
            .then(getAllUser)
            .then(props.getAllKpis)
            .then(props.getAllKpiOwner)
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
            .then(() => setLoggedInUserDetails(undefined))
            .then(getAllUser)
            .then(props.getAllKpis)
            .then(props.getAllKpiOwner)
    }

    return {appUsers, loggedInUserDetails, addNewUser, getLoggedInUserDetails, login, logout}
}
