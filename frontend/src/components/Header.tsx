import {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import '../styling/Header.css';

export default function Header() {
    const [tab, setTab] = useState("Home")

    useEffect(() => {
        document.title = tab;
    })

    return (
        <header>
            <h1>EASY KPI</h1>
            <nav className={"menu"}>
                <NavLink className={"nav"} onClick={() => setTab("Home")} to={"/home"}> home </NavLink>
                <NavLink className={"nav"} onClick={() => setTab("myKpi")} to={"/my-kpi"}> myKpi </NavLink>
                <NavLink className={"nav"} onClick={() => setTab("Admin")} to={"/admin"}> admin </NavLink>
                <NavLink className={"nav"} onClick={() => setTab("Logout")} to={"/"}> logout </NavLink>
            </nav>
            <img src={"pictures/coffee-lover-small.png"} className={"coffee-lover"} alt={""}/>
        </header>
    );
}
