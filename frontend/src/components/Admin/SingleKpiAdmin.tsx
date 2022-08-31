import {Kpi} from "../../model/Kpi";
import '../../styling/SingleKpiAdmin.css'
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

type SingleKpiProps = {
    kpi: Kpi,
    deleteKpiById: (id: string) => Promise<void>,
}

export default function SingleKpiAdmin(props: SingleKpiProps) {

    const navigate = useNavigate();

    const targetValueOperatorToText = () => {
        if (props.kpi.targetForKpi.targetValueOperator === "LESS") return <>kleiner</>;
        if (props.kpi.targetForKpi.targetValueOperator === "GREATER") return <>größer</>;
        else return <>gleich</>;
    }

    const targetValueUnitToText = () => {
        if (props.kpi.targetForKpi.targetValueUnit === "AMOUNT") return <> Stk.</>;
        else return <>%</>;
    }

    const handleClickDelete = () => {
        props.deleteKpiById(props.kpi.id).catch(() => {
            toast.error("Die Kennzahl konnte nicht gelöscht werden.")
        })
        ;
    }

    return (
        <section className={"show-single-kpi"} key={props.kpi.id}>
            <p className={"description-single-kpi"}> {props.kpi.name}</p>
            <p className={"description-single-kpi"}> Zielwert: {targetValueOperatorToText()} {props.kpi.targetForKpi.targetValue} {targetValueUnitToText()}</p>
            <button style={{maxWidth: 150}} onClick={handleClickDelete}>löschen</button>
            <button style={{maxWidth: 150}} onClick={() => {
                navigate(`/admin/change/${props.kpi.id}`)
            }}>Kennzahl ändern
            </button>
        </section>
    )
}
