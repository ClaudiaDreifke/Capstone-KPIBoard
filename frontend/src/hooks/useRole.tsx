import {KpiOwner, NewKpiOwner} from "../model/KpiOwner";
import {useEffect, useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";

export default function useRole() {

    const [kpiOwners, setKpiOwners] = useState<KpiOwner[]>([]);

    useEffect(() => {
        getAllKpiOwner()
    }, [])

    const getAllKpiOwner = () => {
        axios.get("/api/roles")
            .then((response) => response.data)
            .then(setKpiOwners)
    }

    const addNewKpiOwner = (newUserRole: NewKpiOwner) => {
        return axios.post("/api/roles", newUserRole)
            .then((response) => {
                    return response.data
                }
            )
            .then(getAllKpiOwner);
    }

    const deleteKpiOwnerById = (id: string) => {
        return axios.delete(`/api/roles/${id}`)
            .then((response) => response.status)
            .then(getAllKpiOwner)
            .catch(() => {
                toast.error("Das Löschen war nicht erfolgreich!")
            })
    }

    return {
        kpiOwners,
        addNewKpiOwner,
        getAllKpiOwner,
        deleteKpiOwnerById,
    }
}
