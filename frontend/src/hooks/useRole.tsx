import {NewRole, Role} from "../model/Role";
import {useEffect, useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";

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

    const deleteRoleById = (id: string) => {
        return axios.delete(`/api/roles/${id}`)
            .then((response) => response.status)
            .then(getAllRoles)
            .catch(() => {
                toast.error("Die Rolle konnte nicht gefunden werden!")
            })
    }

    return {
        roles,
        addNewRole,
        getAllRoles,
        deleteRoleById,
    }
}