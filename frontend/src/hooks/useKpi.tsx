import {Kpi, NewKpi} from "../model/Kpi";
import axios from "axios";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";


export default function useKpi() {

    const [kpis, setKpis] = useState<Kpi[]>([]);

    useEffect(() => {
        getAllKpisAdmin()
    }, [])

    const getAllKpisAdmin = () => {
        axios.get("/api/kpis")
            .then((response) => response.data)
            .then(setKpis)
    }

    const addNewKpi = (name: string, targetForKpi: { targetValueOperator: string, targetValue: number, targetValueUnit: string }) => {
        const newKpi: NewKpi = {name: name, targetForKpi: targetForKpi}
        return axios.post("/api/kpis", newKpi)
            .then((response) => {
                    return response.data
                }
            )
            .then(getAllKpisAdmin);
    }

    const deleteKpiById = (id: string) => {
        return axios.delete("api/kpis/" + id)
            .then((response) => response.status)
            .then(getAllKpisAdmin)
            .catch(() => {
                toast.error("Die Kennzahl konnte nicht gefunden werden.")
            })
    }

    return {kpis, addNewKpi, getAllKpisAdmin, deleteKpiById}
}
