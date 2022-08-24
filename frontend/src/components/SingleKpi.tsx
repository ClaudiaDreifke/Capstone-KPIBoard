import {Kpi} from "../model/Kpi";
import '../styling/SingleKpi.css'

type SingleKpiProps = {
    kpi: Kpi,
    deleteKpiById: (id: string) => void;
}

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

    const handleClickDelete = () => {
        props.deleteKpiById(props.kpi.id);
    }

    return (
        <section className={"show-single-kpi"} key={props.kpi.id}>
            <p className={"description-single-kpi"}>Name: {props.kpi.name}</p>
            <p className={"description-single-kpi"}> Zielwert: {targetValueOperatorToText()} {props.kpi.targetForKpi.targetValue} {targetValueUnitToText()}</p>
            <div className={"description-single-kpi"}>Werte: {props.kpi.values}</div>
            <button className={"delete-button"} onClick={handleClickDelete}>löschen</button>
        </section>
    )
}
