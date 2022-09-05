import {NewRole, Role} from "../model/Role";
import {useEffect, useState} from "react";
import axios from "axios";

export default function useRole() {

    const [roles, setRoles] = useState<Role[]>([]);

    useEffect(() => {
        getAllRoles()
    }, [])

    const getAllRoles = () => {
        axios.get("/api/roles")
            .then((response) => response.data)
            .then(setRoles)
    }

    const addNewRole = (newRole: NewRole) => {
        return axios.post("/api/roles", newRole)
            .then((response) => {
                    return response.data
                }
            )
            .then(getAllRoles);
    }

    return {
        roles,
        addNewRole,
        getAllRoles
    }
}