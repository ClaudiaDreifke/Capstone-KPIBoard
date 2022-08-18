import React, {useState} from 'react';
import './App.css';
import axios from "axios";

export default function App() {

    const [message, setMessage] = useState();

    axios.get("/hello")
        .then(response => response.data)
        .then(setMessage)

    const [kpi, setKpi] = useState();

    axios.get("/api/my-kpi")
        .then(response => response.data)
        .then(setKpi)

    return (
        <>
            <h1>{message}</h1>
            <div>{kpi}</div>
        </>
    );
}
