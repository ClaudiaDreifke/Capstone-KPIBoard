import {NewKpi} from "../model/Kpi";
import axios from "axios";
import {toast} from "react-toastify";


export default function useKpi() {

    const notify = (message: string) => {
        toast.error(message, {
            position: toast.POSITION.TOP_LEFT
        });
    };

    const addNewKpi = (name: string, targetForKpi: { targetValueOperator: string, targetValue: number, targetValueUnit: string }) => {
        const newKpi: NewKpi = {name: name, targetForKpi: targetForKpi}
        return axios.post("/api/admin/add-kpi", newKpi)
            .then((response) => {
                    return response.data
                }
            );
    }

    return {notify, addNewKpi}

}