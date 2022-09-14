import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {FormEvent, useEffect, useState} from "react";
import {toast} from "react-toastify";
import {useNavigate, useParams} from "react-router-dom";
import {Kpi} from "../../model/Kpi";
import '../../styling/ChangeKpiAdmin.css'
import {KpiOwner} from "../../model/KpiOwner";

export type ChangeKpiAdminProps = {
    kpis: Kpi[],
    kpiOwners: KpiOwner[],
    updateKpiById: (updatedKpi: Kpi) => void;
}

export default function ChangeKpiAdmin(props: ChangeKpiAdminProps) {

    const navigate = useNavigate();
    const {id} = useParams();
    const kpi: Kpi | undefined = props.kpis.find((k: Kpi) => k.id === id);

    const [ownedBy, setOwnedBy] = useState<string>(kpi?.ownedBy || "")
    const [targetValueOperator, setTargetValueOperator] = useState<string>(kpi?.targetForKpi?.targetValueOperator || "")
    const [targetValue, setTargetValue] = useState<number>(kpi?.targetForKpi?.targetValue || 0)
    const [targetValueUnit, setTargetValueUnit] = useState<string>(kpi?.targetForKpi?.targetValueUnit || "")

    useEffect(() => {
        setOwnedBy(kpi?.ownedBy || "")
        setTargetValueOperator(kpi?.targetForKpi?.targetValueOperator || "")
        setTargetValue(kpi?.targetForKpi?.targetValue || 0)
        setTargetValueUnit(kpi?.targetForKpi?.targetValueUnit || "")
    }, [kpi])

    const onKpiSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (kpi) {
            const updatedKpi: Kpi = {
                id: kpi.id,
                name: kpi.name,
                ownedBy: ownedBy,
                values: kpi.values,
                targetForKpi: {
                    targetValueOperator: targetValueOperator,
                    targetValue: targetValue,
                    targetValueUnit: targetValueUnit
                },
                currentAverageValue: kpi.currentAverageValue
            }
            props.updateKpiById(updatedKpi)
        } else {
            toast.error("Die Kennzahl konnte nicht geändert werden")
        }
        navigate("/my-kpi")
    }

    return (
        <>
            <form className={"form-change-kpi-admin"} onSubmit={onKpiSubmit}>
                <button style={{
                    width: 20,
                    backgroundColor: "white",
                    borderColor: "white",
                    color: "black",
                    fontWeight: "bold",
                    fontSize: "large",
                    marginLeft: 460,
                }} onClick={() => navigate("/my-kpi")}>X
                </button>
                <h2>Kennzahl ändern</h2>
                <p className={"name-change"} id="name">{kpi?.name}</p>
                <FormControl id="form-control-change-kpi-admin">
                    <InputLabel id="responsible-role-change">Verantwortlicher</InputLabel>
                    <Select
                        labelId="responsible-role-change"
                        id="responsible-role-change"
                        value={ownedBy}
                        onChange={event => setOwnedBy(event.target.value)}>
                        {props.kpiOwners.map((role) => (
                            <MenuItem key={role.id}
                                      value={role.kpiOwnerDescription}>{role.kpiOwnerDescription}</MenuItem>))}
                    </Select>
                </FormControl>
                <FormControl id="form-control-change-kpi-admin">
                    <InputLabel id="target-value-operator-change"></InputLabel>
                    <Select
                        labelId="target-value-operator-change"
                        id="target-value-operator-change"
                        value={targetValueOperator}
                        onChange={event => setTargetValueOperator(event.target.value)}>
                        <MenuItem value={"GREATER"}>größer</MenuItem>
                        <MenuItem value={"LESS"}>kleiner</MenuItem>
                        <MenuItem value={"EQUALS"}>gleich</MenuItem>
                    </Select>
                </FormControl>
                <FormControl id="form-control-change-kpi-admin">
                    <input className={"target-value-input-change"} type={"number"}
                           value={targetValue}
                           onChange={event => setTargetValue(event.target.valueAsNumber)}/>
                </FormControl>
                <FormControl id="form-control-change-kpi-admin">
                    <InputLabel id="target-value-unit-change"></InputLabel>
                    <Select
                        labelId="target-value-unit-change"
                        id="target-value-unit-change"
                        value={targetValueUnit}
                        onChange={event => setTargetValueUnit(event.target.value)}>
                        <MenuItem value={"AMOUNT"}>Anzahl</MenuItem>
                        <MenuItem value={"PERCENTAGE"}>%</MenuItem>
                        <MenuItem value={"MINUTES"}>Minuten</MenuItem>
                    </Select>
                </FormControl>
                <button style={{marginTop: 20, marginLeft: 300, marginBottom: 20}} type={"submit"}>speichern</button>
            </form>
        </>
    );
}
