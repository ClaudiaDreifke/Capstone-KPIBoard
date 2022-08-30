import {Kpi} from "../../model/Kpi";
import '../../styling/SingleKpiAdmin.css'
import {useNavigate} from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {FormGroup} from "@mui/material";
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
        if (props.kpi.targetForKpi.targetValueUnit === "ANZAHL") return <> Stk.</>;
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
            <FormGroup style={{margin: 15, flex: 2, flexDirection: "row", justifyContent: "space-around"}}>
                <DeleteIcon onClick={handleClickDelete}>löschen</DeleteIcon>
                <EditIcon onClick={() => {
                    navigate(`/admin/change/${props.kpi.id}`)
                }}/>
            </FormGroup>
        </section>
    )
}
