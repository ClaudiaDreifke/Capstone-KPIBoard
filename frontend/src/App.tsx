import React from "react";
import {HashRouter} from "react-router-dom";
import AllRoutes from "./components/shared/AllRoutes";
import Header from "./components/shared/Header";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import './styling/App.css'
import Footer from "./components/shared/Footer";


export default function App() {

    return (
        <main>
            <HashRouter>
                <Header/>
                <main>
                    <AllRoutes/>
                </main>
            </HashRouter>
            <Footer/>
            <ToastContainer position={toast.POSITION.TOP_LEFT} toastClassName={"toast-message"}/>
        </main>
    );
}
