import {Kpi} from "../../model/Kpi";
import GreenCell from "./GreenCell";
import RedCell from "./RedCell";
import '../../styling/SingleKpiBoard.css'


export type SingleKpiBoardProps = {
    kpi: Kpi;
    targetValueUnitConvertToText: (stringToConvert: string) => string;
    targetValueOperatorConvertToText: (stringToConvert: string) => string;

}

export default function SingleKpiBoard(props: SingleKpiBoardProps) {

    return (
        <>
            <div className={"name"}>{props.kpi.name}</div>
            {props.kpi.comparedValues.map(v => {
                if (v.trueFalseIndicator === 1) {
                    return <GreenCell kpi={props.kpi}/>
                }
                return (<RedCell kpi={props.kpi}/>)
            })}
            <div
                className={"target-value"}>{props.targetValueOperatorConvertToText(props.kpi.targetForKpi.targetValueOperator)
                + " " + props.kpi.targetForKpi.targetValue + " " + props.targetValueUnitConvertToText(props.kpi.targetForKpi.targetValueUnit)}</div>
            <div className={"actual-target-value"}>n.a.</div>
        </>
    )
}
