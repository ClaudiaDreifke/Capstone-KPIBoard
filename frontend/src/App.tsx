import React from "react";

import {ToastContainer} from "react-toastify";
import KpiGalleryAdmin from "./components/KpiGalleryAdmin";
import useKpi from "./hooks/useKpi";


export default function App() {

    const {kpis} = useKpi();

    return (
        <>
            <h1>KPI-Board</h1>
            <KpiGalleryAdmin kpis={kpis}/>
            <ToastContainer/>
        </>
    );
}
