import {Kpi} from "../../model/Kpi";
import GreenCell from "./GreenCell";
import RedCell from "./RedCell";
import '../../styling/SingleKpiBoard.css'


export type SingleKpiBoardProps = {
    kpi: Kpi;
}

export default function SingleKpiBoard(props: SingleKpiBoardProps) {

    return (
        <>
            <div>
                <div className={"name-row"}>{props.kpi.name}</div>
                {props.kpi.comparedValues.map(v => {
                    if (v.trueFalseIndicator === 1) {
                        return <GreenCell kpi={props.kpi}/>
                    }
                    return (<RedCell kpi={props.kpi}/>)
                })}
                {props.kpi.targetForKpi.targetValueOperator + props.kpi.targetForKpi.targetValue}
            </div>
        </>
    )
}
