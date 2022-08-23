import React from "react";
import {HashRouter} from "react-router-dom";
import AllRoutes from "./components/AllRoutes";
import Header from "./components/Header";
import AddKpi from "./components/AddKpi";
import {toast, ToastContainer} from "react-toastify";
import useKpi from "./hooks/useKpi";
import './styling/App.css'

export default function App() {

    const {kpis, addNewKpi} = useKpi();

    return (
        <>
            <HashRouter>
                <Header/>
                <main>
                    <AllRoutes/>
                </main>
            </HashRouter>
            <ToastContainer position={toast.POSITION.TOP_RIGHT}/>
        </>
    );
}
