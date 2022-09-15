import {Kpi, NewKpi} from "../model/Kpi";
import axios from "axios";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";


export default function useKpi() {

    const [kpis, setKpis] = useState<Kpi[]>([]);

    const navigate = useNavigate()

    useEffect(() => {
        getAllKpis()
    }, [])

    const getAllKpis = () => {
        axios.get("/api/kpis")
            .then((response) => response.data)
            .then(setKpis)
    }

    const addNewKpi = (newKpi: NewKpi) => {
        return axios.post("/api/kpis", newKpi)
            .then((response) => {
                    return response.data
                }
            )
            .then(getAllKpis);
    }

    const deleteKpiById = (id: string) => {
        return axios.delete(`/api/kpis/${id}`)
            .then((response) => response.status)
            .then(getAllKpis)
            .catch(() => {
                toast.error("Die Kennzahl konnte nicht gefunden werden!")
            })
    }

    const updateKpiById = (updatedKpi: Kpi) => {
        return axios.put("/api/kpis/" + updatedKpi.id, updatedKpi)
            .then((response) => response.data)
            .then(getAllKpis)
            .then(() => navigate("/my-kpi"))
            .catch(() => {
                toast.error("Die Eingabe konnte nicht gespeichert werden!")
            })
    }

    const targetValueOperatorConvertToText = (stringToConvert: string | undefined) => {
        if (stringToConvert === "LESS") return "<";
        if (stringToConvert === "GREATER") return ">";
        else return "=";
    }

    const targetValueUnitConvertToText = (stringToConvert: string | undefined) => {
        if (stringToConvert === "AMOUNT") return "Stk.";
        if (stringToConvert === "MINUTES") return "Min.";
        if (stringToConvert === "HOURS") return "Std.";
        if (stringToConvert === "DAYS") return "Tage";
        if (stringToConvert === "EURO") return "€";
        else return "%";
    }

    return {
        kpis,
        addNewKpi,
        getAllKpis,
        deleteKpiById,
        updateKpiById,
        targetValueUnitConvertToText,
        targetValueOperatorConvertToText
    }
}
