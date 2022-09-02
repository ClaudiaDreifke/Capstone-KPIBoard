import {Kpi} from "../../model/Kpi";
import SingleKpiBoard from "./SingleKpiBoard";
import '../../styling/KpiBoard.css'

export type KpiBoardProps = {
    kpis: Kpi[];
}

export default function KpiBoard(props: KpiBoardProps) {

    return (
        <>
            <h2>Kennzahlen-Board</h2>
            <table className={"kpi-board"}>
                <tr>
                    <th scope={"col"} className={"name-column"}></th>
                    <th scope={"col"} className={"month-column"}>Jan</th>
                    <th scope={"col"} className={"month-column"}>Feb</th>
                    <th scope={"col"} className={"month-column"}>Mär</th>
                    <th scope={"col"} className={"month-column"}>Apr</th>
                    <th scope={"col"} className={"month-column"}>Mai</th>
                    <th scope={"col"} className={"month-column"}>Jun</th>
                    <th scope={"col"} className={"month-column"}>Jul</th>
                    <th scope={"col"} className={"month-column"}>Aug</th>
                    <th scope={"col"} className={"month-column"}>Sep</th>
                    <th scope={"col"} className={"month-column"}>Okt</th>
                    <th scope={"col"} className={"month-column"}>Nov</th>
                    <th scope={"col"} className={"month-column"}>Dez</th>
                    <th scope={"col"} className={"target-value-column"}>Zielwert</th>
                    <th scope={"col"} className={"target-value-column"}>aktuelle Zielerreichung</th>
                </tr>
                {props.kpis.map(kpi => <SingleKpiBoard key={kpi.id} kpi={kpi}/>)}
            </table>
        </>
    )
}
