import React from "react";
import {ToastContainer} from "react-toastify";
import {HashRouter} from "react-router-dom";
import AllRoutes from "./components/AllRoutes";
import Header from "./components/Header";


export default function App() {


    return (
        <>
            <HashRouter>
                <Header/>
                <main>
                    <AllRoutes/>
                </main>
            </HashRouter>
            <ToastContainer/>
        </>
    );
}
