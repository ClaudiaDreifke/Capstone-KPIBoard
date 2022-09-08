import axios from "axios";
import {NewUser} from "../model/AppUser";
import {useEffect, useState} from "react";
import {Role} from "../model/Role";

export default function useUser() {

    const [user, setUser] = useState<Role[]>([]);

    useEffect(() => {
        getAllUser()
    }, [])

    const getAllUser = () => {
        axios.get("/api/user")
            .then((response) => response.data)
            .then(setUser)
    }

    const addNewUser = (newUser: NewUser) => {
        return axios.post("/api/user", newUser)
            .then((response) => {
                    return response.data
                }
            )
            .then(getAllUser);
    }

    return {user, addNewUser}
}
