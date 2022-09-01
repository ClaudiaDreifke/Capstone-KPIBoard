import {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import '../../styling/Header.css';

export default function Header() {
    const [tab, setTab] = useState("KpiBoard")

    useEffect(() => {
        document.title = tab;
    })

    return (
        <header>
            <h1>EASY KPI</h1>
            <nav className={"menu"}>
                <nav className={"KpiBoard"}>
                    <NavLink className={"nav"} onClick={() => setTab("KpiBoard")} to={"/"}> Kennzahlen-Board </NavLink>
                </nav>
                <nav className={"Admin"}>
                    <NavLink className={"nav"} onClick={() => setTab("Admin")} to={"/admin"}> Admin </NavLink>
                </nav>
                <nav className={"MyKpi"}>
                    <NavLink className={"nav"} onClick={() => setTab("My-Kpi")} to={"/my-kpi"}> Meine
                        Kennzahlen </NavLink>
                </nav>
            </nav>
            <img src={"pictures/coffee-lover-small.png"} className={"coffee-lover"} alt={""}/>
        </header>
    );
}
