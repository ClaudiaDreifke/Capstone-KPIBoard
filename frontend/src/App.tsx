import React from "react";

import AddKpi from "./components/AddKpi";
import {toast, ToastContainer} from "react-toastify";
import KpiGalleryAdmin from "./components/KpiGalleryAdmin";
import useKpi from "./hooks/useKpi";
import './styling/App.css'


export default function App() {

    const {kpis, addNewKpi} = useKpi();

    return (
        <>
            <h1>KPI-Board</h1>
            <main>
                <AddKpi addNewKpi={addNewKpi}/>
                <KpiGalleryAdmin kpis={kpis}/>
                <ToastContainer position={toast.POSITION.TOP_RIGHT}/>
            </main>
        </>
    );
}
