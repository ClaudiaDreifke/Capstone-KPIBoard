import {Kpi, NewKpi} from "../model/Kpi";
import axios from "axios";
import {toast} from "react-toastify";
import {useEffect, useState} from "react";


export default function useKpi() {

    const [kpis, setKpis] = useState<Kpi[]>([])

    useEffect(() => {
        getAllKpisAdmin()
    }, [])

    const getAllKpisAdmin = () => {
        axios.get("/api/admin/all-kpi")
            .then((response) => response.data)
            .then(setKpis)
    }

    const addNewKpi = (name: string, targetForKpi: { targetValueOperator: string, targetValue: number, targetValueUnit: string }) => {
        const newKpi: NewKpi = {name: name, targetForKpi: targetForKpi}
        return axios.post("/api/admin/add-kpi", newKpi)
            .then((response) => {
                    return response.data
                }
            )
            .then(getAllKpisAdmin);
    }

    const notify = (message: string) => {
        toast.error(message, {
            position: toast.POSITION.TOP_LEFT
        });
    };

    return {kpis, addNewKpi, getAllKpisAdmin, notify}

}
