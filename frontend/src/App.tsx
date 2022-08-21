import React from "react";

import {ToastContainer} from "react-toastify";
import KpiGalleryAdmin from "./components/KpiGalleryAdmin";
import useKpi from "./hooks/useKpi";
import './styling/App.css'


export default function App() {

    const {kpis} = useKpi();

    return (
        <main>
            <KpiGalleryAdmin kpis={kpis}/>
            <ToastContainer/>
        </main>
    );
}
