import React from "react";

import AddKpi from "./components/AddKpi";
import {ToastContainer} from "react-toastify";


export default function App() {


    return (
        <>
            <h1>KPI-Board</h1>
            <AddKpi/>
            <ToastContainer/>
        </>
    );
}
