import {Kpi} from "../../model/Kpi";
import GreenCell from "./GreenCell";
import RedCell from "./RedCell";

export type SingleKpiBoardProps = {
    kpi: Kpi;
    targetValueUnitConvertToText: (stringToConvert: string) => string;
    targetValueOperatorConvertToText: (stringToConvert: string) => string;
}

export default function SingleKpiBoard(props: SingleKpiBoardProps) {


    const currentTargetValue = props.kpi.targetForKpi.targetValue;
    const currentTargetValueOperator = props.kpi.targetForKpi.targetValueOperator;

    return (
        <>
            <div className={"name"}>{props.kpi.name}</div>
            {props.kpi.values.map(v => {
                    if ((currentTargetValueOperator === "GREATER" && v.value > currentTargetValue) ||
                        (currentTargetValueOperator === "LESS" && v.value < currentTargetValue) ||
                        (currentTargetValueOperator === "EQUALS" && v.value === currentTargetValue))
                        return <GreenCell key={v.month}/>
                    else
                        return <RedCell key={v.month}/>
                }
            )}
            <div
                className={"target-value"}>{props.targetValueOperatorConvertToText(props.kpi.targetForKpi.targetValueOperator)
                + " " + props.kpi.targetForKpi.targetValue + " " + props.targetValueUnitConvertToText(props.kpi.targetForKpi.targetValueUnit)}</div>
            <div className={"actual-target-value"}>{(props.kpi.currentAverageValue).toFixed(2)}</div>
        </>
    )
}
