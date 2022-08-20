import {Kpi} from "../model/Kpi";

type SingleKpiProps = {
    kpi: Kpi,
}

export default function SingleKpi(props: SingleKpiProps) {

    return (
        <li key={props.kpi.name}>
            <p>Name: {props.kpi.name}</p>
            <p>Zielwert: {props.kpi.targetForKpi.targetValueOperator} {props.kpi.targetForKpi.targetValue} {props.kpi.targetForKpi.targetValueUnit}</p>
            <div>Werte: {props.kpi.values}</div>
        </li>
    )
}