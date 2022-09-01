import {Kpi} from "../../model/Kpi";
import SingleKpiBoard from "./SingleKpiBoard";

export type KpiBoardProps = {
    kpis: Kpi[];
}

export default function KpiBoard(props: KpiBoardProps) {

    return (
        <>
            <h3>Kennzahlen-Board</h3>
            <table>
                <tr>
                    <th scope={"col"}>Kennzahlen</th>
                    <th scope={"col"}>Jan</th>
                    <th scope={"col"}>Feb</th>
                    <th scope={"col"}>Mär</th>
                    <th scope={"col"}>Apr</th>
                    <th scope={"col"}>Mai</th>
                    <th scope={"col"}>Jun</th>
                    <th scope={"col"}>Jul</th>
                    <th scope={"col"}>Aug</th>
                    <th scope={"col"}>Sep</th>
                    <th scope={"col"}>Okt</th>
                    <th scope={"col"}>Nov</th>
                    <th scope={"col"}>Dez</th>
                    <th scope={"col"}>Zielwert</th>
                    <th scope={"col"}>aktuelle Zielerreichung</th>
                </tr>
                {props.kpis.map(kpi => <SingleKpiBoard key={kpi.id} kpi={kpi}/>)}
            </table>
        </>
    )
}
