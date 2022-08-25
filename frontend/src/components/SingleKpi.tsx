import {Kpi} from "../model/Kpi";
import '../styling/SingleKpi.css'
import {useNavigate} from "react-router-dom";


type SingleKpiProps = {
    kpi: Kpi,
    deleteKpiById: (id: string) => void,
    updateKpiById: (updatedKpi: Kpi) => void;
}

export default function SingleKpi(props: SingleKpiProps) {

    const navigate = useNavigate();

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
            <p className={"description-single-kpi"}> {props.kpi.name}</p>
            <p className={"description-single-kpi"}> Zielwert: {targetValueOperatorToText()} {props.kpi.targetForKpi.targetValue} {targetValueUnitToText()}</p>
            <button className={"delete-button"} onClick={handleClickDelete}>löschen</button>
            <button className={"navigate-to-update-button"} onClick={() => {
                navigate(`/admin/change/${props.kpi.id}`)
            }}>ändern
            </button>
        </section>
    )
}
