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

    const actualTargetValue = props.kpi.targetForKpi.targetValue;
    const actualTargetValueOperator = props.kpi.targetForKpi.targetValueOperator;

    return (
        <>
            <div className={"name"}>{props.kpi.name}</div>

            {props.kpi.values.map(v => {
                    if (actualTargetValueOperator === "GREATER" && v.value > actualTargetValue)
                        return <GreenCell kpi={props.kpi}/>
                    else if (actualTargetValueOperator === "GREATER" && v.value <= actualTargetValue)
                        return <RedCell kpi={props.kpi}/>
                    else if (actualTargetValueOperator === "LESS" && v.value < actualTargetValue)
                        return <GreenCell kpi={props.kpi}/>
                    else if (actualTargetValueOperator === "LESS" && v.value >= actualTargetValue)
                        return <RedCell kpi={props.kpi}/>
                    else if (actualTargetValueOperator === "EQUALS" && v.value === actualTargetValue)
                        return <GreenCell kpi={props.kpi}/>
                    else
                        return <RedCell kpi={props.kpi}/>
                }
            )
            }
            <div
                className={"target-value"}>{props.targetValueOperatorConvertToText(props.kpi.targetForKpi.targetValueOperator)
                + " " + props.kpi.targetForKpi.targetValue + " " + props.targetValueUnitConvertToText(props.kpi.targetForKpi.targetValueUnit)}</div>
            <div className={"actual-target-value"}>n.a.</div>
        </>
    )
}
