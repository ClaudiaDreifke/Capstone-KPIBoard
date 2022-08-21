import {Kpi} from "../model/Kpi";
import '../styling/SingleKpi.css'

type SingleKpiProps = {
    kpi: Kpi,
}

export default function SingleKpi(props: SingleKpiProps) {

    return (
        <div className={"show-single-kpi"} key={props.kpi.id}>
            <p>Name: {props.kpi.name}</p>
            <p>Zielwert: {props.kpi.targetForKpi.targetValueOperator.toLowerCase()} {props.kpi.targetForKpi.targetValue} {props.kpi.targetForKpi.targetValueUnit.toLowerCase()}</p>
            <div>Werte: {props.kpi.values}</div>
        </div>
    )
}
