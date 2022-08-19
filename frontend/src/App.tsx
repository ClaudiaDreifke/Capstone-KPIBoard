import React from "react";
import './styling/App.css';

import AddKpi from "./components/AddKpi";
import useKpi from "./hooks/useKpi";


export default function App() {

    const {addNewKpi} = useKpi();

    return (
        <>
            <h1>KPI-Board</h1>
            <AddKpi addNewKpi={addNewKpi}/>
        </>
    );
}
