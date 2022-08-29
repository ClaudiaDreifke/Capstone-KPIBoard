import {Kpi} from "../../model/Kpi";
import {useNavigate, useParams} from "react-router-dom";
import {FormGroup} from "@mui/material";

export type ChangeKpiUserProps = {
    kpis: Kpi[],
    updateKpiById: (updatedKpi: Kpi) => void;
}

export default function ChangeKpiUser(props: ChangeKpiUserProps) {

    const navigate = useNavigate();
    const {id} = useParams();
    const kpi: Kpi | undefined = props.kpis.find((k: Kpi) => k.id === id);

    const targetValueOperatorToText = () => {
        if (kpi?.targetForKpi.targetValueOperator === "LESS") return <>kleiner</>;
        if (kpi?.targetForKpi.targetValueOperator === "GREATER") return <>größer</>;
        else return <>gleich</>;
    }

    const targetValueUnitToText = () => {
        if (kpi?.targetForKpi.targetValueUnit === "ANZAHL") return <> Stk.</>;
        else return <>%</>;
    }

    return (
        <>
            <h3>Kennzahl ändern</h3>
            <FormGroup style={{flex: 2, flexDirection: "row", marginLeft: 10, justifyContent: "start"}}>
                <p>{kpi?.name}</p>
                <p style={{marginLeft: 20}}> Zielwert: {targetValueOperatorToText()} {kpi?.targetForKpi.targetValue} {targetValueUnitToText()}</p>
            </FormGroup>
            <FormGroup style={{flex: 2, flexDirection: "row", marginLeft: 20, justifyContent: "flex-start"}}>
                <button id={"back-to-admin-view"} onClick={() => navigate("/my-kpi")}>zurück</button>
                <button type={"submit"}>ändern</button>
            </FormGroup>
        </>
    )
}
