import React from "react";

import AddKpi from "./components/AddKpi";
import {ToastContainer} from "react-toastify";
import KpiGalleryAdmin from "./components/KpiGalleryAdmin";
import useKpi from "./hooks/useKpi";
import './styling/App.css'


export default function App() {

    const {kpis, addNewKpi, notify} = useKpi();

    return (
        <>
            <h1>KPI-Board</h1>
            <main>
                <AddKpi addNewKpi={addNewKpi} notify={notify}/>
                <KpiGalleryAdmin kpis={kpis}/>
            </main>
            <ToastContainer/>
        </>
    );
}
