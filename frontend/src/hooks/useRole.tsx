import {NewUserRole, UserRole} from "../model/Role";
import {useEffect, useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";

export default function useRole() {

    const [userRoles, setUserRoles] = useState<UserRole[]>([]);

    useEffect(() => {
        getAllUserRoles()
    }, [])

    const getAllUserRoles = () => {
        axios.get("/api/roles")
            .then((response) => response.data)
            .then(setUserRoles)
    }

    const addNewUserRole = (newUserRole: NewUserRole) => {
        return axios.post("/api/roles", newUserRole)
            .then((response) => {
                    return response.data
                }
            )
            .then(getAllUserRoles);
    }

    const deleteUserRoleById = (id: string) => {
        return axios.delete(`/api/roles/${id}`)
            .then((response) => response.status)
            .then(getAllUserRoles)
            .catch(() => {
                toast.error("Die Rolle konnte nicht gefunden werden!")
            })
    }

    return {
        userRoles,
        addNewUserRole,
        getAllUserRoles,
        deleteUserRoleById,
    }
}
