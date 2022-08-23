import React from "react";
import {HashRouter} from "react-router-dom";
import AllRoutes from "./components/AllRoutes";
import Header from "./components/Header";
import {toast, ToastContainer} from "react-toastify";
import './styling/App.css'

export default function App() {

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
