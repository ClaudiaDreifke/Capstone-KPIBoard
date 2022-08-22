import {Kpi} from "../model/Kpi";
import '../styling/SingleKpi.css'

type SingleKpiProps = {
    kpi: Kpi,
}

// @ts-ignore
export default function SingleKpi(props: SingleKpiProps) {

    const targetValueOperatorToText = () => {
        if (props.kpi.targetForKpi.targetValueOperator === "LESS") return <>kleiner</>;
        if (props.kpi.targetForKpi.targetValueOperator === "GREATER") return <>größer</>;
        else return <>gleich</>;
    }

    const targetValueUnitToText = () => {
        if (props.kpi.targetForKpi.targetValueUnit === "ANZAHL") return <> Stk.</>;
        else return <>%</>;
    }

    return (
        <div className={"show-single-kpi"} key={props.kpi.id}>
            <p>Name: {props.kpi.name}</p>
            <p> Zielwert: {targetValueOperatorToText()} {props.kpi.targetForKpi.targetValue} {targetValueUnitToText()}</p>
            <div>Werte: {props.kpi.values}</div>
        </div>
    )
}
