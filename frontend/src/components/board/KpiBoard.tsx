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
            <div className={"kpi-board"}>
                <div>
                    <div>
                        <col className={"name-column"}></col>
                        <div className={"month-column"}>Jan</div>
                        <div className={"month-column"}>Feb</div>
                        <div className={"month-column"}>Mär</div>
                        <div className={"month-column"}>Apr</div>
                        <div className={"month-column"}>Mai</div>
                        <div className={"month-column"}>Jun</div>
                        <div className={"month-column"}>Jul</div>
                        <div className={"month-column"}>Aug</div>
                        <div className={"month-column"}>Sep</div>
                        <div className={"month-column"}>Okt</div>
                        <div className={"month-column"}>Nov</div>
                        <div className={"month-column"}>Dez</div>
                        <div className={"target-value-column"}>Zielwert</div>
                        <div className={"actual-target-value-column"}>aktuelle Zielerreichung</div>
                    </div>
                    {props.kpis.map(kpi => <SingleKpiBoard key={kpi.id} kpi={kpi}/>)}
                </div>
            </div>
        </>
    )
}
